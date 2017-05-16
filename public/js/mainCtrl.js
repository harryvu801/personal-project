app.controller('mainCtrl', ($scope, mainService, $state) => {
  $scope.sorts = ['Title', 'Author'];

  $scope.clicked = (x)=> console.log(x);

  $scope.reset = ()=>{
    sessionStorage.setItem('search', '');
    console.log(sessionStorage.search);
    $scope.books= '';
    $scope.searchTerm = '';
    $state.go('search')
  }


  $scope.search =  (val)=> {
    console.log(val);
  if (val) {
    $scope.searchTerm = val;
      return mainService.getBooksBySearch(val).then((response)=>{
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

  $scope.getAllBooks = ()=> {
    return mainService.getAllBooks().then((response)=>{
      $scope.books = response;
      $scope.searchTerm = "";
    })
  }

  $scope.addBookToWishlist = (bookId)=> {
    let wish =
    {
      user_id: $scope.currentUser.id,
      book_id: parseInt(bookId)
    }
    mainService.addBookToWishlist(wish)
  }

  $scope.addBookToUserBooks = (info)=> {
    let book =
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
    mainService.getUser().then((user)=> {
      console.log($scope.currentUser);
      if (user) $scope.currentUser = user;
      else   $scope.user = 'NOT LOGGED IN';
    })
  }

  getUser();


  $scope.logout = mainService.logout;

  $('#search').keypress((e)=>{
      if(e.which == 13){
          $(this).blur();
      }
  });

  $scope.getBookDetails = (isbn)=> {
    return mainService.getBookDetails(isbn).then( (response)=> {
      console.log(response);
      $scope.book = response[0];
    });
  }

}).directive('modal', ()=> {
  return {
    restrict: 'E',
    templateUrl: 'views/modal.html',
    controller: 'mainCtrl'
  }
})
