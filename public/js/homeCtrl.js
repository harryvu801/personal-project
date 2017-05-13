app.controller('homeCtrl', function ($scope, mainService, $state) {

  function getUser() {
    mainService.getUser().then(function(user) {
      console.log('USER DATA',user);
      if (user) $scope.currentUser = user;
      else   $scope.currentUser = 'NOT LOGGED IN';
    })
  }
  getUser();



  $scope.searchFromHome = function(val) {
    sessionStorage.setItem('search', val);
    $state.go('search');
  }

})
