var gulp = require("gulp");
const GulpHelper = require('./gulp/helper')
var jshint = require("gulp-jshint");
var sh = require("shelljs");
var karma = require("karma").server;
var bump = require("gulp-bump");
require("gulp-print");
var uglify = require("gulp-uglify"),
  clean = require("gulp-clean"),
  uglifyCss = require("gulp-minify-css"),
  jade = require("gulp-jade");
const zhCN = require("./locales/zh");
const enUS = require("./locales/en");
const fs = require('fs');
var rename = require("gulp-rename");
var favicons = require('gulp-favicons');

gulp.task('favicon', () => {
  return gulp
    .src('./assets/logo.jpg')
    .pipe(
      favicons({
        appName: 'Jokes 笑话合集',
        appShortName: 'Jokes',
        appDescription: 'Online Jokes Album',
        developerName: 'Jeff Tian',
        developerURL: 'https://jokes.js.org',
        background: '#020307',
        path: 'favicons/',
        url: 'https://jokes.js.org/',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        version: 1.0,
        logging: false,
        html: 'index.html',
        pipeHTML: true,
        replace: true,
      })
    )
    .pipe(gulp.dest('./dist'));
})

gulp.task("jshint", function () {
  gulp
    .src(["./www/js/**/*.js", "./tests/**/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("mocha", function (done) {
  sh.exec("mocha", done);
});

gulp.task("start", function (done) {
  sh.exec("node app.js", done);
});

gulp.task("test", function (done) {
  karma.start({
      configFile: __dirname + "/tests/karma.conf.js",
      singleRun: true
    },
    done
  );
});

gulp.task("bump", function () {
  gulp
    .src(["./package.json", "./bower.json"])
    .pipe(bump())
    .pipe(gulp.dest("./"));
});

gulp.task("clean", function (done) {
  return gulp
    .src(["dist", "public/templates"], {
      read: false,
      allowEmpty: true
    })
    .pipe(clean());
});

gulp.task(
  "copy",
  gulp.parallel(
    function (done) {
      return gulp.src(["public/**/*"]).pipe(gulp.dest("dist/"));
    },
    function (done) {
      return gulp.src(["node_modules/gojs/**/*"]).pipe(gulp.dest("dist/gojs"));
    },
    () => {
      return gulp
        .src(["node_modules/katex/**/*"])
        .pipe(gulp.dest("dist/lib/katex"));
    },
    function (done) {
      return gulp.src(["locales/**/*"]).pipe(gulp.dest("dist/locales"));
    },
    () => {
      return gulp.src(["assets/**/*"]).pipe(gulp.dest("dist/assets"));
    },
    () => {
      return gulp.src(['README.md', 'README_zh-CN.md']).pipe(gulp.dest('dist'))
    },
    () => {
      return gulp.src(['README.md', 'README_zh-CN.md']).pipe(gulp.dest('dist/en'))
    },
    () => {
      return gulp.src(['README.md', 'README_zh-CN.md']).pipe(gulp.dest('dist/zh'))
    }
  )
);

gulp.task("uglify-js", function (done) {
  return gulp
    .src("public/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("uglify-css", function (done) {
  return gulp
    .src("public/stylesheets/*.css")
    .pipe(uglifyCss())
    .pipe(gulp.dest("dist/stylesheets"));
});

gulp.task("jade", function (done) {
  const files = fs.readdirSync('./views/');
  const jades = files.filter(f => f.endsWith('.jade'))

  const slides = fs.readdirSync('./assets/images')
  const folders = slides.filter(f => fs.lstatSync('./assets/images/' + f).isDirectory())

  const pages = jades.map(f => ({
    src: './views/' + f,
    dest: './dist/',
    locale: zhCN,
    locals: {
      otherLocaleLink: '/en',
      otherLocale: 'en',
    }
  })).concat(jades.map(f => ({
    src: './views/' + f,
    dest: './dist/en',
    locale: enUS,
    locals: {
      otherLocaleLink: '/zh',
      otherLocale: 'zh',
    }
  }))).concat(folders.map(folder => ({
    src: './views/templates/slides.jade',
    dest: './dist',
    rename: folder + '.html',
    locale: zhCN,
    locals: {
      otherLocaleLink: '/en',
      otherLocale: 'en',
      slides: GulpHelper.joinSlides(folder)
    }
  }))).concat(folders.map(folder => ({
    src: './views/templates/slides.jade',
    dest: './dist',
    rename: 'en/' + folder + '.html',
    locale: enUS,
    locals: {
      otherLocaleLink: '/en',
      otherLocale: 'en',
      slides: GulpHelper.joinSlides(folder)
    }
  })))

  return runJade(pages)(done);
});

gulp.task("replace", function (done) {
  var replace = require("gulp-replace");

  gulp
    .src(["public/semantic/dist/semantic.min.css"])
    //.pipe(replace(/https:\/\/fonts.googleapis.com\/css/g, 'http://fonts.useso.com/css'))
    .pipe(replace(/https:\/\/fonts.googleapis.com\/css/g, ""))
    .pipe(gulp.dest("public/semantic/dist/"));

  done();
});

gulp.task(
  "build",
  gulp.series("clean", "replace", "favicon", "jade", "copy", "uglify-js", "uglify-css")
);

function runJade(jadeFiles) {
  return gulp.parallel(
    ...jadeFiles.map(jf => () => {
      const pipes = gulp
        .src(jf.src)
        .pipe(
          jade({
            locals: {
              __: function (key) {
                return jf.locale[key];
              },
              ...(jf.locals || {})
            }
          })
        )

      return jf.rename ? pipes
        .pipe(rename(jf.rename))
        .pipe(gulp.dest(jf.dest)) : pipes.pipe(gulp.dest(jf.dest))
    })
  );
}

gulp.task("default", gulp.series("build", "start"));