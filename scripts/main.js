/* eslint-disable import/extensions */
import Book from './dom.js';

const myLibrary = [];
window.changeStatus = (statusId) => {
  const lib = JSON.parse(localStorage.getItem('myLibrary'));
  const retrievedId = document.getElementById(`s${statusId}`);
  retrievedId.className = 'bg-danger';
  retrievedId.innerHTML = 'read';
  lib[statusId].status = true;
  localStorage.setItem('myLibrary', JSON.stringify(lib));
};
window.removeItem = (itemid) => {
  const lib = JSON.parse(localStorage.getItem('myLibrary'));
  const newlib = lib.filter(item => item.itemid !== item);
  localStorage.setItem('myLibrary', JSON.stringify(newlib));
  document.getElementById(itemid).parentNode.parentNode.remove();
};
function display(index) {
  const lib = JSON.parse(localStorage.getItem('myLibrary'));
  const container = document.getElementById('libraryInfo');
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('d-flex');
  bookDiv.classList.add('justify-content-around');
  bookDiv.classList.add('mt-5');
  bookDiv.classList.add('bg-success')
  bookDiv.classList.add('py-3')
  bookDiv.style.cssText = 'width:95% alig-items-baseline align-content-baseline%'
  const newTitle = document.createElement('h3');
  newTitle.className = 'book-title';
  newTitle.classList.add('text-white')
  const newAuthor = document.createElement('h4');
  newAuthor.className = 'author';
  newAuthor.classList.add('text-white')
  const newPages = document.createElement('p');
  newPages.className = 'text-white';
  newPages.classList.add('ml-5')
  const dFlex = document.createElement('div');
  dFlex.style.cssText='width:10%;'
  dFlex.classList.add('text-right')
  const status = document.createElement('button');
  status.className = 'status';
  status.classList.add('bg-primary');
  status.id = `s${index}`;
  status.setAttribute('onclick', `changeStatus(${index})`);
  status.innerText = 'read book';
 


  newTitle.innerText = lib[index].title;
  newAuthor.innerText = lib[index].author;
  newPages.innerText = lib[index].pages;

  bookDiv.appendChild(newTitle);
  bookDiv.appendChild(newAuthor);
  bookDiv.appendChild(newPages);
  container.appendChild(bookDiv);
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.id = index;
  button.setAttribute('onclick', `removeItem(${button.id})`);
  const remove = document.createTextNode('remove');
  dFlex.appendChild(status);
  dFlex.appendChild(button);
  bookDiv.appendChild(dFlex);
  button.appendChild(remove);
}

function createBook() {
  const inputTitle = document.getElementById('inputTitle').value;
  const inputAuthor = document.getElementById('inputAuthor').value;
  const inputPages = document.getElementById('inputPages').value;
  let curentId = Number(localStorage.getItem('lastBookId'));
  if (inputTitle !== '' && inputAuthor !== '' && inputPages !== '') {
    if (localStorage.getItem('myLibrary') == null) {
      if (curentId == null) {
        localStorage.setItem('lastBookId', 0);
        curentId = 0;
      }

      const book = new Book(inputTitle, inputAuthor, inputPages, curentId, false);
      myLibrary.push(book);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

      display(curentId);
    } else {
      if (curentId != null) {
        curentId = Number(localStorage.getItem('lastBookId'));
        curentId += 1;
        localStorage.setItem('lastBookId', curentId);
      }

      const oldBook = JSON.parse(localStorage.getItem('myLibrary'));
      const newBook = new Book(inputTitle, inputAuthor, inputPages, curentId, false);
      myLibrary.push(oldBook);
      oldBook.push(newBook);
      localStorage.setItem('myLibrary', JSON.stringify(oldBook));
      display(curentId);
    }
  }
}
const btnInsert = document.getElementById('btnInsert');
btnInsert.addEventListener('click', (e) => {
  createBook();
  document.forms[0].reset();
  e.preventDefault();
});


localStorage.clear();