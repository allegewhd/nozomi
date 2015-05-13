"use strict";

/**
 * directories
 */
var dirs = {
  src: "./src",
  test: "./test"
};

/**
 * packages (gulp)
 */
var gulp = require("gulp");
var csscomb = require("gulp-csscomb");
var csslint = require("gulp-csslint");
var postcss = require("gulp-postcss");
var shell = require("gulp-shell");
var stylestats = require("gulp-stylestats");

/**
 * packages (others)
 */
var autoprefixer = require("autoprefixer-core");
var del = require("del");
var sequence = require("run-sequence");

//////////////////////////////////////////////////

gulp.task("build", function (cb) {
    return sequence("clean", "test", ["comb", "autoprefixer"], "stats", cb);
});

gulp.task("check", shell.task("npm-check"));

gulp.task("clean", del.bind(null, [
    dirs.dist + "/*.css",
], {dot: true}));

gulp.task("test", function () {
    return gulp.src("./src/*.css")
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});

gulp.task("autoprefixer", function () {
    return gulp.src("./src/*.css")
        .pipe(postcss([
            autoprefixer({
                browsers: ["last 2 version"]
            })
        ]))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("comb", function () {
    return gulp.src("./src/*.css")
        .pipe(csscomb())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("stats", function () {
    return gulp.src("./src/*.css")
        .pipe(stylestats());
});
