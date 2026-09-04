YUI.add('enc-base64url-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'Base64url',

        testStringifySafe: function () {
            // top 6 bits of 0xfb000000 are 111110 (62), which is '-' in the
            // url-safe map and '+' in the regular map
            var wordArray = C.lib.WordArray.create([0xfb000000], 1);
            Y.Assert.areEqual('-w', C.enc.Base64url.stringify(wordArray, true));
            Y.Assert.areEqual('+w', C.enc.Base64url.stringify(wordArray, false));
        },

        testParseSafe: function () {
            Y.Assert.areEqual(
                C.lib.WordArray.create([0xfb000000], 1).toString(),
                C.enc.Base64url.parse('-w', true).toString()
            );
        },

        testParseNonSafe: function () {
            Y.Assert.areEqual(
                C.lib.WordArray.create([0xfb000000], 1).toString(),
                C.enc.Base64url.parse('+w', false).toString()
            );
        },

        // Regression test for GH-531: parse() memoized its reverse-lookup
        // map on first use and never rebuilt it for a different urlSafe
        // value, so an earlier non-urlSafe parse() call corrupted every
        // urlSafe parse() call afterwards (and vice versa).
        testParseDoesNotLeakReverseMapBetweenSafeAndNonSafe: function () {
            var wordArray = C.lib.WordArray.create([0xfb000000], 1);

            // Prime the cache with a non-urlSafe parse first.
            C.enc.Base64url.parse('AAAA', false);

            // A urlSafe-encoded string containing a character ('-') that
            // only exists in the safe map must still parse correctly.
            Y.Assert.areEqual(
                wordArray.toString(),
                C.enc.Base64url.parse('-w', true).toString()
            );

            // And the reverse: priming with a urlSafe call first must not
            // break a later non-urlSafe parse.
            C.enc.Base64url.parse('-w', true);
            Y.Assert.areEqual(
                wordArray.toString(),
                C.enc.Base64url.parse('+w', false).toString()
            );
        }
    }));
}, '$Rev$');
