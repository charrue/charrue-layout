const gulp = require("gulp");
const scss = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const cssmin = require("gulp-cssmin");

exports.default = function css(done) {
  gulp
    .src("../packages/layout-internal/styles/index.scss")
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(cssmin())
    .pipe(gulp.dest("."));
  done();
};
