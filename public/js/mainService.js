app.service('mainService', function ($http) {
  // this.broken = "working";

    this.getAllBooks = ()=> {
      return $http({
        method: 'GET',
        url: "/api/books"
      }).then((response)=>{
        return response.data
      })
    }

  this.getBooksBySearch = (param)=> {

    console.log(param);
    return $http({
      method: 'POST',
      url: "/api/books",
      data: {param}
    }).then((response)=>{
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.addBookToWishlist = (book)=> {
    console.log(book);
    return $http({
      method: 'POST',
      url: '/api/books/wishlist',
      data: book
    }).then((response)=>{
      console.log('got response', response.data);
      return response.data
    })
  }

  this.removeFromWishlist = (id)=> {
    console.log(id);
    return $http({
      method: 'PUT',
      url: '/api/books/wishlist',
      data: {id}
    }).then((response)=>{
      console.log('got response');
    })
  }

  this.getWishlist = (id)=> {
    return $http({
      method: 'POST',
      url: '/api/books/wishlist/id',
      data: {id}
    }).then((response)=>{
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.addBookToUserBooks = (book)=> {
    console.log(book);
    return $http({
      method: 'POST',
      url: '/api/books/user',
      data: book
    }).then((response)=>{
      console.log('got response', response.data);
      return response.data
    })
  }

  this.removeFromUserBooks = (id)=> {
    console.log(id);
    return $http({
      method: 'PUT',
      url: '/api/books/user',
      data: {id}
    }).then((response)=>{
      console.log('got response');
    })
  }

  this.getUserBooks = (id)=> {
    return $http({
      method: 'POST',
      url: '/api/books/user/id',
      data: {id}
    }).then((response)=>{
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.findUsers = (id)=> {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {id}
    }).then((response)=>{
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.getMessages = (id)=> {
    return $http({
      method: 'POST',
      url: '/api/messages',
      data: {id}
    }).then((response)=>{
      // console.log('got response', response.data);
      return response.data
    })
  }

  this.postMessage = (msg)=> {
    return $http({
      method: 'POST',
      url: '/api/messages/post',
      data: msg
    }).then((response)=>{
      // console.log('got response', response.data);
      return response.data
    })
  }



  this.getBookDetails = (isbn)=> {
    // console.log( typeof isbn);
    return $http({
      method: 'POST',
      url: "/api/books/isbn",
      data: {isbn}
    }).then((response)=>{
      return response.data
    })
  }





  //////////////////////
  //////AUTH0//////////
  ////////////////////


this.getUser = ()=> {
  return $http({
    method: 'GET',
    url: '/auth/me'
  })
  .then((res)=> {
    // console.log(res.data);
    return res.data;
  })
  .catch((err)=> {
    console.log(err);
  })
}

this.logout = ()=> {
  console.log('button works');
  return $http({
    method: 'GET',
    url: '/auth/logout'
  })
  .then((res)=> {
    return res.data;
  })
  .catch((err)=> {
    console.log(err);
  })
}


})
