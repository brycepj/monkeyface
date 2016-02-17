describe("IsModule", function() {
  var is = require('../../lib/is');
  
  String.prototype.is = is;
  Array.prototype.is = is;
  Object.prototype.is = is;
  Number.prototype.is = is;
  Error.prototype.is = is;

  // var player;
  // var song;

  // beforeEach(function() {
  //   player = new Player();
  //   song = new Song();
  // });

  it("should catch non-strings passed as strings", function() {
    var nonStr = 910203030;
    //demonstrates use of custom matcher
    expect(function() {
      nonStr.is('string');
    }).toThrowError();
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
