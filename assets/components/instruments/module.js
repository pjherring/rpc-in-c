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

    function SoundController($scope, _, $routeParams, sounds, $sce, $location) {
        var cache = {};
        var instrumentName = $routeParams.instrumentName;

        var instrument = _.find(sounds, function(instrument_sounds) {
            return instrument_sounds.name == instrumentName;
        });

        _.each(instrument.audio, function(audio) {
            if (!audio.loaded) {
                audio.audio.oncanplaythrough = function() {
                    audio.loaded = true;
                    $scope.$apply();
                };
            }
            audio.audio.onended = function() {
                audio.playing = false;
                $scope.$apply();
            };
            audio.audio.onplay = function() {
                audio.playing = true;
                $scope.$apply();
            };
        });

        $scope.sounds = instrument.audio;

        $scope.play = function(sound) {
            sound.audio.play();
        }

        $scope.goBack = function() {
            $location.path('/');
        }

    }

    module.controller(
        'InstrumentsController',
        ['$scope', '_', '$location', 'sounds', InstrumentsController]);

    module.controller(
        'InstrumentSoundController',
        ['$scope', '_', '$routeParams', 'sounds', '$sce', '$location', SoundController]
    );

})(angular.module('instruments', []));
