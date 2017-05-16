app.controller('homeCtrl',  ($scope, mainService, $state)=> {

  function getUser() {
    mainService.getUser().then(function(user) {
      console.log('USER DATA',user);
      if (user) $scope.currentUser = user;
      else   $scope.currentUser = 'NOT LOGGED IN';
    })
  }
  getUser();



  $scope.searchFromHome = (val)=> {
    sessionStorage.setItem('search', val);
    $state.go('search');
  }

})
