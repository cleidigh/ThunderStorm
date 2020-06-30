// Import some things we need. 
var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { ExtensionSupport } = ChromeUtils.import("resource:///modules/ExtensionSupport.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var WindowListener = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    context.callOnClose(this);
    
    this.registeredWindows = {};
    this.pathToShutdownScript = null;
    
    let that = this;

    return {
      WindowListener: {
        
        registerWindow(windowHref, jsFile) {
          if (!that.registeredWindows.hasOwnProperty(windowHref)) {
            // path to JS file can either be chrome:// URL or a relative URL
            let path = jsFile.startsWith("chrome://") 
              ? jsFile 
              : context.extension.rootURI.resolve(jsFile)
            that.registeredWindows[windowHref] = path;
          } else {
            console.error("Window <" +windowHref + "> has already been registered");
          }
        },

        registerShutdownScript(aPath) {
          that.pathToShutdownScript = aPath.startsWith("chrome://") 
            ? aPath
            : context.extension.rootURI.resolve(aPath);
        },
        
        startListening() {
          let urls = Object.keys(that.registeredWindows);
          if (urls.length > 0) {
            // Before registering the window listener, check which windows are already open
            let openWindows = [];
            for (let window of Services.wm.getEnumerator(null)) {
              openWindows.push(window.location.href);
            }

            // Register window listener for all pre-registered windows
            ExtensionSupport.registerWindowListener("injectListener", {
              chromeURLs: Object.keys(that.registeredWindows),
              async onLoadWindow(window) {
                try {
                  // Create add-on specific namespace
                  window[that.extension.id] = {};
                  // Make extension object available in loaded JavaScript
                  window[that.extension.id].extension = that.extension;
                  // Load script into add-on specific namespace
                  Services.scriptloader.loadSubScript(that.registeredWindows[window.location.href], window[that.extension.id], "UTF-8");
                  // Call onLoad(window, isAlreadyOpen)
                  await window[that.extension.id].onLoad(window, openWindows.includes(window.location.href));
                } catch (e) {
                  Components.utils.reportError(e)
                }
              },
              async onUnloadWindow(window) {
                // Call onUnload()
                await window[that.extension.id].onUnload(window);               
                // Clear script
                window[that.extension.id] = {};
              }
            });
          } else {
            console.error("Failed to start listening, no windows registered");
          }
        },
        
      }
    };
  }

  close() {
    
    // Unload from all still open windows
    let urls = Object.keys(this.registeredWindows);
    if (urls.length > 0) {          
      for (let window of Services.wm.getEnumerator(null)) {
        if (this.registeredWindows.hasOwnProperty(window.location.href)) {
          // Call onUnload()
          window[this.extension.id].onUnload(window);               
          // Clear script
          window[this.extension.id] = {};          
        }
      }
      // Stop listening for new windows.
      ExtensionSupport.unregisterWindowListener("injectListener");
    } else {
      console.log("Not Observing, no windows registered");
    }
    
    // Execute registered shutdown script
    let shutdownJS = {};
    try {
      if (this.pathToShutdownScript) Services.scriptloader.loadSubScript(this.pathToShutdownScript, shutdownJS, "UTF-8");
    } catch (e) {
      Components.utils.reportError(e)
    }
    
    // Flush all caches
    Services.obs.notifyObservers(null, "startupcache-invalidate");
    this.registeredWindows = {};
  }
};
