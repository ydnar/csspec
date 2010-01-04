CSSpec
======

BDD for CSS. Inspired by [RSpec](http://rspec.info/), [JSpec](http://visionmedia.github.com/jspec/), [Screw.Unit](http://github.com/nkallen/screw-unit), [jQuery](http://jquery.com/) and unicorns. 

Why?
---

Because manually testing CSS sucks. Because they’re *cascading*. Because less time testing means more time for IE6.

How?
----

CSSpec uses a lightweight DSL that doesn’t pollute global objects, knows how to compare equal-but-different values for CSS colors and dimensions and groks browser differences. <sup>1</sup>

    with(CSSpec.describe("application.css")) {
      describe("(all layouts)", function(){
        describe("body", function() {
          it("has no padding", function() {
            expect($("body").css("padding-left")).toEqual("0px")
          })
    
          it("has a white background", function() {
            expect($("body").css("background-color")).toEqual("rgb(255, 255, 255)")
          })

          it("has black text", function() {
            expect($("body").css("color")).toEqual("rgb(0, 0, 0)")
          })
        })
      })

      run();
    }

Huh?
----

[1] It’s not even close to done.

Who?
---

CSSpec is © 2009 Randy Reddig.


