(function(){
  var global = this;
  var undef;

  var CSSpec = function() {
    var context = new CSSpec.Context();
    context.enqueue();
    return context;
  };
  
  CSSpec.undef = undef;
  CSSpec.global = global;
  CSSpec.jQuery = jQuery.noConflict(true);
  CSSpec.$ = CSSpec.jQuery;

  global.CSSpec = CSSpec;
})();
