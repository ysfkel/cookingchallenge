function config(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin')

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		cssmin: {

			minifycss: {
				src: '../development/css/site.css',
				dest: '../production/css/style.min.css'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'../development/css/site.css': '../development/css/site.scss'
				}
			}

		}

	});

	grunt.registerTask('css-build', ['sass', 'cssmin'])
}



module.exports = config;