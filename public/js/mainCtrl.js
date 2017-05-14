app.controller('mainCtrl', function ($scope, mainService, $state) {
  $scope.sorts = ['Title', 'Author'];

  $scope.clicked = (x)=> console.log(x);

  $scope.reset = function(){
    sessionStorage.setItem('search', '');
    console.log(sessionStorage.search);
    $scope.books= '';
    $scope.searchTerm = '';
    $state.go('search')
  }


  $scope.search = function (val) {
    console.log(val);
  if (val) {
    $scope.searchTerm = val;
      return mainService.getBooksBySearch(val).then(function(response){
        console.log(response);
        $scope.books = response;
        $scope.bsearch = '';
      })
    }
  }

  function searchFromHome() {
    $scope.search(sessionStorage.search)
  }
  searchFromHome();

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

  $scope.addBookToUserBooks = function(book) {
    var book =
    {
      user_id: $scope.currentUser.id,
      book_id: book.bid,
      condition: book.condition
    }
    mainService.addBookToUserBooks(book)
  }


//////////////////
////////AUTH0///////
//////////////////

  function getUser() {
    mainService.getUser().then(function(user) {
      console.log($scope.currentUser);
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

  $scope.getBookDetails = function (isbn) {
    return mainService.getBookDetails(isbn).then(function (response) {
      console.log(response);
      $scope.book = response[0];
    });
  }

}).directive('modal',function () {
  return {
    restrict: 'E',
    templateUrl: 'views/modal.html',
    controller: 'mainCtrl'
  }
})
