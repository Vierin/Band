let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){ // для удалления папки dist
    del.sync('dist')
});

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'})) // expanded - красиво выводит css, а compresed - минифицирует
        .pipe(autoprefixer({
            browsers: ['last 8 versions']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        // 'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/slick-carousel/slick/slick.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({stream: true})) // авто обнавление  бразуера при изменениях файлов html
});

gulp.task('script', function(){
    return gulp.src('app/**/*.js')
        .pipe(browserSync.reload({stream: true})) // авто обнавление  бразуера при изменениях файлов html
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('export', function(){
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
    
    let BuildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));
    
    let BuildJs = gulp.src('app/css/**/*.js')
        .pipe(gulp.dest('dist/js'));

    let BuildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let BuildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){  //само активирует галп таски, чтобы потом выйти с watching нужно ctr+c в npm
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/**/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'));
// автоматически запускает таски
gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch')) // анулирует блокировку npm при запуске тасков, запускает сервер таском просто gulp

