(function() {
  var global = this;
  var undef;  

  Periscope = function(fn) {
    var constructor = new Function();
    constructor.prototype = {};
    constructor.hello = "hello";
    constructor.prototype._p = function(fn) {
      var _this = this;
      return function() {
        _this.__proto__ = this;
        return fn.apply(_this, arguments);
      };
    };    
    var scope = new constructor();
    // console.log(scope._p);
    return scope;
  };

  window.Periscope = Periscope;
})();
