/* eslint-disable object-shorthand */

// Get various parts of the WebExtension framework that we need.
var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var ExampleAPI = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    // To be notified of the extension going away, call callOnClose with any object that has a
    // close function, such as this one.
    context.callOnClose(this);

    const aomStartup = Cc["@mozilla.org/addons/addon-manager-startup;1"].getService(Ci.amIAddonManagerStartup);
    
    this.pathToJSM = null;
    this.chromeHandle = null;
    this.JSM = null;
    
    let that = this;
    
    return {
      ExampleAPI: {

        registerChromeUrl: function(chromeData) {
          const manifestURI = Services.io.newURI(
            "manifest.json",
            null,
            context.extension.rootURI
          );
          that.chromeHandle = aomStartup.registerChrome(manifestURI, chromeData);          
        },

        doSomethingWithJSM: async function(aPath) {
          // get the final path to the JSM
          that.pathToJSM = aPath.startsWith("chrome://") 
            ? aPath
            : context.extension.rootURI.resolve(aPath);

          // try to load the JSM
          console.log("Loading <" + that.pathToJSM + ">");
          try {
            // trying not to load JSM into global scope
            that.JSM = ChromeUtils.import(that.pathToJSM);
            // exported objects of that JSM are now available via this/that.JSM.<objName>
          } catch (e) {
            console.log("Failed to load <" + that.pathToJSM + ">");
            Components.utils.reportError(e);
            return;
          }

          // Do something with the JSM
          that.JSM.myModule.incValue();
          that.JSM.myModule.logValue();
          that.JSM.myModule.incValue();

        }  
      }
    };
  }
  
  close() {
    // We can still access the JSM here
    console.log("Shutting down with value: " + this.JSM.myModule.getValue());
    
    // Unload the JSM we imported above. This will cause Thunderbird to forget about the JSM, and
    // load it afresh next time `import` is called. (If you don't call `unload`, Thunderbird will
    // remember this version of the module and continue to use it, even if your extension receives
    // an update.) You should *always* unload JSMs provided by your extension.
    Cu.unload(this.pathToJSM);
    
    // after unloading also flush all caches
    Services.obs.notifyObservers(null, "startupcache-invalidate");

    if (this.chromeHandle) {
      this.chromeHandle.destruct();
      this.chromeHandle = null;
    }

    console.log("ExampleAPI unloaded!");
  }  
};
