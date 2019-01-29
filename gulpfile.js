"use strict";
const   gulp = require("gulp"),
        less = require("gulp-less"),
       debug = require("gulp-debug"),
 browserSync = require("browser-sync").create(),
     plumber = require("gulp-plumber"),
        csso = require("gulp-csso"),
      rename = require("gulp-rename"),
     postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
         del = require("del");
 
gulp.task("clean", function() {
    return del("dist");
});

gulp.task("html", function() {
	return gulp.src("app/*.html")
	.pipe(gulp.dest("dist"))
	.pipe(browserSync.reload())
});

gulp.task("less", function() {
    return gulp.src("app/less/style.less")
    .pipe(plumber())
    .pipe(debug({title: "src"}))
    .pipe(less())
    .pipe(debug({title: "less"}))
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(debug({title: "rename"}))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task("copy", function() {
    return gulp.src([
        "app/*.html",
        "app/fonts/**/*.{woff,woff2}",
        "app/img/**",
        "app/js/**"
    ], {
        base: "app"
    })
    .pipe(gulp.dest("dist"));
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
    });
});
 
gulp.task("watch", function() {
    gulp.watch("app/less/**/*.less", gulp.series("less")),
    gulp.watch("app/*.html", gulp.series("html")),
    gulp.watch("app/js/**/*.js", browserSync.reload);
});

gulp.task("build", gulp.series("clean", "less", "copy", "browser-sync", "watch"));