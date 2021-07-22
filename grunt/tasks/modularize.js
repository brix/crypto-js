/*jshint node: true*/
/*jshint esversion: 6*/

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
        _.each(options, (conf, name) => {
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
            _.each(this.filesSrc, (source) => {
                if (grunt.file.exists(source + name + ".js")) {
                    sources.push(source + name + ".js");
                }
            });

            if (conf.pack) {
                // Collect all components
                deps = _.chain(conf.components)
                    .map(depName => options[depName].components)
                    .flatten()
                    .uniq()
                    .without(name)
                    .sort((a, b) => {
                        if (options[a].components.includes(b)) {
                            return 1
                        }

                        if (options[b].components.includes(a)) {
                            return -1
                        }

                        return 0;
                    })
                    .value();

                // Add components as source files -> results a single file
                _.each(this.filesSrc, (source) => {
                    _.each(deps, (depName) => {
                        if (grunt.file.exists(source + depName + ".js")) {
                            sources.push(source + depName + ".js");
                        }
                    });
                });
            } else {
                // Read components and add them as dependecies
                _.each(_.without(conf.components, name), (value, i) => {
                    opts.depends['./' + value] = value === "core" ? "CryptoJS" : null;
                });
            }

            // Remove duplicates
            sources = _.uniq(sources);

            // Add module settings to fmd definition
            modules[name] = [sources, opts];
        });

        // Build packege modules
        fmd(config)
            .define(modules)
            .build(() => {

                done();
            });

    });

};
