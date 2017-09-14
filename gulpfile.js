var gulp    = require('gulp');
var rename  = require('gulp-rename');
var inject  = require('gulp-inject');
var del     = require('del');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var size    = require('gulp-size');
var minifyCSS = require('gulp-minify-css');


var PATHS = {
  DEST: './public',
  INDEX: './public/index.html',
  APP: [
    './public/app/helpers/utils.js',
    './public/app/helpers/dependencies.cdn.js',
    './public/app/app.js',
    './public/app/app.config.js',
    './public/app/app.routes.js',
    './public/app/app.constants.js',
  ],
  JS: [
    './public/app/pages/*/*.js',
    './public/app/services/*.js',
    './public/app/resources/*.js',
    './public/app/filters/*.js',
    './public/app/directives/*.js',
    './public/app/factories/*.js',
  ],
  CSS: [
    './public/styles/main.css',
    './public/app/pages/*/*.css',
  ],
  DEPENDENCIES: {
    JS: [],
    CSS: [
      "./public/vendor/normalize/normalize.css",
      "./public/vendor/Skeleton/css/skeleton.css",
    ]
  },
  BUILD: 'public/dist'  
};

var FILE_NAME_BUILD_JS  = 'bundle.min.js';
var FILE_NAME_BUILD_CSS = 'bundle.min.css';


var DEFAULT_TASKS = ['inject', 'watch'];

gulp.task('default', DEFAULT_TASKS);
gulp.task('serve'  , DEFAULT_TASKS);
gulp.task('start'  , DEFAULT_TASKS);
gulp.task('build'  , task_build);

gulp.task('watch', task_watch);
gulp.task('reload_html', task_reload_html) 
gulp.task('reload_app', task_reload_app);
gulp.task('reload_css', task_reload_css);
gulp.task('reload_js', task_reload_js);
gulp.task('inject', task_inject);
gulp.task('inject_build_files', task_inject_build_files);



/*
* ===================================
* ===================================
*/


function task_watch() {
  gulp.watch(PATHS.INDEX, ['reload_html']);
  gulp.watch(PATHS.APP  , ['reload_app']);
  gulp.watch(PATHS.CSS  , ['reload_css']);
  gulp.watch(PATHS.JS   , ['reload_js']);
};


function task_reload_html() {
  gulp.src(PATHS.INDEX)
    .pipe(connect.reload());
};


function task_reload_app() {
  gulp.src(PATHS.APP)
    .pipe(connect.reload());
};


function task_reload_css() {
  gulp.src(PATHS.CSS)
    .pipe(connect.reload());
};


function task_reload_js() {
  gulp.src(PATHS.JS)
    .pipe(connect.reload());
};






