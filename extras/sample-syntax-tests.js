/* CSSpec: Theoretical BDD for CSS based on jQuery. Doesn’t exist yet. */

(CSSpec)
  ("application.css")
    ("all layouts")
      ("body")
        ("has a white background", function() {
          this($("body").css("background-color")).shouldEqual("rgb(255, 255, 255)")
        })
      ()
    ()
  ()
()

CSSpec.describe("application.css", function() {
  this.describe("all layouts", function() {
    this.describe("body", function() {
      this.it("has a white background", function() {
        this.value(this.selected.css("background-color")).should.be.color("#fff")
      })
    })
  })
})

CSSpec.describe("application.css")
  .describe("all layouts")
    .describe("body")
      .it("has a white background", function() {
        
      })
    .end
  .describe("two-column layout")

with(CSSpec) {
  describe("application.css")
    .describe("body")
      .it("has a white background", function() {
        expect($("body").css("background-color")).toEqual("#fff")
      })
    .end
  .end
}

with(CSSpec) {
  describe("application.css")
    describe("body")
      it("has a white background", function() {
        expect($("body").css("background-color")).toEqual("rgb(255, 255, 255)")
      })
    end()
  end()
}

with(CSSpec.describe("application.css")) {
  describe("all layouts", function() {
    describe("body", function() {
      it("has a white background", function() {
        expect($("body").css("background-color")).to.be.color("#fff")
        expect($("h1").css("font-family")).to.match(/^helvetica/i)
        expect($("h1").offset.top).to.be.greater.than(10)
        expect($("h1").css("line-height")).toBeMultipleOf(20)
        expect($("h1").css("line-height")).to.be.multiple.of(20)
      })
    })
  })
}

with(CSSpec.describe("application.css")) {
  describe("all layouts", function() {
    describe("body", function() {
      it("has a white background", function() {
        value(this.css("background-color")).should.be.color("#fff")
      })
    
      it("has black text", function() {
        value(this.css("color")).should.be.color("black")
      })
    })
  })
  
  describe("two-column layout (thin, wide)" function() {
    before(function() {
      $("body").removeClass().addClass("tw")
    })
  
    describe("#alpha", function() {
      it("is offset 300px pixels from the left", function() {
        value(this.position().left).should.be("300px")
      })
    })

    describe("#beta", function() {
      it("is top-aligned with #alpha", function() {
        expect(this.offset().top).to.equal($("#alpha").offset().top)
      })
    })
  })
}
