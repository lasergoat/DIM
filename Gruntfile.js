module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["build/**/*.*"]
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src',
                    cssDir: 'build',
                    importPath: 'vendor'
                }
            },
        },
        connect: {
            dev: {
                options: {
                    port: 9000,
                    base: ['', 'vendor', 'build'],
                    livereload: true
                }
            },
        },
        csslint: {
            dev: {
                options: {
                    import: false
                },
                src: ['build/**/*.css']
            },
        },
        html2js: {
            options: {
                module: 'templates'
            },
            dev: {
                src: ['src/**/*.html'],
                dest: 'build/templates.js'
            },
        },
        htmlbuild: {
            dev: {
                src: 'src/index.html',
                dest: 'build',
                options: {
                    styles: {
                        bundle: [ 
                            'vendor/ngdialog/css/ngDialog.min.css',
                            'build/**/*.css'
                        ]
                    },
                    scripts: {
                        bundle: [
                            'vendor/angular/angular.js',
                            'vendor/underscore/underscore-min.js',
                            'vendor/angular-native-dragdrop/draganddrop.js',
                            'vendor/ngDialog/js/ngDialog.js',
                            'vendor/angular-ui-router/release/angular-ui-router.min.js',
                            'vendor/angular-ui-router.stateHelper/statehelper.min.js',
                            'build/templates.js',
                            'src/**/*.js'
                        ]
                    },
                }
            },
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                camelcase:false,
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:false,
                noarg:true,
                sub:true,
                laxbreak: true,
                boss:true,
                eqnull:true,
                globals: {
                    _: true,
                    angular: true,
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        autoprefixer: {
            dev: {
                src: 'build/style.css'
            },
        },
        watch: {
            dev: {
                files: ['<%= jshint.files %>', 'src/**/*.scss', '<%=csslint.dev.src %>' ,'src/**/*.html'],
                tasks: ['jshint', 'compass:dev', 'autoprefixer:dev', 'html2js:dev', 'htmlbuild:dev'],
                options: {
                    livereload: true,
                },
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // on watch events configure jshint, csslint, sass, htmlbuild to only run on changed file
    grunt.event.on('watch:dev', function(action, filepath) {
      grunt.config('jshint.all.src', filepath);
      grunt.config('compass.dev.options.sassDir', filepath);
      grunt.config('csslint.dev.src', filepath);
      grunt.config('htmlbuild.dev.src', filepath);
    });

    grunt.registerTask('default',
        [
            'jshint',
            'compass:dev',
            // 'html2js:dev',
            'htmlbuild:dev',
        ]
    );

    grunt.registerTask('dev',
        [
            'jshint',
            'compass:dev',
            // 'html2js:dev',
            'htmlbuild:dev',
            'connect:dev',
            'watch:dev',
        ]
    );


};
