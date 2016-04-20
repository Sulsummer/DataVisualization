'use strict';

/**
*  Module
*
* Description
*/
var app = angular.module('app', [
    'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("index");
    $stateProvider
    .state('index', {
        url:'/index',
        templateUrl : 'view/main.html'
    });
});