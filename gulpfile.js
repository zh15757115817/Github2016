var gulp = require('gulp');

var stylus = require('gulp-stylus');

var minifycss = require('gulp-minify-css');

var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();


var reload = browserSync.reload;

var nodemon = require('gulp-nodemon')

gulp.task('nodemon', function(ab){
	var ft = false;
	return nodemon({
		script:'./index.js'
	}).on('start', function(){
		if(!ft){
			ab();
			ft = true;
		}
	})
});

gulp.task('browserSync', ['nodemon'], function(){
	browserSync.init({
		proxy:{
			target:'http://127.0.0.1:9999'
		},
		files:['*'],
		port: 9888,
		open:false
	})
})


gulp.task('stylus',function(){
	return gulp.src('./stylus/**/*.styl')
				.pipe(stylus())
				.pipe(gulp.dest('./public/css/'))
})

gulp.task('minifycss',['stylus'],function(){
	return gulp.src('./public/css/**/*.css')
				.pipe(minifycss())
				.pipe(gulp.dest('./public/mincss'))
})

gulp.task('uglify', function(){
	return gulp.src('./public/js/**/*.js')
				.pipe(uglify())
				.pipe(gulp.dest('./public/minjs'))
})
//监听文件变更
gulp.task('watcher', ['browserSync','stylus', 'uglify'], function(){
	gulp.watch('./stylus/**/*.styl', ['stylus']);
	gulp.watch('./public/js/**/*.js', ['uglify']);
	
	gulp.watch([
		'./public/css/**/*.css',
		'./public/minjs/**/*.js'
	]).on('change', function(){
		reload();
	})
})

//创建一个default任务
gulp.task('default', function(){
	console.log('this default')
})