function task_inject() {
  var target = gulp.src(PATHS.INDEX);

  // app
  target.pipe(
    inject(
      gulp.src(PATHS.APP, {read: false})
      ,{
        name: 'app',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST));


  // js components 
  target.pipe(
    inject(
      gulp.src(PATHS.JS, {read: false})
      ,{
        name: 'components',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST));


  // css components 
  target.pipe(
    inject(
      gulp.src(PATHS.CSS, {read: false})
      ,{
        name: 'styles',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST));


  // js dependencies 
  target.pipe(
    inject(
      gulp.src(PATHS.DEPENDENCIES.JS, {read: false})
      ,{
        name: 'dependencies-js',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST));


  // css dependencies 
  target.pipe(
    inject(
      gulp.src(PATHS.DEPENDENCIES.CSS, {read: false})
      ,{
        name: 'dependencies-css',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST));

};




function task_inject_build_files() {

  console.log('task_inject_build_files')

  
  var target = gulp.src(PATHS.INDEX);

  // app
  target.pipe(
    inject(gulp.src(PATHS.APP), {name: 'app', empty: true}))
    .pipe(gulp.dest(PATHS.DEST)
  );

  // js components 
  target.pipe(
    inject(gulp.src([]), {name: 'components'}))
    .pipe(gulp.dest(PATHS.DEST)
  );

  // css components 
  target.pipe(
    inject(gulp.src([]), {name: 'styles'}))
    .pipe(gulp.dest(PATHS.DEST)
  );

  // js dependencies 
  target.pipe(
    inject(gulp.src([]), {name: 'dependencies'}))
    .pipe(gulp.dest(PATHS.DEST)
  );

  // css dependencies 
  target.pipe(
    inject(gulp.src([]), {name: 'dependencies'}))
    .pipe(gulp.dest(PATHS.DEST)
  );


  gulp.src(PATHS.INDEX).pipe(
    inject(
      gulp.src(PATHS.BUILD + '/' + FILE_NAME_BUILD_JS, {read: false})
      , {
        name: 'bundle',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST)
  );

  gulp.src(PATHS.INDEX).pipe(
    inject(
      gulp.src(PATHS.BUILD + '/' + FILE_NAME_BUILD_CSS, {read: false})
      , {
        name: 'bundle',
        addRootSlash: false,
        ignorePath: 'public',
      }))
    .pipe(gulp.dest(PATHS.DEST)
  );
};





function task_build() {
  var NAME_FILE_APP_JS           = 'app.temp.js';
  var NAME_FILE_APP_CSS          = 'app.temp.css';
  var NAME_FILE_DEPENDENCIES_JS  = 'dependencies.temp.js';
  var NAME_FILE_DEPENDENCIES_CSS = 'dependencies.temp.css';

  // JS
  // dependencied
  gulp.src(PATHS.DEPENDENCIES.JS)
    .pipe(concat(NAME_FILE_DEPENDENCIES_JS))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest(PATHS.BUILD))
    .on('end', function(){
            
      // app
      gulp.src(PATHS.APP.concat(PATHS.JS))
        .pipe(concat(NAME_FILE_APP_JS))
        .pipe(uglify({
          // mangle: false
        }))
        .pipe(gulp.dest(PATHS.BUILD))
        .on('end', function(){

          // result js file
          var resultFiles = [
            PATHS.BUILD + '/' + NAME_FILE_DEPENDENCIES_JS,
            PATHS.BUILD + '/' + NAME_FILE_APP_JS,
          ];

          gulp.src(resultFiles)
            .pipe(concat(FILE_NAME_BUILD_JS))
            .pipe(size({
              title: 'size result JS file'
            }))
            .pipe(gulp.dest(PATHS.BUILD))
            .on('end', function() {
              del(resultFiles);
              __end();
            });
        });
    });
    

  // CSS  
  // dependencied
  gulp.src(PATHS.DEPENDENCIES.CSS)
    .pipe(concat(NAME_FILE_DEPENDENCIES_CSS))
    .pipe(minifyCSS({
      keepBreaks: false
    }))
    .pipe(gulp.dest(PATHS.BUILD))
    .on('end', function(){

      // app
      gulp.src(PATHS.CSS)
        .pipe(concat(NAME_FILE_APP_CSS))
        .pipe(minifyCSS({
          keepBreaks: false
        }))
        .pipe(gulp.dest(PATHS.BUILD))
        .on('end', function(){

          // result css file
          var resultFiles = [
            PATHS.BUILD + '/' + NAME_FILE_DEPENDENCIES_CSS,
            PATHS.BUILD + '/' + NAME_FILE_APP_CSS,
          ];

          gulp.src(resultFiles)
            .pipe(concat(FILE_NAME_BUILD_CSS))
            .pipe(size({
              title: 'size result CSS file'
            }))
            .pipe(gulp.dest(PATHS.BUILD))
            .on('end', function() {
              del(resultFiles);
              __end();
            });
        });
    });


    var ended_tasks_counter = 0;
    function __end() {
      ended_tasks_counter++;

      if (ended_tasks_counter >= 2) {
        gulp.start('inject_build_files');
      }
    }
}



