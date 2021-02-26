/* eslint-disable import/extensions */
import { Book, display } from './dom.js';

const myLibrary = [];
const f1 = document.getElementById('f1');
const h1 = document.getElementById('h1');
let hidden = true;
f1.className = 'd-none';
h1.addEventListener('click', () => {
  if (hidden === true) {
    f1.className = 'd-block';
  } else {
    hidden = true;
    f1.className = 'd-none';
  }
});

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
    }
  }
}

function clear() {
  document.getElementById('inputTitle').value = '';
  document.getElementById('inputAuthor').value = '';
  document.getElementById('inputPages').value = '';
}
const btnInsert = document.getElementById('btnInsert');
btnInsert.addEventListener('click', (e) => {
  createBook();
  setTimeout(() => {
    window.location.reload();
  }, 6000);
  e.preventDefault();
  clear();
});
const lib = JSON.parse(localStorage.getItem('myLibrary'));
if (lib !== null) display();
// localStorage.clear()