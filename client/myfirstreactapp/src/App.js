import logo from './logo.svg';
import './App.css';
import Book from './Book.js';

function App() {
  const apiLink = 'http://localhost:3000/api/v1/books'

  // function deleteBook(id) {
  //   const res = fetch(this.apiLink + "/deleteBook", {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       uid: 1,
  //       bid: id,
  //     })
  //   })
  // }

  async function addBook(id, readStatus) {
    const res = await fetch(apiLink + "/addBook", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: 1,
        bid: Number(id),
        readStatus: Number(readStatus),
      })
    })

    console.log(res)
  }
// addBook={addBook} deleteBook={deleteBook}

  return (
    <div className="Book">
      <Book title="Test1" id="1" readStatus="1" addBook={addBook}></Book>
    </div>
  );
}

export default App;
