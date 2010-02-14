(function(){
  var undef;

  var CSSpec = function() {
    CSSpec.enqueue();
    return new CSSpec.Context();
  };
  
  CSSpec.jQuery = jQuery.noConflict(true);
  CSSpec.$ = CSSpec.jQuery;
  
  CSSpec.$.extend(CSSpec, {
    undef: undef,

    examples: [],
    
    addExample: function(example) {
      this.examples.push(example);
      return example;
    },
    
    run: function() {
      this.hijack();
      return;
      var params = CSSpec.parseLocation();
      if(params.start >= 1) {
        CSSpec.examples[params.start - 1].run();
        params.start += 1;
      } else {
        params.start = 1;
        params.end = CSSpec.examples.length;
      }
      
      if(params.start <= params.end) {
        var search = "?" + params.start + "-" + params.end;
        var location = ("" + window.location).replace(/(\?.+)?$/, search);
        window.location = location;
      }
    },
    
    enqueue: function() {
      window.setTimeout(function() { CSSpec.run(); }, 0);
    },
    
    parseLocation: function() {
      var params = {};
      var search = "" + window.location.search;
      var matches = search.match(/^\?(\d+)-?(\d+)/);
      if(matches) {
        console.log(matches);
        params.start = parseInt(matches[1]);
        params.end = parseInt(matches[2]);
      }
      return params;
    },
    
    hijack: function() {
      CSSpec.$("head").empty();
      CSSpec.$("body").empty().html("<body>Hello, world!</body>");
      this.setTitle("CSSpec");
    },
    
    setTitle: function(title) {
      try { document.title = title; }
      catch(e) { try { CSSpec.$("head title").text(title); } catch(e) {} }
    }
  });  
  
  global.CSSpec = CSSpec;
})();
