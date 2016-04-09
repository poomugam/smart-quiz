var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');

gulp.task('cleanClientDir', function() {
    return gulp.src('built/client').pipe(rimraf());
});

gulp.task('cleanServerDir', function() {
    return gulp.src('built/server').pipe(rimraf());
});

gulp.task('buildBackEnd', ['cleanServerDir'], function() {
    var tsProject = ts.createProject(path.resolve('./src/server/tsconfig.json'));
    return gulp.src(path.resolve('./src/server/**/*.ts'))
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest(path.resolve('./built/server')));
});

gulp.task('copySrc', ['cleanClientDir'], function() {
    var _target = gulp.src([path.resolve('./src/client/**/*.css'),path.resolve('./src/client/**/*.html')]);
    var _dest = gulp.dest(path.resolve('./built/client/'));
    _target.pipe(_dest);
});

gulp.task('buildFrontEnd', ['copySrc'], function() {
    var tsProject = ts.createProject(path.resolve('./src/client/tsconfig.json'));
    return gulp.src(path.resolve('./src/client/**/*.ts'))
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest(path.resolve('./built/client/')));
});

gulp.task('injectDep', ['buildFrontEnd'], function () {
    
    var wiredep = require('wiredep').stream;
    var options = {
        "overrides": {
            "bootstrap": {
                "main": [
                    // "dist/js/bootstrap.js",
                    "less/bootstrap.less",
                    "dist/css/bootstrap.css"

                ]
            }
        },
        ignorePath: '../../public'
    };

    var target = gulp.src(path.resolve('./src/client/**/*.ejs'));
    var dest = gulp.dest(path.resolve('./built/client/'));
    var angular2_sources = gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.dev.js',
        'built/client/style.css'
    ], {
        read: false
    });

    return target.pipe(wiredep(options))
        .pipe(inject(angular2_sources, {
            ignorePath: 'built/'
        }))
        .pipe(dest);
});

gulp.task('browser-reload',['injectDep'],function(){
    console.log("browser sync reloadn on file change");
    browserSync.reload();    
});

gulp.task('watchClient', function() {
    gulp.watch(
        [
            'src/client/**/*.ts',
            'src/client/**/*.ejs',
            'src/client/**/*.html'
        ],
        [
            'browser-reload'
        ]
    );
});

gulp.task('watchServer', function() {
    gulp.watch(
        [
            'src/server/**/*.*',
        ],
        [
            'buildBackEnd'
            ,'browser-reload'
        ]
    );
});

gulp.task('watch', [
    'watchServer',
    'watchClient'
]);

gulp.task('nodemon', ['buildBackEnd', 'injectDep','watch'], function(cb) {
    var started = false;
    nodemon({
        script: './built/server/server.js'
        ,ignore:['gulpfile.js','/built/*',"node_modules/*","/public/*","/src/*"] 
        // ,tasks : function(changedFile){
        //     var tasks = [];
        //     if(path.dirname(changedFile).split(path.sep)[1] === "server") {
        //         tasks.push('buildBackEnd');
        //         tasks.push('browser-reload');
        //     }            
        //     return  tasks;
        // }
    }).on('start', function(){
        console.log("nodemon started server.js");
        if(!started)
            cb();
        started = true;
    }).on('restart', function() {
        console.log('nodemon restarted server.js');
    })
    
});

gulp.task('browser-sync',['nodemon'],function(){
    browserSync.init({
        proxy: "http://localhost:3000"
    });
});

gulp.task('serve',['browser-sync']);
gulp.task('start', ['serve']);
gulp.task('default', ['start']);