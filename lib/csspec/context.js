(function() {
  CSSpec.Context = function() {
    this.exampleGroup = new CSSpec.ExampleGroup();
  };

  CSSpec.Context.prototype = {

    /* Parsing */

    describe: function(description, fn) {
      this.exampleGroup = this.exampleGroup.addExample(new CSSpec.ExampleGroup(description));
      fn && fn.apply(this);
      this.exampleGroup = this.exampleGroup.parent;
    },

    it: function(description, fn) {
      var example = new CSSpec.Example(description, fn, this);
      this.exampleGroup.addExample(example);
      CSSpec.addExample(example);
    },

    before: function(fn) {
      this.exampleGroup.addBeforeHook(fn);
    },

    after: function(fn) {
      this.exampleGroup.addAfterHook(fn);
    },


    /* Execution */

    run: function() {
      this.exampleGroup.run();
    },

    enqueue: function() {
      var _this = this;
      window.setTimeout(function() { _this.run(); }, 0);
    },


    /* Runtime */

    expect: function(value) {
      return new CSSpec.Matchers(value);
    },

    select: function() {
      this.selector = null;
      this.selected = null;
      var selectors = CSSpec.$.makeArray(arguments);
      for(var start = 0; start < selectors.length; start++) {
        for(var end = selectors.length; end > start; end--) {
          var selector = selectors.slice(start, end).join(" ");
          var selected = CSSpec.$(selector);
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
    
    
    /* jQuery */
    
    jQuery: CSSpec.jQuery,
    $: CSSpec.$
  };
})();
