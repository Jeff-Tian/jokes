const fs = require('fs')
const path = require('path')

module.exports = class GulpHelper {
    static fullImageSlides(folder) {
        const realPath = path.resolve(__dirname, '..', 'assets', 'images', folder)
        const images = fs.readdirSync(realPath)
        const slides = images.map(image => `\t\tclass: center middle

\t\tbackground-image: url(/assets/images/${folder}/${image})
\t\tbackground-position: center middle
\t\tbackground-size: cover`)

        return slides.join('\n\n\t\t---\n\n')
    }
}