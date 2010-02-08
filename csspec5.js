(function(){
  var global = this;
  var undef;

  var CSSpec = function() {
    return new CSSpec.Context();
  };


  CSSpec.Example = function(description, fn, context) {
    this.description = description;
    this.fn = fn;
    this.context = context;
    // console.log("Created example: " + this.descriptions());
  };

  CSSpec.Example.prototype = {
    run: function() {
      this.setup();
      this.parent && this.parent.runBeforeHooks(this.context);
      console.log("Running: " + this.descriptions().join(" "));
      this.fn.apply(this.context);
      this.parent && this.parent.runAfterHooks(this.context);
      this.teardown();
    },
    
    setup: function() {
      this.context.example = this;
      this.context.select.apply(this.context, this.descriptions());
    },
    
    teardown: function() {
      this.context.select();
      this.context.example = null;
    },

    descriptions: function() {
      var descriptions = this.parent ? this.parent.descriptions() : [];
      this.description && descriptions.push(this.description);
      return descriptions;
    }
  };


  CSSpec.ExampleGroup = function(description, selector) {
    this.description = description;
    this.selector = selector;
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
    describe: function(description, fn) {
      this.exampleGroup = this.exampleGroup.addExample(new CSSpec.ExampleGroup(description));
      fn && fn.apply(this);
      this.exampleGroup = this.exampleGroup.parent;
    },

    it: function(description, fn) {
      this.exampleGroup.addExample(new CSSpec.Example(description, fn, this));
    },
    
    before: function(fn) {
      this.exampleGroup.addBeforeHook(fn);
    },
    
    after: function(fn) {
      this.exampleGroup.addAfterHook(fn);
    },
    
    select: function() {
      this.selector = null;
      this.selected = null;
      var selectors = $.makeArray(arguments);            
      for(var start = 0; start < selectors.length; start++) {
        for(var end = selectors.length; end > start; end--) {
          var selector = selectors.slice(start, end).join(" ");
          var selected = $(selector);
          if(selected.get(0)) {
            this.selector = selector;
            // console.log("Selected \"" + this.selector + "\"");
            // console.log(selected.get(0));
            this.selected = selected;
            return;
          }
        }
      }
    },
    
    expect: function(value) {
      return new CSSpec.Matchers(value);
    }
  };


  window.CSSpec = CSSpec;
})();
