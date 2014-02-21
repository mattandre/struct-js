
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src/',
					name: 'struct',
					optimize: 'none',
					findNestedDependencies: true,
					preserveLicenseComments: false,
					out: 'dist/<%= pkg.name %>.lite.js',
					paths: {
						almond: '../includes/almond.js'
					}
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [ 'includes/intro.js', 'includes/almond.js', 'dist/<%= pkg.name %>.lite.js', 'includes/outro.js' ],
				dest: 'dist/<%= pkg.name %>.js',
			},
		},
		uglify: {
			options: {
				preserveComments: false,
				banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: {
					global_defs: {
						DEBUG: false
					}
				}
			},
			build: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		jsonlint: {
			pkg: {
				src: [ 'package.json' ]
			},
			bower: {
				src: [ 'bower.json' ]
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'src/**/*.js', 'Gruntfile.js', 'spec/**/*.js'
				],
				options: {
					jshintrc: true
				}
			},
			dist: {
				src: 'dist/<%= pkg.name %>.lite.js',
				options: {
					jshintrc: true
				}
			}
		},
		jscs: {
			src: 'src/**/*.js',
			spec: 'spec/**/*.js',
			grunt: 'Gruntfile.js',
		},
		bowercopy: {
			options: {
				clean: true
			},
			test: {
				options: {
					destPrefix: 'libs'
				},
				files: {
					'sinon.js': 'sinon/lib/sinon.js'
				}
			},
			libs: {
				files: {
					'includes/almond.js': 'almond/almond.js'
				},
			},
		},
		connect: {
			test: {
				port: 8000
			}
		},
		jasmine: {
			src: [ 'src/**/*.js',  ],
			options: {
				host: 'http://127.0.0.1:8000/',
				specs: 'spec/**/*Spec.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfig: {
						baseUrl: './'
					}
				}
			}
		},
		watch: {
			scripts: {
				files: [ 'src/**/*.js', 'spec/**/*.js' ],
				tasks: [ 'dev' ]
			},
		}
	});

	require('load-grunt-tasks')(grunt, { pattern: [ 'grunt-*', '!grunt-template-jasmine-requirejs' ] });

	grunt.registerTask('bower', [ 'bowercopy' ]);
	grunt.registerTask('dev', [ 'requirejs', 'jshint', 'jscs', 'test' ] );
	grunt.registerTask('build', [ 'jsonlint', 'bower', 'dev', 'concat', 'uglify' ]);
	grunt.registerTask('test', [ 'connect', 'jasmine' ]);
	grunt.registerTask('default', [ 'build' ]);
};
