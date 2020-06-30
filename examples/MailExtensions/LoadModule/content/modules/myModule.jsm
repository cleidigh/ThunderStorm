var EXPORTED_SYMBOLS = ["myModule"];

var myModule = {
  value : 0,
  incValue: function() {
    this.value++;
  },
  
  getValue: function() {
    return this.value;
  },
  
  logValue: function() {
    console.log("Current Value: " + this.value);
  }
};

console.log("Loading myModule.jsm");
