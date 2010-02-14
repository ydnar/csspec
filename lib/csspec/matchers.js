(function() {
  CSSpec.Matchers = function(value) {
    this.value = value;
  };

  CSSpec.Matchers.prototype = {
    toEqual: function(expected) {
      if(!(this.value == expected)) {
        throw "Expected " + expected + " but got " + this.value;
      }
    }
  };
})();
