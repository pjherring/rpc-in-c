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

    function SoundController($scope, _, $routeParams, sounds, lowLag) {
        var instrumentName = $routeParams.instrumentName;
        var cache = {};

        $scope.instrument = _.find(sounds, function(instrument_sounds) {
            return instrument_sounds.name == instrumentName;
        });

        $scope.playSound = function(name) {
            lowLag.play(name);
        }
    }

    module.controller(
        'InstrumentsController',
        ['$scope', '_', '$location', 'sounds', InstrumentsController]);

    module.controller(
        'InstrumentSoundController',
        ['$scope', '_', '$routeParams', 'sounds', 'lowLag', SoundController]
    );

})(angular.module('instruments', []));
