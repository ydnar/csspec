(function() {
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
})();
