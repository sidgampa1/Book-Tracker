import logo from './logo.svg';
import './App.css';
import Book from './Book.js';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const apiLink = 'http://localhost:8000/api/v1/books'

  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch(apiLink + "/getUserBooks?uid=1", {
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json()).then(res => {setBooks(res)})}, [])
    
    console.log(books)

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
      <Book title="Test1" id="3" readStatus="1" addBook={addBook}></Book>
      {books.map((book) => (<Book title={book.bookid} id={book.bookid} readStatus={book.readstatus} addBook={addBook}></Book>
      ))}
    </div>
  );
}

export default App;
