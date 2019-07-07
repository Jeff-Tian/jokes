'use strict';

var assert = require("assert");
const GulpHelper = require('../gulp/helper.js')

describe("GulpHelper", function () {
  it("generates full screen image slide", function () {
    const folder = 'BottleHat';
    const slide = GulpHelper.fullImageSlides(folder)

    assert(slide === `\t\tclass: center middle

\t\tbackground-image: url(/assets/images/${folder}/bottle-hat-battle.gif)
\t\tbackground-position: center middle
\t\tbackground-size: cover`)
  });

  it('joins all the slides', () => {
    const folder = 'DonaldTrump';
    const slide = GulpHelper.fullImageSlides(folder)

    assert.ok(slide === `\t\tclass: center middle

\t\tbackground-image: url(/assets/images/${folder}/donald-trump.gif)
\t\tbackground-position: center middle
\t\tbackground-size: cover

\t\t---

\t\tclass: center middle

\t\tbackground-image: url(/assets/images/${folder}/donald-trump.jpg)
\t\tbackground-position: center middle
\t\tbackground-size: cover`)
  })
});