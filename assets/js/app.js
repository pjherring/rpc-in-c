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
                    'clarinet/11', 'clarinet/12', 'clarinet/13', 'clarinet/14', 'clarinet/15'
                    //'clarinet/16', 'clarinet/17', 'clarinet/18', 'clarinet/19', 'clarinet/20',
                    //'clarinet/21', 'clarinet/22', 'clarinet/23', 'clarinet/24', 'clarinet/25',
                    //'clarinet/26', 'clarinet/27', 'clarinet/28', 'clarinet/29', 'clarinet/30',
                    //'clarinet/31', 'clarinet/32', 'clarinet/33', 'clarinet/34', 'clarinet/35',
                    //'clarinet/36', 'clarinet/37', 'clarinet/38', 'clarinet/39', 'clarinet/40',
                    //'clarinet/41', 'clarinet/42', 'clarinet/43', 'clarinet/44', 'clarinet/45',
                    //'clarinet/46', 'clarinet/47', 'clarinet/48', 'clarinet/49', 'clarinet/50',
                    //'clarinet/51', 'clarinet/52', 'clarinet/53'
                ],
                loaded: false,
            },
            {
                name: 'flute',
                img: 'public/img/flute.png',
                sounds: [
                    'flute/01', 'flute/02', 'flute/03', 'flute/04', 'flute/05',
                    'flute/06', 'flute/07', 'flute/08', 'flute/09', 'flute/10',
                    'flute/11', 'flute/12', 'flute/13', 'flute/14', 'flute/15'
                    /*'flute/16', 'flute/17', 'flute/18', 'flute/19', 'flute/20',
                    'flute/21', 'flute/22', 'flute/23', 'flute/24', 'flute/25',
                    'flute/26', 'flute/27', 'flute/28', 'flute/29', 'flute/30',
                    'flute/31', 'flute/32', 'flute/33', 'flute/34', 'flute/35',
                    'flute/36', 'flute/37', 'flute/38', 'flute/39', 'flute/40',
                    'flute/41', 'flute/42', 'flute/43', 'flute/44', 'flute/45',
                    'flute/46', 'flute/47', 'flute/48', 'flute/49', 'flute/50',
                    'flute/51', 'flute/52', 'flute/53'*/
                ],
            }];
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
