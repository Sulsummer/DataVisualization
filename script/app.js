'use strict';

/**
*  Module
*
* Description
*/
var app = angular.module('app', [
    'ui.router', 'ngResource']);

app.value('baseURL', 'http://localhost:63342/DataVisualization');

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("index");
    $stateProvider
    .state('index', {
        url:'/index',
        templateUrl: 'view/main.html'
    })
    .state('data', {
        url: '/data',
        templateUrl: 'view/dataShow.html'
    })
    .state('map', {
        url: '/map',
        templateUrl: 'view/map.html'
    });
});
