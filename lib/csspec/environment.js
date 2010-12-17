(function() {
  CSSpec.environment = {
    initialize: function() {
      if(window == window.top) {
        this.hijackWindow();
      } else if(!window.top.CSSpec) {
        
      }
    }
  };
})();
