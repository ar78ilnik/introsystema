var     gulp = require("gulp"),
		    less = require("gulp-less"),
 browserSync = require("browser-sync"),
	   plumber = require("gulp-plumber"),
	      csso = require("gulp-csso"),
	    rename = require("gulp-rename"),
	   postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer");

gulp.task("less", function() {
	return gulp.src("app/less/style.less")
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer()
	]))
	.pipe(gulp.dest("app/css"))
	.pipe(csso())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("app/css"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("browser-sync", function() {
	browserSync({
		server: {
			baseDir: "app"
		},
	});
});

gulp.task("watch", ["browser-sync", "less"], function() {
	gulp.watch("app/less/**/*.less", ["less"]);
	gulp.watch("app/*.html", browserSync.reload);
	gulp.watch("app/js/**/*.js", browserSync.reload);
});