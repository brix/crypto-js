/*jshint node: true*/

'use strict';

module.exports = {
    dev: {
        options: {
            jshintrc: process.cwd() + '/.jshintrc',
            reporterOutput: ''
        },
        files: {
            src: [
                '<%= meta.cwdAll %>.js',
                '!<%= meta.buildAll %>',
                '!<%= meta.testAll %>',
                '!<%= meta.npmAll %>'
            ]
        }
    }
};
