app.controller('profCtrl', function ($scope, mainService, $state) {

  function getUser() {
    mainService.getUser().then(function(user) {
      // console.log(user.imgurl);
      if (user) $scope.currentUser = user;
      else   $scope.user = 'NOT LOGGED IN';
    })
  }

  getUser();



})
