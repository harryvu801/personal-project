
const app = angular.module('app',['ui.router','ui.materialize','ngAnimate'])
  .config(function ($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('','/')

    $stateProvider
      .state('home', {
        url:'/',
        templateUrl:"views/home.html",
        controller:'homeCtrl'
      })

      .state('search', {
        url:'/search',
        templateUrl: "views/search.html",
        controller: 'mainCtrl'
      })

      .state('profile', {
        url:'/profile',
        templateUrl: "views/profile.html",
        controller: 'profCtrl'
      })

      .state('books', {
        parent: 'profile',
        url:'/books',
        templateUrl: 'views/books.html',
        controller: 'profCtrl'
      })

      .state('messages', {
        parent: 'profile',
        url:'/messages',
        templateUrl: 'views/messages.html',
        controller: 'profCtrl'
      })

  })
