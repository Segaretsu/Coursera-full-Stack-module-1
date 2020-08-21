'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin');
const done = () => { console.log('Task success') };

/**
 * Tarea para generar los archivos css de los sass, si se generan cambios
 */
gulp.task('sass', function () {
    return gulp.src('./sass/*.scss') // Donde estan los archivos scss
        .pipe(sass().on('error', sass.logError)) //Sí el evento sass tira error
        .pipe(gulp.dest('./css')); //Donde se va a generar
});

/**
 * Tarea para observar los cambios hechos en los archivos *.scss
 */
gulp.task('sass:watch', function() {
    return gulp.watch('./sass/*.scss', ['sass']);
});

/**
 * Tarea para observar los cambios en los archivos del proyecto, para desplegar de nuevo el servidor
 */
gulp.task('browser-sync', function () {
    var files = ['./*.html', './css/*.css', './img/*.{png,jpg,gif}', './js/*.js'];
    return browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

/**
 * Tarea para limpiar la carpeta donde ira nuestra versión distributiva del proyecto
 */
gulp.task('clean', () => {
    return del(['dist']);
});

/**
 * Tarea encargada de generar los archivos respectivos de los iconos
 */
gulp.task('copyfonts', () => {
    return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
        .pipe(gulp.dest('./dist/fonts'));
});

/**
 * Tarea para comprimir las imagenes utilizadas en el proyecto
 */
gulp.task('imagemin', () => {
    return gulp.src('./images/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin({
            optimizationlevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'));
});

/**
 * Tarea encargada de concatenar los archivos la versión más reducida de los mismos
 */
gulp.task('usemin', () => {
    return gulp.src('./*.html')
       .pipe(flatmap((stream, file) => {
            return stream
                .pipe(usemin ({
                    css: [rev()],
                    html: [() => { return htmlmin ( {collapseWhitespace: true} )}],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']
                }));
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin', async () => {
    done();
}));

gulp.task('default', gulp.series('browser-sync', () => {
    gulp.start('sass:watch');
}));