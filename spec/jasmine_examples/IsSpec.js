describe("IsModule", function() {
    var is = require('../../lib/is');

    String.prototype.is = is;
    Array.prototype.is = is;
    Object.prototype.is = is;
    Number.prototype.is = is;
    Error.prototype.is = is;
    Function.prototype.is = is;


    it("should catch non-strings passed as strings", function() {
        var testValue = 910203030;
        expect(function() {
            testValue.is('string');
        }).toThrowError();
    });

    it("should catch non-arrays passed as arrays", function() {
        var testValue = 910203030;
        expect(function() {
            testValue.is('array');
        }).toThrowError();
    });

    it("should catch non-objects passed as objects", function() {
        var testValue = 910203030;
        expect(function() {
            testValue.is('object');
        }).toThrowError();
    });

    it("should catch non-numbers passed as numbers", function() {
        var testValue = 'testValueinger';
        expect(function() {
            testValue.is('number');
        }).toThrowError();
    });

    it("should catch non-errors passed as errors", function() {
        var testValue = 'testValueinger';
        expect(function() {
            testValue.is('error');
        }).toThrowError();
    });    

    it("should catch non-functions passed as functions", function() {
      var testValue = {};
      expect(function() {
        testValue.is('function');
      }).toThrowError();
    });   


// TODO: Include the positive versions of all of the above

    it("should return the value of the callee", function() {
        var testValue = "thisisit";
        expect(testValue.is('string')).toEqual(testValue);
    });

    it("should be able to check a value against an interface", function(){
      expect(true).toBeFalsy();
    });

    /*
      describe("when song has been paused", function() {
        beforeEach(function() {
          player.play(song);
          player.pause();
        });

        it("should indicate that the song is currently paused", function() {
          expect(player.isPlaying).toBeFalsy();

          // demonstrates use of 'not' with a custom matcher
          expect(player).not.toBePlaying(song);
        });

        it("should be possible to resume", function() {
          player.resume();
          expect(player.isPlaying).toBeTruthy();
          expect(player.currentlyPlayingSong).toEqual(song);
        });
      });

      // demonstrates use of spies to intercept and test method calls
      it("tells the current song if the user has made it a favorite", function() {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
      });

      //demonstrates use of expected exceptions
      describe("#resume", function() {
        it("should throw an exception if song is already playing", function() {
          player.play(song);

          expect(function() {
            player.resume();
          }).toThrowError("song is already playing");
        });
      });*/
});
