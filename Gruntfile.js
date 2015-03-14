module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["build/**/*.*", "!build/manifest.json", "!build/chrome/*"]
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
        concat: {
            options: {
                separator: '\n',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            dev: {
                src: [
                    'vendor/angular/angular.js',
                    'vendor/underscore/underscore-min.js',
                    'vendor/angular-native-dragdrop/draganddrop.js',
                    'vendor/ngDialog/js/ngDialog.js',
                    'vendor/angular-ui-router/release/angular-ui-router.min.js',
                    'vendor/angular-ui-router.stateHelper/statehelper.min.js',
                    'build/templates.js',
                    'src/**/*.js',
                ],
                dest: 'build/dim-<%= grunt.template.today("yyyy-mm-dd") %>.js'
            },
        },
        cssmin: {
            dev: {
                files: {
                    'build/dim-<%= grunt.template.today("yyyy-mm-dd") %>.css' : [
                        'vendor/ngdialog/css/ngDialog.css',
                        'build/style.css'
                    ]
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
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images/'
                }]
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
                dest: 'build/window.html',
                options: {
                    styles: {
                        bundle: [
                            'build/dim-<%= grunt.template.today("yyyy-mm-dd") %>.css'
                        ]
                    },
                    scripts: {
                        bundle: [
                            'build/dim-<%= grunt.template.today("yyyy-mm-dd") %>.js'
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
                tasks: [
                    'jshint', 
                    'compass:dev', 
                    'autoprefixer:dev', 
                    //'html2js:dev',
                    'htmlbuild:dev'
                ],
                options: {
                    livereload: true,
                },
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

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
            'cssmin:dev',
            // 'html2js:dev',
            'concat:dev',
            'htmlbuild:dev',
            'imagemin:dev',
        ]
    );

    grunt.registerTask('dev',
        [
            'jshint',
            'compass:dev',
            'cssmin:dev',
            // 'html2js:dev',
            'concat:dev',
            'htmlbuild:dev',
            'imagemin:dev',
            'connect:dev',
            'watch:dev',
        ]
    );


};
