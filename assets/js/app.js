(function(module) {
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when(
            '/', 
            { 
                templateUrl: 'public/components/instruments/index.html',
                controller: 'InstrumentsController'
            }
        ).when(
        '/instrument/:instrumentName',
        {
            templateUrl: 'public/components/instruments/sound.html',
            controller: 'InstrumentSoundController'
        }
        );
    }]);

    module.factory('_', ['$window', function underscoreFactory($window) {
        return $window._;
    }]);

    module.factory('sounds', ['_', function soundsFactory(_) {
        var sounds = [
            {
                name: 'clarinet',
                img: 'public/img/clarinet.png',
                sounds: [
                    'clarinet/01', 'clarinet/02', 'clarinet/03', 'clarinet/04', 'clarinet/05',
                    'clarinet/06', 'clarinet/07', 'clarinet/08', 'clarinet/09', 'clarinet/10',
                    'clarinet/11', 
                    'clarinet/37', 'clarinet/38', 'clarinet/39', 'clarinet/40',
                    'clarinet/41', 'clarinet/42', 'clarinet/43', 'clarinet/44', 'clarinet/45',
                    'clarinet/46', 'clarinet/47', 'clarinet/48', 'clarinet/49', 'clarinet/50',
                    'clarinet/51', 'clarinet/52', 'clarinet/53'
                ],
                loaded: false,
            },
            {
                name: 'flute',
                img: 'public/img/flute.png',
                sounds: [
                    'flute/01', 'flute/02', 'flute/03', 'flute/04', 'flute/05',
                    'flute/06', 'flute/07', 'flute/08', 'flute/09', 'flute/10',
                    'flute/11', 
                    'flute/37', 'flute/38', 'flute/39', 'flute/40',
                    'flute/41', 'flute/42', 'flute/43', 'flute/44', 'flute/45',
                    'flute/46', 'flute/47', 'flute/48', 'flute/49', 'flute/50',
                    'flute/51', 'flute/52', 'flute/53'
                ],
            },
            {
                name: 'violin',
                img: 'public/img/violin.png',
                sounds: [
                    'violin/01', 'violin/02', 'violin/03', 'violin/04', 'violin/05',
                    'violin/06', 'violin/07', 'violin/08', 'violin/09', 'violin/10',
                    'violin/11', 
                    'violin/37', 'violin/38', 'violin/39', 'violin/40',
                    'violin/41', 'violin/42', 'violin/43', 'violin/44', 'violin/45',
                    'violin/46', 'violin/47', 'violin/48', 'violin/49', 'violin/50',
                    'violin/51', 'violin/52', 'violin/53'
                ],
            }
        ];

        _.each(sounds, function(instrument) {
            instrument.audio = _.map(instrument.sounds, function(name) {
                var sound = {
                    audio: new Audio('public/sounds/' + name + '.mp3'),
                    loaded: false,
                    name: name
                };
                sound.audio.load();
                sound.audio.oncanplaythrough = function() {
                    sound.loaded = true;
                };
                return sound;
            });
        });
        return sounds;
    }]);

})(angular.module(
    'worshipApp', 
    [
        'ngRoute',
        'ngTouch',
        'instruments'
    ]
));
