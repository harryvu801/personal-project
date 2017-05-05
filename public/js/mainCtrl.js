app.controller('mainCtrl', function ($scope, mainService,) {

  // $scope.login = function (info) {
  //   for (var i = 0; i<$scope.users.length; i++) {
  //     if (info.un == $scope.users[i].un && info.pw == $scope.users[i].pw){
  //       $scope.currentUser = $scope.users[i];
  //       localStorage.setItem('user', $scope.currentUser);
  //     } else {
  //       alert('failed');
  //     }
  //   }
  // }
  //
  // $scope.logout = () => {
  //   $scope.currentUser = '';
  // }


  $scope.getCookie = () => {
  
  }



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
    if (user) $scope.user = user.username;
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
