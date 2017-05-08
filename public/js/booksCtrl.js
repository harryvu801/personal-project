app.controller('booksCtrl', function($scope, mainService, $stateParams){

  // $stateParams.id = localStorage.isbn;
  $scope.getBookDetails = function () {

    return mainService.getBookDetails($stateParams.id).then(function (response) {
      // console.log(response);
      $scope.book =response
    });

  }()


})
