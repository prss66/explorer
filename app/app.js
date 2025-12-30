'use strict';

angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/transaction/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfo.html',
                controller: 'addressInfoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(function($rootScope) {
    // 支持多个节点配置
    var nodeConfigs = {
        local: 'http://localhost:8545',
        infura: 'https://mainnet.infura.io/v3/YOUR_KEY',
        custom: 'http://你的节点IP:8545'
    };
    
    var web3 = new Web3();
    var currentProvider = nodeConfigs.local; // 默认本地
    
    // 添加连接状态检查
    web3.setProvider(new web3.providers.HttpProvider(currentProvider));
    
    // 添加连接测试函数
    $rootScope.testConnection = function() {
        web3.eth.getBlockNumber(function(err, block) {
            if (err) {
                console.error('连接失败:', err);
                alert('连接失败: ' + err.message);
            } else {
                console.log('连接成功，当前区块:', block);
            }
        });
    };
    
    $rootScope.web3 = web3;
    $rootScope.nodeUrl = currentProvider;
    $rootScope.networkName = '本地网络';
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
        }
        var connected = false;
        if(!web3.isConnected()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'}) 
            $('#connectwarning').modal('show') 
        }
    });
