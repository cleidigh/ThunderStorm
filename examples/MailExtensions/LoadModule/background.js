async function main() {

  // Register a chrome://* URL. It will be unregistered upon API shutdown in its close() function
  // See its implementation.js file for more details.  
  messenger.ExampleAPI.registerChromeUrl([ ["content", "loadModuleExample", "content/"] ]);
  
  // Example API can load a JSM via the above registerd chrome://* URL or via a file://* URL. The second
  // method is used, if a path relative to the exentsions root is provided, instead of a chrome:// URL.
  
  // Method 1: chrome://* URL
  // await messenger.ExampleAPI.doSomethingWithJSM("chrome://loadModuleExample/content/modules/myModule.jsm");
  
  // Method 2: file://* URL
  await messenger.ExampleAPI.doSomethingWithJSM("content/modules/myModule.jsm");

}

main();
