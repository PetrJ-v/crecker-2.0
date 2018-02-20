var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	// imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	// pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	// cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	uglify       = require('gulp-uglifyjs');
	browserSync  = require('browser-sync'),
	rev          = require('gulp-rev-append'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: true
	}))
	// .pipe(cssnano())
	// .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
	])
	// .pipe(concat('libs.min.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js ', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		// 'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildImg = gulp.src('app/img/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/img'))

	var buildHtml = gulp.src('app/index.html') // Переносим HTML в продакшен
	.pipe(rev())									// Добавляем хэши к подключаемым файлам чтобы избежать кэширования браузером при обновлении версии файлов
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);