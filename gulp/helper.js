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
        if (!fs.existsSync(realPath)) { return [] }
        const images = fs.readdirSync(realPath)
        const slides = images.map(image => `class: center middle

background-image: url(/assets/images/${folder}/${image})
background-position: center middle
background-size: contain`)

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

    static joinSlides(folder, lastPage = []) {
        console.log('folder = ', folder)
        const slides = GulpHelper.fullImageSlides(folder).concat(GulpHelper.videoSlides(folder))

        console.log('slides = ', slides)

        return slides.concat(lastPage).join('\n\n---\n\n')
    }

    static generateLinks(translate = key => key) {
        const realPath = path.resolve(__dirname, '..', 'assets', 'images')
        const realPathVideos = path.resolve(__dirname, '..', 'assets', 'videos')
        const folderImages = fs.readdirSync(realPath).filter(f => fs.lstatSync(path.resolve(realPath, f)).isDirectory())
        const folderVideos = fs.readdirSync(realPathVideos).filter(f => fs.lstatSync(path.resolve(realPathVideos, f)).isDirectory())

        const folders = [...new Set(folderImages.concat(folderVideos))]

        return ['- [' + (translate('Index') || 'Index') + '](' + translate('/') + ')'].concat(folders.map(folder => '- [' + (translate(folder) || folder) + '](/' + folder + '.html)'));
    }
}