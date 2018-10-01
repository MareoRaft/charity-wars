/////////////////// IMPORTS ///////////////////
const gulp = require('gulp')

const compass = require('gulp-for-compass')
const autoprefixer = require('gulp-autoprefixer')

/////////////////// GLOBALS ///////////////////
const src_assets = 'source/client/assets'
const src_assets_targeted = src_assets + '/**/*'
const bld_assets = 'build/assets'
const src_scss = 'source/client/stylesheets'
const src_scss_targeted = src_scss + '/**/*.scss'
const bld_scss = 'build/stylesheets'
const src_js = 'source/client/scripts'
const src_js_targeted = src_js + '/**/*.js'
const bld_js = 'build/scripts'
const src_html_targeted = 'source/client/**/*.html'

const log_standard = function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
}

///////////////////// MAIN /////////////////////
gulp.task('css', function() {
	gulp.src(src_scss_targeted)
		.pipe(compass({
			sassDir: src_scss,
			cssDir: bld_scss,
			force: true,
		}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'], // see https://github.com/browserslist/browserslist#queries
			cascade: false,
		}))
		.pipe(gulp.dest(bld_scss))
})

gulp.task('js', function() {
	gulp.src(src_js_targeted)
		.pipe(gulp.dest(bld_js))
})

gulp.task('html', function() {
	gulp.src('source/client/index.html')
		.pipe(gulp.dest('build'))
})

gulp.task('assets', function() {
	gulp.src(src_assets_targeted)
		.pipe(gulp.dest(bld_assets))
})

gulp.task('watch', function() {
	// css watcher
	var watch_css = gulp.watch(src_scss_targeted, ['css'])
	watch_css.on('change', log_standard)
	// js watcher
	var watch_js = gulp.watch(src_js_targeted, ['js'])
	watch_js.on('change', log_standard)
	// html watcher
	var watch_html = gulp.watch(src_html_targeted, ['html'])
	watch_html.on('change', log_standard)
	// assets watcher
	var watch_assets = gulp.watch(src_assets_targeted, ['assets'])
	watch_assets.on('change', log_standard)
})

gulp.task('default', ['js', 'html', 'css', 'assets', 'watch'])
