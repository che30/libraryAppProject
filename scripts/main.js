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
  document.forms[0].reset();
  e.preventDefault();
})
// let curentId=0
function createBook()
{
const inputTitle = document.getElementById('inputTitle').value;
const inputAuthor = document.getElementById('inputAuthor').value
const inputPages = document.getElementById('inputPages').value
const libraryInfo = document.getElementById('libraryInfo')
let curentId = Number(localStorage.getItem('lastBookId'))
if(inputTitle!='' && inputAuthor!='' && inputPages !='')
{ 
  
  if (localStorage.getItem('myLibrary')==null)
  { 
     if (curentId==null)
    {localStorage.setItem('lastBookId', 0);
    curentId = 0;}
   
    let book = new Book(inputTitle,inputAuthor,inputPages,curentId)
    myLibrary.push(book)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    
    display(curentId)
  }else{
    if (curentId != null) {
      curentId = Number(localStorage.getItem('lastBookId'))
      curentId +=1
      localStorage.setItem('lastBookId', curentId);
    }

    let  old_book = JSON.parse(localStorage.getItem('myLibrary'))
    let newBook = new Book(inputTitle, inputAuthor,inputPages,curentId);
    myLibrary.push(old_book)
    old_book.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(old_book))
    display(curentId)
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
    // bookDiv.setAttribute("id",index);
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
    button.id= index;
     button.setAttribute("onclick",`removeItem(${button.id})`);
     let remove = document.createTextNode("remove");
     bookDiv.appendChild(button);
     button.appendChild(remove);
   
  }
  function removeItem(itemid)
  {
    let lib = JSON.parse(localStorage.getItem("myLibrary"));
    const newlib = lib.filter(item =>{
      return  item.itemid !== item
    })
    localStorage.setItem('myLibrary',JSON.stringify(newlib))
    // const retrievedId = document.getElementById(itemid).id;
    //   console.log(temp)
      document.getElementById(itemid).parentNode.remove()
    
  //  setTimeout(function()
  //  { location.reload(); }, 5000);

  }
   //localStorage.clear()