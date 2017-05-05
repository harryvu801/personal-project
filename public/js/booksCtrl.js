app.controller('booksCtrl', function($scope, mainService, $stateParams){


  $scope.getBookDetails = function () {
    // console.log('function works', $stateParams.id);
    return mainService.getBookDetails($stateParams.id).then(function (response) {
      // console.log(response);
      $scope.book =response
    });

  }()

  
})
