import logo from './logo.svg';
import './App.css';
import Book from './Book.js';
import NavBar from './NavBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';



function App() {
  const apiLink = 'http://localhost:8000/api/v1/books'

  const [books, setBooks] = useState([])
  const [active, setActive] = useState("read")

  useEffect(() => {
    fetch(apiLink + "/getUserBooks?uid=1", {
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json()).then(res => {setBooks(res)})}, [])
    
    console.log("books",books)

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
    <>
    <NavBar setActive={setActive}></NavBar>
   {(active === "read") && <section id="read"> 
      <h1>Completed</h1>
    <Book title="Test1" id="3" readStatus="0" addBook={addBook}></Book>
    </section>}
    {(active === "reading") && <section id="reading">  
      <h1>Currently Reading</h1>
    {books.map((book) => ((book.readstatus === 1) ? <Book title={book.bookid} id={book.bookid} readStatus={book.readstatus} addBook={addBook}></Book> : null
      ))}
          <Book title="Test1" id="3" readStatus="0" addBook={addBook}></Book>

          <Book title="Test1" id="3" readStatus="0" addBook={addBook}></Book>

          <Book title="Test1" id="3" readStatus="0" addBook={addBook}></Book>

    </section>}
    {(active === "toRead") && <section id="toRead" display = {active === "toRead" ? "" : "none"} >
      <h1>Want to Read</h1>
    {books.map((book) => ((book.readstatus === 2) ? <Book title={book.bookid} id={book.bookid} readStatus={book.readstatus} addBook={addBook}></Book> : null
      ))}
    </section>}

    </>
  );
}

export default App;
