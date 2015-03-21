/*jshint node: true*/

var _ = require("lodash"),

	fmd = require("fmd");

module.exports = function (grunt) {

    grunt.registerMultiTask('modularize', function () {
        var done = this.async(),

            modules = {},

            config = {
    			target: this.target + '/',
    			factories: ["commonjs", "amd", "global"],
    			trim_whitespace: true,
    			new_line: "unix",
    			indent: "\t"
    		};

        // Prepare Factory-Module-Definition settings
        _.each(this.options(), function (conf, module) {
    		var sources = [],

				options = {
					depends: {}
				};

			if (conf.exports) {
				options.exports = conf.exports;
			}

			if (module === "core" || module === "crypto-js") {
				options.global = "CryptoJS";
			}

            _.each(this.filesSrc, function (source) {
    			if (grunt.file.exists(source + module + ".js")) {
    				sources.push(source + module + ".js");
    			}
            }, this);

			// Read dependencies
			_.each(_.difference(conf.components, [module]), function (value, i) {
				options.depends['./' + value] = value === "core" ? "CryptoJS" : null;
			});

            // TODO create a single file including all dependencies
            if (conf.pack) {
                return;
            }

			modules[module] = [sources, options];
		}, this);

		// Build packege modules
		fmd(config)
			.define(modules)
			.build(function (createdFiles) {

                done();
            });

    });

};
