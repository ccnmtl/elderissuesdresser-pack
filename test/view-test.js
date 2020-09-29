/* global describe: true, before: true, it: true */

require('../src/static.js');

var chai = require('chai');
var assert = chai.assert;

var jQuery = require('jquery');
var module = require('../src/infographic.js');

function waitFor(testFx, doneFx, millis) {
    var timeout = millis ? millis : 3000; // Default Max Timout is 3s
    var start = new Date().getTime();

    var interval = setInterval(function() {
        var condition = testFx();

        if (condition) {
            clearInterval(interval);
            doneFx();
        } else if ((new Date().getTime() - start >= timeout)) {
            clearInterval(interval);
            doneFx(new Error('timeout occurred'));
        }
    }, 250); //< repeat check every 250ms
}

describe('InfographicApp', function() {

    before(function() {
        var elt = jQuery('.infographic-container');
        assert.ok(elt);
        jQuery(elt).html('');

        module.InfographicApp.initialize({'background': ''});
    });

    describe('InfographicView', function(done) {
        it('initialized', function() {
            assert.isTrue(jQuery('.progressbar-set-initial').is(':visible'));
        });

        it('click candies', function() {
            var elt = jQuery('.item-image-candies');
            jQuery(elt).click();

            waitFor(function() {
                jQuery('#item-modal').is(':visible');
            }, done);
        });
    });
});
