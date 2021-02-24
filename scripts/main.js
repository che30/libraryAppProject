let myLibrary = []
function Book(title, author, pages,id,status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id =id
  this.status = status
}

let btnInsert = document.getElementById('btnInsert')
btnInsert.addEventListener('click', (e) =>{
  createBook()
  document.forms[0].reset();
  e.preventDefault();
})
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
   
    let book = new Book(inputTitle,inputAuthor,inputPages,curentId,false)
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
    let newBook = new Book(inputTitle, inputAuthor,inputPages,curentId,false);
    myLibrary.push(old_book)
    old_book.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(old_book))
    display(curentId)



  }
}else{
  alert("some fields can't be blank")
}
}
function display(index) {
  let lib = JSON.parse(localStorage.getItem("myLibrary"));
    const container = document.getElementById("libraryInfo");
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('d-flex');
    bookDiv.classList.add('justify-content-around');
    bookDiv.classList.add('mt-5');
    const newTitle = document.createElement('h3');
    newTitle.className ="book-title";
    const newAuthor = document.createElement('h4');
    newAuthor.className = "author";
    const newPages = document.createElement('p');
    const dFlex = document.createElement('div');
    dFlex.className = "d-flex"
    const status = document.createElement('button')
    status.className = "status"
    status.classList.add("bg-primary")
    status.id= 's'+index
    status.setAttribute("onclick",`changeStatus(${index})`)
    status.innerText = "read book"
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
     dFlex.appendChild(status);
     dFlex.appendChild(button)
     bookDiv.appendChild(dFlex);
     button.appendChild(remove);
   
  }
  function changeStatus(statusId){
    let lib = JSON.parse(localStorage.getItem("myLibrary"));
    const retrievedId = document.getElementById('s'+statusId);
    const retrievedId2 = document.getElementById(statusId)
    retrievedId.className ="bg-success"
    retrievedId.innerHTML = "read"
    lib[statusId].status = true 
    localStorage.setItem('myLibrary',JSON.stringify(lib))
  }
  function removeItem(itemid)
  {
    let lib = JSON.parse(localStorage.getItem("myLibrary"));
    const newlib = lib.filter(item =>{
      return  item.itemid !== item
    })
    localStorage.setItem('myLibrary',JSON.stringify(newlib))
      document.getElementById(itemid).parentNode.parentNode.remove()

  }
   //localStorage.clear()