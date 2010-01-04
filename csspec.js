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
      var ctx = {currentExample: this};
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
    // console.log("Created example group: " + this.descriptions());
  };


  CSSpec.ExampleGroup.prototype = {
    run: function() {
      var group = this;
      $.each(this.examples, function() {
        this.run();
      });
      if(!this.parent)
        console.log("Success!");
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
  
  
  CSSpec.Matchers = function(value) {
    this.value = value;
  };
  
  
  CSSpec.Matchers.prototype = {
    toEqual: function(expected) {
      if(!(this.value == expected))
        throw "Expected " + expected + " but got " + this.value;
    }
  };


  CSSpec.Scope = function(desc) {
    this._group = new CSSpec.ExampleGroup(desc);
  };
  
  
  CSSpec.Scope.prototype = {
    describe: function(desc, fn) {
      var group = new CSSpec.ExampleGroup(desc, this._group);
      this._group = group;
      if(fn)
        fn.apply(group);
      this._group = group.parent;
      return group;
    },

    it: function(desc, fn) {
      return new CSSpec.Example(desc, this._group, fn);
    },
    
    expect: function(value) {
      return new CSSpec.Matchers(value)
    },
    
    run: function() {
      this._group.run();
    }
  };
  
  
  
  CSSpec.describe = function(desc) {
    return new CSSpec.Scope(desc);
  };


  window.CSSpec = CSSpec;
})();
