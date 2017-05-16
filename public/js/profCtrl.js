app.controller('profCtrl', ($scope, mainService, $state)=> {

  $scope.userBooks= [];

  function getUser() {
    mainService.getUser().then((user)=> {
      console.log('USER DATA',user);
      if (user) $scope.currentUser = user;
      else   $scope.currentUser = 'NOT LOGGED IN';
    })
  }
  getUser();

  function getWishlist() {
    mainService.getWishlist($scope.currentUser.id).then((res)=> {
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
   mainService.getUserBooks($scope.currentUser.id).then((res)=> {
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
    mainService.findUsers(id).then((res)=>{
      // console.log("FIND USERS DATA", res);
      $scope.users = res;
    });
  }


  $scope.postMessage = (convo)=> {
    console.log(convo);
    let newMessage = {
      s:$scope.currentUser.id,
      r: convo.person,
      msg: convo.msg
    }
    $scope.convos[$scope.convos.indexOf($scope.convos.find((x)=>x.person===convo.person))]
    .conversation.push(
      {
        mid:$scope.convos.find((x)=>x.person===convo.person).conversation[0].mid + 1,
        msg:convo.msg,
        sender:true
      }
    );
    convo.msg = "";
    mainService.postMessage(newMessage);
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function getMessages() {
    mainService.getMessages($scope.currentUser.id).then((res)=>{
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

  $('#search').keypress((e)=>{
      if(e.which == 13){
          $(this).blur();
      }
  });



})
