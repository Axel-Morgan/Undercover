let gulp = require ('gulp');

//КОНВЕРТАЦИЯ PUG
let pug = require ('gulp-pug');

gulp.task('pug', function(){
    return gulp.src('#src/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('#src/../'))
});

//СБОРКА ВСЕХ JS В один файл
let concat = require ('gulp-concat');

gulp.task('concat', function(){
    return gulp.src('#src/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('js/'))
});

//СЛЕЖКА ФАЙЛОВ
gulp.task('watch', function(){
    gulp.watch('#src/**/*.pug', gulp.parallel('pug'));
    gulp.watch('#src/**/*.js', gulp.parallel('concat'));
});

gulp.task('default', gulp.parallel('watch'));