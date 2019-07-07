const fs = require('fs')
const path = require('path')
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
module.exports = class GulpHelper {
    static fullImageSlides(folder) {
        const realPath = path.resolve(__dirname, '..', 'assets', 'images', folder)
        const images = fs.readdirSync(realPath)
        const slides = images.map(image => `class: center middle

background-image: url(/assets/images/${folder}/${image})
background-position: center middle
background-size: cover`)

        return slides
    }

    static videoSlides(folder) {
        const realPath = path.resolve(__dirname, '..', 'assets', 'videos', folder)

        if (!fs.existsSync(realPath)) {
            return []
        }

        const videos = fs.readdirSync(realPath)
        const slides = videos.map(video => `class: middle center

<video width="100%" height="100%" controls>
\t<source src="/assets/videos/${folder}/${video}" type="video/mp4">
</video>`)

        return slides
    }

    static joinSlides(folder) {
        const slides = GulpHelper.fullImageSlides(folder).concat(GulpHelper.videoSlides(folder))

        return shuffle(slides).join('\n\n---\n\n')
    }

    static generateLinks() {
        const realPath = path.resolve(__dirname, '..', 'assets', 'images')
        const folders = fs.readdirSync(realPath).filter(f => fs.lstatSync(path.resolve(realPath, f)).isDirectory())

        return folders.map(folder => '- [' + folder + '](/' + folder + ')');
    }
}