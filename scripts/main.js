let myLibrary = []
function Book(title, author, pages,id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id =id
}

let btnInsert = document.getElementById('btnInsert')
btnInsert.addEventListener('click', (e) =>{
  // console.log(localStorage.getItem('myLibrary'))
  createBook()
  e.preventDefault();
})
let currentId=0
function createBook()
{
const inputTitle = document.getElementById('inputTitle').value;
const inputAuthor = document.getElementById('inputAuthor').value
const inputPages = document.getElementById('inputPages').value
const libraryInfo = document.getElementById('libraryInfo')
if(inputTitle!='' && inputAuthor!='' && inputPages !='')
{
  if (localStorage.getItem('myLibrary')==null)
  {let book = new Book(inputTitle,inputAuthor,inputPages,0)
    myLibrary.push(book)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    display(0)
  }else{
    let  old_book = JSON.parse(localStorage.getItem('myLibrary'))
    currentId =old_book[currentId].id
    currentId =currentId+1
    let newBook = new Book(inputTitle, inputAuthor,inputPages,currentId);
    old_book.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(old_book))
    display(currentId)
  //   setTimeout(function(){
  //     window.location.reload();
  // }, 60000);



  }
}else{
  alert("some fields can't be blank")
}
}
function display(index) {
  let lib = JSON.parse(localStorage.getItem("myLibrary"));
    const container = document.getElementById("libraryInfo");
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute("id",index);
    const newTitle = document.createElement('h3');
    newTitle.className ="book-title";
    const newAuthor = document.createElement('h4');
    newAuthor.className = "author";
    const newPages = document.createElement('p');
    newPages.className = "nbpages";

    newTitle.innerText = lib[index].title;
    newAuthor.innerText = lib[index].author;
    newPages.innerText = lib[index].pages;

    bookDiv.appendChild(newTitle);
    bookDiv.appendChild(newAuthor);
    bookDiv.appendChild(newPages);
    container.appendChild(bookDiv);
     let button = document.createElement("button");
    button.id= lib[index].id;
     button.setAttribute("onclick",`removeItem(${button.id})`);
     let remove = document.createTextNode("remove");
     bookDiv.appendChild(button);
     button.appendChild(remove);
   
  }
  function removeItem(itemid)
  {
    let lib = JSON.parse(localStorage.getItem("myLibrary"));
    const retrievedId = document.getElementById(itemid).id;
    lib_ar = lib.map(lib_ar => lib_ar.id);
   let index = lib_ar.findIndex(book => book == retrievedId);
   const deleted =lib.splice(index,1);
   localStorage.setItem('myLibrary', JSON.stringify(lib))
   localStorage.removeItem('deleted')
  }
  // localStorage.clear()