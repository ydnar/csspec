(function(){

  var CSSpec = {
    examples: [],
    parseExampleGroup: null,

    describe: function(desc) {
      this.parseExampleGroup = this.addExample(new CSSpec.ExampleGroup(desc));
    },
    
    it: function(desc, fn) {
      this.addExample(new CSSpec.Example(desc, fn));
    },
    
    end: function() {
      this.parseExampleGroup = this.parseExampleGroup.parent;
    },

    expect: function(value) {
      return new CSSpec.Matchers(value)
    },
    
    addExample: function(example) {
      example.parent = this.parseExampleGroup;
      this.examples.push(example);
      return example;
    }
  };


  CSSpec.Example = function(desc, fn) {
    this.description = desc;
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


  CSSpec.ExampleGroup = function(desc) {
    this.description = desc;
    this.examples = [];
    this.beforeHooks = [];
    this.afterHooks = [];
    console.log("Created example group: " + this.descriptions());
  };

  CSSpec.ExampleGroup.prototype = {    
    run: function() {
      $.each(this.examples, function() {
        this.run();
      });
      if(!this.parent)
        console.log("Success!");
    },
    
    runBeforeHooks: function(ctx) {
      if(this.parent)
        this.parent.runBeforeHooks(ctx);
      $.each(this.beforeHooks, function() { this.apply(ctx); });
    },
    
    runAfterHooks: function(ctx) {
      if(this.parent)
        this.parent.runAfterHooks(ctx);
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


  window.CSSpec = CSSpec;
})();
