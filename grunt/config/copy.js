/*jshint node: true*/

'use strict';

module.exports = {
    build: {
        files: [{
            expand: false,
            cwd: '<%= meta.cwd %>',
            src: [
                'README.md',
                'CONTRIBUTING.md',
                'LICENSE',
                'docs/**/*'
            ],
            dest: '<%= meta.build %>'
        }]
    }
};
