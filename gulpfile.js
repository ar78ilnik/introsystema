var     gulp = require("gulp"),
            less = require("gulp-less"),
 browserSync = require("browser-sync"),
       plumber = require("gulp-plumber"),
          csso = require("gulp-csso"),
        rename = require("gulp-rename"),
       postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
                 del = require("del");
 
gulp.task("clean", function() {
    return del("dist");
});
 
gulp.task("copy", function() {
    return gulp.src([
        "app/fonts/**/*.{woff,woff2}",
        "app/img/**",
        "app/js/**"
    ], {
        base: "app"
    })
    .pipe(gulp.dest("dist"));
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
    browserSync({
        server: {
            baseDir: "app"
        },
    });
});
 
gulp.task("watch", ["clean", "copy", "less", "browser-sync"], function() {
    gulp.watch("app/less/**/*.less", ["less"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});