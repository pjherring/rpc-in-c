'use strict';

(function(module) {

    var backgroundColor = [
        '#6C62FE', '#7959E5', '#8751CD', '#9549B4', '#A3409C', '#B13883',
        '#BE306B', '#CC2752', '#DA1F3A', '#E81721', '#F60F09', '#F62611',
        '#F73E1A', '#F85623', '#F96E26', '#FA8635', '#FA9D3E', '#FBB547',
        '#FCCD50', '#FDE559', '#FEFD62', '#E4F858', '#CBF34E', '#B1EE44',
        '#98E93A', '#7FE531', '#65E027', '#4CDB1D', '#32D613', '#19D109',
        '#00CD00'
    ];

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
                $scope.worshipBg = {};
                $scope.worshipButton = {};
                $scope.$apply();
            };
            audio.audio.onplay = function() {
                audio.playing = true;
                $scope.$apply();
            };
        });

        $scope.sounds = instrument.audio;

        $scope.play = function(sound, idx) {
            sound.audio.play();
            $scope.worshipBg = {
                'background-color': backgroundColor[idx]
            };
            $scope.worshipButton = {
                'background-color': backgroundColor[idx]
            };
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
