app.controller('mainCtrl', function ($scope, mainService,) {

  $scope.x = 'title'
  $scope.sorts = ['title', 'author']

  $scope.changeSort= (a) => $scope.x = $scope.sorts[a]

  $scope.search = function (val) {
    if (Number(val) && val.length == 13){
      return mainService.getBookDetails(val).then(function(response){
        $scope.books = response
      })
    } else {
      return mainService.getBooksBySearch(val).then(function(response){
        $scope.books = response
      })
    }


  }

  $scope.getAllBooks = function() {
    return mainService.getAllBooks().then(function (response){
      $scope.books = response
    })
  }

//////////////////
////////AUTH0///////
//////////////////

function getUser() {
  mainService.getUser().then(function(user) {
    if (user) $scope.currentUser = user;
    else   $scope.user = 'NOT LOGGED IN';
  })
}

getUser();

$scope.loginLocal = function(username, password) {
  console.log('Logging in with', username, password);
  mainService.loginLocal({
    username: username,
    password: password
  })
  .then(function(res) {
    getUser();
  })
}

$scope.logout = mainService.logout;





})
