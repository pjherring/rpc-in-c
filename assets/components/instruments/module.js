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

    function SoundController($scope, _, $routeParams, sounds, lowLag, $sce) {
        var cache = {};
        var instrumentName = $routeParams.instrumentName;

        $scope.instrument = _.find(sounds, function(instrument_sounds) {
            return instrument_sounds.name == instrumentName;
        });

        $scope.getFile = function(file) {
            return 'public/sounds/' + file + '.mp3';
        }

        $scope.playSound = function(name) {
            if (!cache[name]) {
                cache[name] = document.getElementById(name);
            }
            cache[name].play();
        }
    }

    module.controller(
        'InstrumentsController',
        ['$scope', '_', '$location', 'sounds', InstrumentsController]);

    module.controller(
        'InstrumentSoundController',
        ['$scope', '_', '$routeParams', 'sounds', 'lowLag', '$sce', SoundController]
    );

})(angular.module('instruments', []));
