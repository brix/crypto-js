/*jshint node: true*/

var _ = require("lodash"),

	fmd = require("fmd");

module.exports = function (grunt) {

    grunt.registerMultiTask('modularize', function () {
        var options = this.options(),

            done = this.async(),

            modules = {},

            config = {
    			target: this.target + '/',
    			factories: ["commonjs", "amd", "global"],
    			trim_whitespace: true,
    			new_line: "unix",
    			indent: "\t"
    		};

        // Prepare Factory-Module-Definition settings
        _.each(options, function (conf, name) {
            var sources = [],

				opts = {
					depends: {}
				},

				deps = [];

			if (conf.exports) {
				opts.exports = conf.exports;
			}

			if (conf.global) {
				opts.global = conf.global;
			}

            // Find and add self as source
            _.each(this.filesSrc, function (source) {
    			if (grunt.file.exists(source + name + ".js")) {
    				sources.push(source + name + ".js");
    			}
            }, this);

            if (conf.pack) {
    			// Collect all components
    			deps = _.chain(conf.components)
    			    .map(function (depName) {
        			    return options[depName].components;
    			    })
    			    .flatten()
    			    .uniq()
    			    .without(name)
    			    .sort(function (a, b) {
            			return options[a].components.indexOf(b) === -1 ? -1 : 1;
        			})
        			.value();

                // Add components as source files -> results a single file
                _.each(this.filesSrc, function (source) {
                    _.each(deps, function (depName) {
            			if (grunt.file.exists(source + depName + ".js")) {
            				sources.push(source + depName + ".js");
            			}
        			});
                }, this);
            } else {
    			// Read components and add them as dependecies
    			_.each(_.without(conf.components, name), function (value, i) {
    				opts.depends['./' + value] = value === "core" ? "CryptoJS" : null;
    			});
			}

			// Remove duplicates
			sources = _.uniq(sources);

            // Add module settings to fmd definition
			modules[name] = [sources, opts];
		}, this);

		// Build packege modules
		fmd(config)
			.define(modules)
			.build(function (createdFiles) {

                done();
            });

    });

};
