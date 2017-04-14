angular.module('roadsec', [
        'ngStorage',
        'ngRoute'
    ])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

        $routeProvider.
        when('/', {
            templateUrl: 'partials/df1.html',
            controller: 'TelasController'
        }).
        when('/acessoNegado', {
            templateUrl: 'partials/acessoNegado.html',
            controller: 'TelasController'
        }).
        when('/dados', {
            templateUrl: 'partials/df2.html',
            controller: 'df2Controller'
        }).
        otherwise({
            redirectTo: '/'
        });


    }]).service('usuariosService', function($rootScope, $location) {

        /*Nesta função, vamos fazer o papel de validação que seria feito no backend */
        this.validaLogin = function(result) {
            //Vamos criar usuários fictícios que possam ser usados pela página e pra validar o login

            //Aqui, faremos um for para validar o login
            if (result.token)
                $rootScope.usuarioLogado = result.success;
                $rootScope.token = result.token;
            $location.path('/dados')
        }

        this.logout = function() {
            $rootScope.usuarioLogado = null;
            $location.path('/')
        }

    }).run(function($rootScope, $location) {

        //Rotas que necessitam do login
        var rotasBloqueadasUsuariosNaoLogados = ['/dados'];
        var rotasBloqueadasUsuariosComuns = ['/dados'];
        $rootScope.$on('$locationChangeStart', function() { //iremos chamar essa função sempre que o endereço for alterado

            /*  podemos inserir a logica que quisermos para dar ou não permissão ao usuário.
                Neste caso, vamos usar uma lógica simples. Iremos analisar se o link que o usuário está tentando acessar (location.path())
                está no Array (rotasBloqueadasUsuariosNaoLogados) caso o usuário não esteja logado. Se o usuário estiver logado, iremos
                validar se ele possui permissão para acessar os links no Array de strings 'rotasBloqueadasUsuariosComuns'
            */

            if ($rootScope.usuarioLogado == null && rotasBloqueadasUsuariosNaoLogados.indexOf($location.path()) != -1) {
                $location.path('/acessoNegado');


            } else
            if ($rootScope.usuarioLogado != null && rotasBloqueadasUsuariosComuns.indexOf($location.path()) != -1 && $rootScope.usuarioLogado.admin == false) {
                $location.path('/acessoNegado')
            }
            
        });
    });;
