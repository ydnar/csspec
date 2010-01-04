(function(){
  var CSSpec = {};


  CSSpec.Example = function(desc, parent, fn) {
    this.description = desc;
    this.parent = parent;
    if(this.parent)
      this.parent.examples.push(this);
    this.fn = fn;
  };
  
  
  CSSpec.Example.prototype = {
    run: function() {
      var ctx = {};
      if(this.parent)
        this.parent.runBeforeHooks(ctx);
      console.log("Running example: " + this.descriptions().join(" "));
      this.fn.apply(ctx);
      if(this.parent)
        this.parent.runAfterHooks(ctx);
    },
    
    descriptions: function() {
      var descriptions = this.parent ? this.parent.descriptions() : [];
      descriptions.push(this.description);
      return descriptions;
    }
  };


  CSSpec.ExampleGroup = function(desc, parent) {
    this.description = desc;
    this.parent = parent;
    if(this.parent)
      this.parent.examples.push(this);
    this.examples = [];
    this.beforeHooks = [];
    this.afterHooks = [];
    console.log("Created example group: " + this.descriptions());
  };


  CSSpec.ExampleGroup.prototype = {
    run: function() {
      var group = this;
      $.each(this.examples, function() {
        var ctx = {};
        this.run(ctx);
      });
    },
    
    runBeforeHooks: function(ctx) {
      if(this.parent)
        this.parent.runBeforeHooks();
      $.each(this.beforeHooks, function() { this.apply(ctx); });
    },
    
    runAfterHooks: function(ctx) {
      if(this.parent)
        this.parent.runAfterHooks();
      $.each(this.afterHooks, function() { this.apply(ctx); });
    },
    
    descriptions: function() {
      var descriptions = this.parent ? this.parent.descriptions() : [];
      descriptions.push(this.description);
      return descriptions;
    }
  };


  CSSpec.Scope = function(desc) {
    this.currentExampleGroup = null;
    this.currentExample = null;
  };
  
  
  CSSpec.Scope.prototype = {
    describe: function(desc, fn) {
      var group = new CSSpec.ExampleGroup(desc, this.currentExampleGroup);
      this.currentExampleGroup = group;
      if(fn)
        fn.apply(group);
      this.currentExampleGroup = group.parent;
      return group;
    },

    it: function(desc, fn) {
      return new CSSpec.Example(desc, this.currentExampleGroup, fn);
    }
  };
  
  
  
  CSSpec.describe = function(desc) {
    var scope = new CSSpec.Scope(desc);
    scope.currentExampleGroup = new CSSpec.ExampleGroup(desc);
    return scope;
  };


  window.CSSpec = CSSpec;
})();
