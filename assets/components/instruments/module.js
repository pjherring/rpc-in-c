'use strict';

(function(module) {

    function InstrumentsController($scope, _, $location, sounds) {

        $scope.sounds = sounds;
        $scope.goToInstrument = function(instrument_name) {
            var instrument = _.find($scope.sounds, function(instrument) {
                return instrument.name == instrument_name;
            });

            if (instrument) {
                $location.path('instrument/' + instrument.name);
            }
        }

    }

    function SoundController($scope, _, $routeParams, sounds, $sce) {
        var cache = {};
        var instrumentName = $routeParams.instrumentName;

        var instrument = _.find(sounds, function(instrument_sounds) {
            return instrument_sounds.name == instrumentName;
        });

        if (!instrument.audio) {
            instrument.audio = _.map(instrument.sounds, function(name) {
                var sound = {
                    audio: new Audio('public/sounds/' + name + '.mp3'),
                    loaded: false,
                    name: name
                };
                sound.audio.load();
                sound.audio.oncanplaythrough = function() {
                    sound.loaded = true;
                    $scope.$apply();
                };
                sound.audio.onended = function() {
                    sound.playing = false;
                    $scope.$apply();
                };
                sound.audio.onplay = function() {
                    sound.playing = true;
                    $scope.$apply();
                };
                return sound;
            });
        }

        $scope.sounds = instrument.audio;

        $scope.play = function(sound) {

            sound.audio.play();
        }
    }

    module.controller(
        'InstrumentsController',
        ['$scope', '_', '$location', 'sounds', InstrumentsController]);

    module.controller(
        'InstrumentSoundController',
        ['$scope', '_', '$routeParams', 'sounds', '$sce', SoundController]
    );

})(angular.module('instruments', []));
