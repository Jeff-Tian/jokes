'use strict';

var assert = require("assert");
const GulpHelper = require('../gulp/helper.js')

describe("GulpHelper", function () {
  it("generates full screen image slide", function () {
    const folder = 'BottleHat';
    const slide = GulpHelper.fullImageSlides(folder)

    assert.deepStrictEqual(slide, [`class: center middle

background-image: url(/assets/images/${folder}/bottle-hat-battle.gif)
background-position: center middle
background-size: contain`])
  });

  it('joins all the slides', () => {
    const folder = 'DonaldTrump';
    const slide = GulpHelper.fullImageSlides(folder).join('\n\n---\n\n')

    assert.ok(slide === `class: center middle

background-image: url(/assets/images/${folder}/donald-trump.gif)
background-position: center middle
background-size: contain

---

class: center middle

background-image: url(/assets/images/${folder}/donald-trump.jpg)
background-position: center middle
background-size: contain`)
  })

  it('generates links', () => {
    assert.deepStrictEqual(['- [Index](/)', '- [BottleHat](/BottleHat.html)', '- [DonaldTrump](/DonaldTrump.html)', '- [ShaYi](/ShaYi.html)'], GulpHelper.generateLinks())
  })
});
