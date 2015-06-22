"use strict";

/**
 * packages (gulp)
 */
var gulp = require("gulp");
var csscomb = require("gulp-csscomb");
var csslint = require("gulp-csslint");
var postcss = require("gulp-postcss");
var stylestats = require("gulp-stylestats");

/**
 * packages (others)
 */
var autoprefixer = require("autoprefixer-core");
var del = require("del");
var sequence = require("run-sequence");

/**
 * directories
 */
var dirs = {
  dist: "dist",
  src: "src"
};

//////////////////////////////////////////////////

gulp.task("build", function (cb) {
    return sequence("clean", "copy", ["comb", "autoprefixer"], ["test", "stats"], cb);
});

gulp.task("watch", function() {
    gulp.watch(dirs.src + "/*.css", ["build"]);
});

gulp.task("clean", del.bind(null, [
    dirs.dist + "/*.css",
], {dot: true}));

gulp.task("copy", function() {
    return gulp.src(dirs.src + "/*.css")
        .pipe(gulp.dest(dirs.dist));
});

gulp.task("autoprefixer", function () {
    return gulp.src(dirs.dist + "/*.css")
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 2 versions",
                    "Firefox ESR"
                ]
            })
        ]))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task("comb", function () {
    return gulp.src(dirs.dist + "/*.css")
        .pipe(csscomb())
        .pipe(gulp.dest(dirs.dist));
});

gulp.task("test", function () {
    return gulp.src(dirs.dist + "/*.css")
        .pipe(csslint('csslintrc.json'))
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});

gulp.task("stats", function () {
    return gulp.src(dirs.dist + "/*.css")
        .pipe(stylestats());
});
