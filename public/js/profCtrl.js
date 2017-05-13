app.controller('profCtrl', function ($scope, mainService, $state) {

  $scope.userBooks= [];

  function getUser() {
    mainService.getUser().then(function(user) {
      console.log('USER DATA',user);
      if (user) $scope.currentUser = user;
      else   $scope.currentUser = 'NOT LOGGED IN';
    })
  }
  getUser();

  function getWishlist() {
    mainService.getWishlist($scope.currentUser.id).then(function(res) {
      $scope.wishlist = res;
      // console.log('WISHLIST DATA',res);
    })
  }
  getWishlist();

 $scope.removeFromWishlist = (id)=> {
   mainService.removeFromWishlist(id)
   $state.reload();
 }

 function getUserBooks() {
   mainService.getUserBooks($scope.currentUser.id).then(function(res) {
     $scope.userBooks = res;
    //  console.log('USER BOOKS DATA',res);
   })
 }
 getUserBooks();

  $scope.removeFromUserBooks = (id)=> {
    mainService.removeFromUserBooks(id)
    $state.reload();
  }

  $scope.findUsers = (id)=> {
    mainService.findUsers(id).then(function(res){
      // console.log("FIND USERS DATA", res);
      $scope.users = res;
    });
  }


  $scope.postMessage = (convo)=> {
    let newMessage = {
      s:$scope.currentUser.id,
      r: convo.person,
      msg: convo.msg
    }
    mainService.postMessage(newMessage)
    .then(function(res){
      res[0].sender = true;
      console.log(res);
      $scope.convos.find((x)=>x.person===res[0].recipient).conversation.push(res[0]);
      console.log($scope.convos[2]);
    })
    $scope.convo = "";
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function getMessages() {
    mainService.getMessages($scope.currentUser.id).then(function(res){
      $scope.convos = [];
      for(let i = 0; res.length > i; i++) {
      let found = false;
        for(let j = 0; $scope.convos.length > j; j++) {
          if(res[i].sender === $scope.convos[j].person) {
            $scope.convos[j].conversation.push({sender: false, mid: res[i].mid, msg:res[i].messages});
            found = true
          }
          if(res[i].recipient === $scope.convos[j].person) {
            $scope.convos[j].conversation.push({sender: true, mid: res[i].mid, msg:res[i].messages})
            found = true
          }
        }
        if (found === false) {
          if(res[i].sender !== $scope.currentUser.id) {
            $scope.convos.push(
              {
                person: res[i].sender,
                fn: res[i].first_name,
                ln: res[i].last_name,
                pic: res[i].pic,
                conversation: [{sender: false, mid: res[i].mid, msg:res[i].messages}]
              })
          }
          else {
            $scope.convos.push(
              {
                person: res[i].recipient,
                fn: res[i].first_name,
                ln: res[i].last_name,
                pic: res[i].pic,
                conversation: [{sender: true, mid: res[i].mid, msg:res[i].messages}]
              })
          }
        }
      }
      console.log('conversations', $scope.convos);
    });
  }
  getMessages();
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  $('#search').keypress(function(e){
      if(e.which == 13){
          $(this).blur();
      }
  });



})
