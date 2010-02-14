(function() {
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
      CSSpec.$.each(this.examples, function() { this.run(); });
      if(!this.parent)
        console.log("Success!");
    },

    runBeforeHooks: function(context) {
      this.parent && this.parent.runBeforeHooks(context);
      CSSpec.$.each(this.beforeHooks, function() { this.apply(context); });
    },

    runAfterHooks: function(context) {
      this.parent && this.parent.runAfterHooks(context);
      CSSpec.$.each(this.afterHooks, function() { this.apply(context); });
    },

    descriptions: CSSpec.Example.prototype.descriptions
  };
})();
