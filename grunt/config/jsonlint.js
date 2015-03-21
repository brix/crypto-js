/*jshint node: true*/

'use strict';

module.exports = {
    all: {
        files: {
            src: [
                '<%= meta.cwdAll %>.json',
                '!<%= meta.buildAll %>',
                '!<%= meta.npmAll %>'
            ]
        }
    }
};
