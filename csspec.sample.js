/* CSSpec: Theoretical BDD for CSS based on jQuery. Doesn’t exist yet. */

CSSpec.describe("application.css", function() {
  this.describe("all layouts", function() {
    this.describe("body", function() {
      this.it("has a white background", function() {
        this.value(this.selected.css("background-color")).should.be.color("#fff")
      })
    })
  })
})

with(CSSpec.describe("application.css")) {
  describe("all layouts", function() {
    describe("body", function() {
      it("has a white background", function() {
        value(selected.css("background-color")).should.be.color("#fff")
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
        value(this.offset().top).should.equal($("#alpha").offset().top)
      })
    })
  })
}
