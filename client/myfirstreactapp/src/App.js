import logo from './logo.svg';
import './App.css';
import Book from './Book.js';

function App() {
  this.apiLink = 'http://localhost:3000/api/v1/books'

  function deleteBook(id) {
    fetch(this.apiLink + "/deleteBook", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 1,
        bid: id,
      })
    })
  }

  function addBook(id, readStatus) {
    fetch(this.apiLink + "/addBook", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 1,
        bid: id,
        readStatus: readStatus,
      })
    })
  }


  return (
    <div >
      <Book title="Test1" id="1" addBook={addBook} deleteBook={deleteBook}></Book>
    </div>
  );
}

export default App;
