app.service('mainService',function ($http) {
  this.broken = "working";

    this.getAllBooks = function() {
      return $http({
        method: 'GET',
        url: "/api/books"
      }).then(function(response){
        return response.data
      })
    }

  this.getBooksBySearch = function(param) {
    console.log(param);
    return $http({
      method: 'POST',
      url: "/api/books",
      data: {param}
    }).then(function(response){
      console.log('got response', response.data);
      return response.data
    })
  }

  this.addBookToWishlist = function(book) {
    console.log(book);
    return $http({
      method: 'POST',
      url: '/api/books/wishlist',
      data: book
    }).then(function(response){
      console.log('got response', response.data);
      return response.data
    })
  }


  this.getBookDetails = function(isbn) {
    // console.log( typeof isbn);
    return $http({
      method: 'POST',
      url: "/api/books/isbn",
      data: {isbn}
    }).then(function(response){
      return response.data
    })
  }





  //////////////////////
  //////AUTH0//////////
  ////////////////////


this.getUser = function() {
  return $http({
    method: 'GET',
    url: '/auth/me'
  })
  .then(function(res) {
    // console.log(res.data);
    return res.data;
  })
  .catch(function(err) {
    console.log(err);
  })
}

this.logout = function() {
  console.log('button works');
  return $http({
    method: 'GET',
    url: '/auth/logout'
  })
  .then(function(res) {
    return res.data;
  })
  .catch(function(err) {
    console.log(err);
  })
}


})
