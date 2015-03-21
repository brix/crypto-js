/*jshint node: true*/

return {};

(function (undef) {

	var _ = require("underscore"),

		fs = require("fs"),

		fsx = require("fs.extra"),

		fmd = require("fmd"),

		targz = require("tar.gz"),

		uglify = require("uglify-js"),

		readFile = function (path) {
			return fs.readFileSync(path)
				.toString();
		},

		writeFile = function (path, content) {
			fsx.mkdirpSync(path.replace(/[^\/]+\/?$/, ""));
			fs.writeFileSync(path, content);
		},

		paths = {
			src: __dirname + "/../src",
			dist: __dirname + "/../build"
		},

		packages = {
			npm: {
				archive: paths.dist + "/crypto-js-npm.tar.gz",

				dest: paths.dist + "/crypto-js",
				dest_lib: paths.dist + "/crypto-js",
				dest_lib_min: null,

				copy: {
					"../package.json": "package.json",
					"../README.md": "README.md"
				},

				toPath: function (module, req) {
					if (module === "crypto-js") {
						return;
					}
					else if (req) {
						return "./";
					}
					else {
						return module;
					}
				}
			},
			release: {
				archive: paths.dist + "/crypto-js.tar.gz",

				dest: paths.dist + "/crypto-js",
				dest_lib: paths.dist + "/crypto-js/lib-uncompressed",
				dest_lib_min: paths.dist + "/crypto-js/lib",

				copy: {},

				toPath: function (module, req) {
					if (module === "index") {
						return;
					}
					else if (req) {
						return module === "crypto-js" ? "./crypto-js/" : "./";
					}
					else {
						return module === "crypto-js" ? module : "crypto-js/" + module;
					}
				}
			}
		},

		config = {
			require: {},
			exports: {}
		},

		// Read YAML build config
		yConfig = require("js-yaml")
			.load(fs.readFileSync(__dirname + "/build.yml")
			.toString());

	// Compose config from YAML
	_.each(yConfig.components, function (module) {
		config.require[module] = ["core"];
	});
	_.extend(config.require, yConfig.rollups);
	_.extend(config.exports, yConfig.exports);

	// Add full rollup to config (depending on all modules)
	config.require["crypto-js"] = [].concat(yConfig.components);
	config.exports["crypto-js"] = "CryptoJS";

	config.require["index"] = [].concat(yConfig.components);
	config.exports["index"] = "CryptoJS";

	// Compose modules
	_.each(packages, function (pkg) {

		pkg._modules = {};

		_.each(config.require, function (deps, module) {
			var modulePath = pkg.toPath(module),

				requirePath = pkg.toPath(module, true),

				sources = [],

				options = {
					depends: {}
				};

			if (modulePath === undef) {
				return;
			}

			if (config.exports[module]) {
				options.exports = config.exports[module];
			}

			if (module === "core" || module === "crypto-js") {
				options.global = "CryptoJS";
			}

			if (fs.existsSync(paths.src + "/" + module + ".js")) {
				sources = [paths.src + "/" + module + ".js"];
			}

			// Read dependencies
			_.each(_.difference(deps, [module]), function (value, i) {
				options.depends[requirePath + value] = value === "core" ? "CryptoJS" : null;
			});

			pkg._modules[modulePath] = [sources, options];
		});
	});

	// Build a package
	function buildPackage(pkg) {
		// Clear package destination directory
		fsx.rmrfSync(pkg.dest);

		// Build packege modules
		fmd({
			target: pkg.dest_lib,
			factories: ["commonjs", "amd", "global"],
			trim_whitespace: true,
			new_line: "unix",
			indent: "\t"
		})
			.define(pkg._modules)
			.build(function (createdFiles) {

				// Minify modules
				if (pkg.dest_lib_min) {
					_.each(createdFiles, function (file) {
						var minContent = (uglify)
								.minify(pkg.dest_lib + "/" + file)
								.code;

						writeFile(pkg.dest_lib_min + "/" + file, minContent);
					});
				}

				// Copy files
				_.each(pkg.copy, function (to, from) {
					fsx.copy(paths.src + "/" + from, pkg.dest + "/" + to, function () {});
				});

				// Pack into archive
				new targz()
					.compress(pkg.dest, pkg.archive, function () {
						// Clear package destination directory
						fsx.rmrfSync(pkg.dest);
						fsx.rmrfSync(pkg.dest_lib);
						if (pkg.dest_lib_min) {
							fsx.rmrfSync(pkg.dest_lib_min);
						}

						// Mark package as built
						pkg._built = true;

						// Build next package
						buildNextPackage();
					});
			});
	}

	// Build next package iterator
	function buildNextPackage() {
		var type;

		for (type in packages) {
			if (!packages[type]._built) {
				return buildPackage(packages[type]);
			}
		}
	}

	// Start package building
	buildNextPackage();

}());