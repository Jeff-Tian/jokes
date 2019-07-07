var options = {};
var renderMath = function () {
    renderMathInElement(document.body);
    // or if you want to use $...$ for math,
    // renderMathInElement(document.body, {delimiters: [ // mind the order of delimiters(!?)
    //     {left: "$$", right: "$$", display: true},
    //     {left: "$", right: "$", display: false},
    //     {left: "\\[", right: "\\]", display: true},
    //     {left: "\\(", right: "\\)", display: false},
    // ]});
}

var slideshow = remark.create(options, renderMath);