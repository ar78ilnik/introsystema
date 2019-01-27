"use strict";
const   gulp = require("gulp"),
        util = require("gulp-util"),
        less = require("gulp-less"),
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

/*function clean() {
    return del(["dist"]);
}*/

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

gulp.task("html", function() {
	gulp.src("app/*.html")
	.pipe(gulp.dest("dist"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("less", function() {
    return gulp.src("app/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
    });
});
 
gulp.task("watch", gulp.series("clean", "copy", "less", "browser-sync"), function() {
    gulp.watch("app/less/**/*.less", ["less"]);
    gulp.watch("app/*.html", ["html"]);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});
