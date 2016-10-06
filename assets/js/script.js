(function ($) {
  'use strict';

  var defaults = {};

  function Player(element, options) {
    this.element = element;
    this.$element = $(element);

    this.settings = $.extend({}, defaults, options || {});

    this.init();
  }

  Player.prototype = {
    init: function () {
      this.src = this.$element.data('src');

      this.render();
    },

    render: function () {
      var self = this;

      // Create audio element
      this.$audio = $('<audio src="' + this.src + '"></audio>');
      this.audio = this.$audio[0];


      this.$audio.appendTo(this.element);

      $('<i class="fa fa-play-circle-o" aria-hidden="true"></i>').on('click', function (event) {
        event.preventDefault();

        self.play();

        $('.active', self.element).removeClass('active');
        $(this).addClass('active');
      }).appendTo(this.element);

      $('<i class="fa fa-pause-circle-o" aria-hidden="true"></i>').on('click', function (event) {
        event.preventDefault();

        self.pause();

        $('.active', self.element).removeClass('active');
        $(this).addClass('active');
      }).appendTo(this.element);

      $('<i class="fa fa-stop-circle-o" aria-hidden="true"></i>').on('click', function (event) {
        event.preventDefault();

        self.stop();

        $('.active', self.element).removeClass('active');
        $(this).addClass('active');
      }).appendTo(this.element);

      $('<div class="boxProgress"><div class="progress"></div></div>').appendTo(this.element);

      this.$audio.on('progress', function (event) {
        event.preventDefault();

        var audio = self.audio,
            perc = audio.currentTime * 100 / audio.duration;

        $('.progress', self.element).css('width', perc + '%');
        $('<p class="current-time"> audio.currentTime </p>').appendTo(this.element);
      });

      $('.boxProgress', this.element).on('click', function (event) {
        event.preventDefault();

        self.audio.currentTime = self.audio.duration * (event.offsetX / $(this).width());
      });

      $('<i class="fa fa-volume-up" aria-hidden="true"></i>').appendTo(this.element).on('click', function (event) {
        event.preventDefault();

        self.audio.muted = !self.audio.muted;

        if (self.audio.muted) {
          $(this).removeClass('fa-volume-up');
          $(this).addClass('fa-volume-off');
        }
        else {
          $(this).removeClass('fa-volume-off');
          $(this).addClass('fa-volume-up');
        }
      });

      $('<div class="boxVolume"><div class="volume"></div></div>').appendTo(this.element);

      this.$audio.on('volumechange', function (event) {
        event.preventDefault();

        var audio = self.audio,
            per = audio.volume * 100;

        $('.volume', self.element).css('width', per + '%');
      });

      $('.boxVolume', this.element).on('click', function (event) {
        event.preventDefault();

        var volume = event.offsetX / $(this).width();
        debugger;

        self.audio.volume = volume;
      });

    },

    play: function () {
      this.audio.play();
    },

    pause: function () {
      this.audio.pause();
    },

    stop: function () {
      this.pause();
      this.audio.currentTime = 0;
    }
  };

  $.fn.Player = function (options) {
    return $(this).each(function () {
      return new Player(this, options);
    });
  }

})(jQuery);
// Audio player!! //

$(function () {

  $('.player').Player({});

});
