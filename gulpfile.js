const gulp    = require('gulp');
const sass    = require('gulp-sass');
const notify  = require("gulp-notify");
const plumber = require("gulp-plumber");
const autoprefixer = require('gulp-autoprefixer');
const uglify  = require('gulp-uglify');
const changed  = require('gulp-changed');
const browserSync  = require('browser-sync').create();
const cleanCss  = require('gulp-clean-css');
const sourcemaps  = require('gulp-sourcemaps');
const queries  = require('gulp-group-css-media-queries');
const imagemin  = require('gulp-imagemin');
const pngquant  = require('imagemin-pngquant');
const jpegtran = require('imagemin-jpegtran');

//setting : paths
const paths = {
  'allDist': './html/dist/*',
  'scss'   : './src/scss/',
  'css'    : './html/dist/css/',
  'jsSrc'  : './src/js/',
  'jsDist' : './html/dist/js/',
  'imgSrc' : './src/img/',
  'imgDist': './html/dist/img/'
}

//setting : Sass Options
const sassOptions = {
  outputStyle: 'compressed',
}

//gulpコマンドの省略
const { watch, series, task, src, dest } = require('gulp');

//Sass
task('sass', function () {
  return (
    src(paths.scss + '**/*.scss')
      .pipe(plumber({ errorHandler: notify.onError({
        title: "Sassエラー発見！",
        message: "<%= error.message %>"
      })
    }))
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions))
      .pipe(cleanCss())
      .pipe(queries())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(changed(paths.allDist))
      .pipe(dest(paths.css))
      .pipe(browserSync.stream())
  );
});

//JS Compress
task('js', function () {
  return (
    src(paths.jsSrc + '**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "JavaScriptエラー発見！", 
        message: "<%= error.message %>"
      })
    }))
      .pipe(uglify())
      .pipe(dest(paths.jsDist))
  );
});


//jpg,png,svg,gif Compress
task('imagemin', function () {
  return (
    src(paths.imgSrc + '**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin(
      [
        pngquant({ quality: [.7, .85], speed: 1 }),
        jpegtran({ quality: 80 }),
        imagemin.svgo(),
        imagemin.gifsicle()
      ]
    ))
    .pipe(gulp.dest(paths.imgDist))
  );
});


//browser auto reload 
task('server', function() {
  return (
  browserSync.init({
    server: {
      baseDir: './html/',
    }
  })
  );
});

task('browser-reload', function () {
  return (
    browserSync.reload()
  );
});



//watch
watch([paths.scss + '**/*.scss'], task('sass'));
watch([paths.jsSrc + '**/*.js'], task('js'));
watch(['./html/**/*'], task('browser-reload'));
task('default', series('sass', 'js', 'server', 'browser-reload'));