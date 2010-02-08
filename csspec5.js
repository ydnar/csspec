(function(){
  var global = this;
  var undef;

  var CSSpec = function() {
    return new CSSpec.Context();
  };


  CSSpec.Example = function(desc, fn, context) {
    this.description = desc;
    this.fn = fn;
    this.context = context;
    // console.log("Created example: " + this.descriptions());
  };

  CSSpec.Example.prototype = {
    run: function() {
      console.log("Running example: " + this.descriptions().join(" "));
      this.context.example = this;
      this.parent && this.parent.runBeforeHooks(this.context);
      this.fn.apply(this.context);
      this.parent && this.parent.runAfterHooks(this.context);
      this.context.example = null;
    },

    descriptions: function() {
      var descriptions = this.parent ? this.parent.descriptions() : [];
      this.description && descriptions.push(this.description);
      return descriptions;
    }
  };


  CSSpec.ExampleGroup = function(desc) {
    this.description = desc;
    this.examples = [];
    this.beforeHooks = [];
    this.afterHooks = [];
    // console.log("Created example group: " + this.descriptions());
  };

  CSSpec.ExampleGroup.prototype = {
    addExample: function(example) {
      example.parent = this;
      this.examples.push(example);
      return example;
    },
    
    addBeforeHook: function(fn) {
      this.beforeHooks.push(fn);
    },
    
    addAfterHook: function(fn) {
      this.afterHooks.push(fn);
    },

    run: function() {
      $.each(this.examples, function() { this.run(); });
      if(!this.parent)
        console.log("Success!");
    },

    runBeforeHooks: function(context) {
      this.parent && this.parent.runBeforeHooks(context);
      $.each(this.beforeHooks, function() { this.apply(context); });
    },

    runAfterHooks: function(context) {
      this.parent && this.parent.runAfterHooks(context);
      $.each(this.afterHooks, function() { this.apply(context); });
    },

    descriptions: CSSpec.Example.prototype.descriptions
  };


  CSSpec.rootExampleGroup = new CSSpec.ExampleGroup();


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


  CSSpec.Context = function() {
    this.exampleGroup = CSSpec.rootExampleGroup;
  };

  CSSpec.Context.prototype = {
    describe: function(desc, fn) {
      this.exampleGroup = this.exampleGroup.addExample(new CSSpec.ExampleGroup(desc));
      fn && fn.apply(this);
      this.exampleGroup = this.exampleGroup.parent;
    },

    it: function(desc, fn) {
      this.exampleGroup.addExample(new CSSpec.Example(desc, fn, this));
    },
    
    before: function(fn) {
      this.exampleGroup.addBeforeHook(fn);
    },
    
    after: function(fn) {
      this.exampleGroup.addAfterHook(fn);
    },
    
    expect: function(value) {
      return new CSSpec.Matchers(value);
    }
  };


  window.CSSpec = CSSpec;
})();
