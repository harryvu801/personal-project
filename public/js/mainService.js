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
      // console.log('got response', response.data);
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

  this.removeFromWishlist = function(id) {
    console.log(id);
    return $http({
      method: 'PUT',
      url: '/api/books/wishlist',
      data: {id}
    }).then(function(response){
      console.log('got response');
    })
  }

  this.getWishlist = function(id) {
    return $http({
      method: 'POST',
      url: '/api/books/wishlist/id',
      data: {id}
    }).then(function(response){
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.addBookToUserBooks = function(book) {
    console.log(book);
    return $http({
      method: 'POST',
      url: '/api/books/user',
      data: book
    }).then(function(response){
      console.log('got response', response.data);
      return response.data
    })
  }

  this.removeFromUserBooks = function(id) {
    console.log(id);
    return $http({
      method: 'PUT',
      url: '/api/books/user',
      data: {id}
    }).then(function(response){
      console.log('got response');
    })
  }

  this.getUserBooks = function(id) {
    return $http({
      method: 'POST',
      url: '/api/books/user/id',
      data: {id}
    }).then(function(response){
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.findUsers = function(id) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {id}
    }).then(function(response){
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.getMessages = function(id) {
    return $http({
      method: 'POST',
      url: '/api/messages',
      data: {id}
    }).then(function(response){
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.postMessage = function(msg) {
    return $http({
      method: 'POST',
      url: '/api/messages/post',
      data: msg
    }).then(function(response){
      // console.log('got response', response.data);
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
