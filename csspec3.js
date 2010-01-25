(function(){
  var global = this;
  var undef;

  var CSSpec = function(desc, fn) {
    var ctx = this;
    if(ctx == undef || ctx == global) {
      ctx = CSSpec.root;
    }

    if(desc && fn) {
      ctx.addExample(new CSSpec.Example(desc, fn));
    } else if(desc) {
      ctx = ctx.addExample(new CSSpec.ExampleGroup(desc));
    } else {
      ctx = ctx.parent;
    }
    
    return function() {
      return CSSpec.apply(ctx, arguments);
    }
  };


  CSSpec.Example = function(desc, fn) {
    this.description = desc;
    this.fn = fn;
    console.log("Created example: " + this.descriptions());
  };
  
  CSSpec.Example.prototype = {
    run: function() {
      console.log("Running example: " + this.descriptions().join(" "));
      var ctx = function(value) {
        return new CSSpec.Matchers(value);
      };
      CSSpec.Matchers.patch();
      if(this.parent)
        this.parent.runBeforeHooks(ctx);
      this.fn.apply(ctx);
      if(this.parent)
        this.parent.runAfterHooks(ctx);
      CSSpec.Matchers.unpatch();
    },
    
    descriptions: function() {
      var descriptions = this.parent ? this.parent.descriptions() : [];
      if(this.description) {
        descriptions.push(this.description);
      }
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
    addExample: function(example) {
      example.parent = this;
      this.examples.push(example);
      return example;
    },

    run: function() {
      $.each(this.examples, function() { this.run(); });
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
    
    descriptions: CSSpec.Example.prototype.descriptions
  };
  
  
  CSSpec.Matchers = function(value) {
    this.value = value;
  };
  
  CSSpec.Matchers.prototype = {
    equal: function(expected) {
      if(!(this.value == expected))
        throw "Expected " + expected + " but got " + this.value;
    }
  };
  
  var patched = [Array, Boolean, Date, Number, RegExp, String];
  
  CSSpec.Matchers.patch = function() {
    $.each(patched, function() {
      this.prototype.should = function() {
        return new CSSpec.Matchers(this);
      };
    });
  };
  
  CSSpec.Matchers.unpatch = function() {
    $.each(patched, function() {
      delete this.prototype.should;
    });
  };
  
  
  CSSpec.root = new CSSpec.ExampleGroup();


  window.CSSpec = CSSpec;
})();
