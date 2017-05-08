app.controller('mainCtrl', function ($scope, mainService, $state) {

  $scope.menus = true;
  $scope.sorts = ['Title', 'Author'];

  $scope.clicked = (x)=> console.log(x);


  $scope.search = function (val) {
    $scope.searchTerm = val;
    // console.log();
    if (Number(val) && val.length == 13){
      $state.go('books', {id: val})
    } else {
      return mainService.getBooksBySearch(val).then(function(response){
        // console.log(response);
        $scope.books = response;
        $scope.bsearch = '';
      })
    }
  }

  $scope.getAllBooks = function() {
    return mainService.getAllBooks().then(function (response){
      $scope.books = response;
      $scope.searchTerm = "";
    })
  }

  $scope.addBookToWishlist = function(bookId) {
    var wish =
    {
      user_id: $scope.currentUser.id,
      book_id: parseInt(bookId)
    }
    mainService.addBookToWishlist(wish)
  }


//////////////////
////////AUTH0///////
//////////////////

function getUser() {
  mainService.getUser().then(function(user) {
    // console.log(user.imgurl);
    if (user) $scope.currentUser = user;
    else   $scope.user = 'NOT LOGGED IN';
  })
}

getUser();


$scope.logout = mainService.logout;



$('#search').keypress(function(e){
    if(e.which == 13){
        $(this).blur();
    }
});

})
