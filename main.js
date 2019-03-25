//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){
  //Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl
  }

  //Local Storage Test
  // localStorage.setItem('test', 'Hello World');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //Init Array
    let bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from local Storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //clear form
  document.getElementById("myForm").reset();

  //Refetch bookmarks
  fetchBookmarks();

  //Prevent form from submitting
  e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
  //Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop through bookmarks
  for(var i=0; i<bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  //reset localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Refetch bookmarks
  fetchBookmarks();
}

//Fetch Bookmarks
function fetchBookmarks(){
  //Get bookmarks from local Storage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output ID
  let bookmarksResults = document.getElementById("bookmarksResults");

  //Build Output
  bookmarksResults.innerHTML = '';
  for(var i=0; i<bookmarks.length; i++){
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body mt-3">'+
                              '<h3>'+name+
                              ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                              ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                              '</h3>'+
                              '</div>';
  }
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert("Please fill in the form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
