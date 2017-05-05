
const app = angular.module('app',['ui.router','ui.materialize'])
  .config(function ($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('','/')

    $stateProvider
      .state('home', {
        url:'/',
        templateUrl:"views/home.html",
        controller:'mainCtrl'
      })

      .state('search', {
        url:'/search',
        templateUrl: "views/search.html",
        controller: 'mainCtrl'
      })

      .state('books', {
        url:'/books/:id',
        templateUrl: 'views/books.html',
        controller: 'booksCtrl'
      })
  })
