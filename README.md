Book Tracker

User Stories

V1
- user should be able to track/edit :
  - currently reading
  - want to read
  - read books
- user should be able to search books
- user should be able to see trending books

V2
- user should be able to receive notifications when authors or series they are reading publish new books
- user should be able to view recommendations based on their lists
- user should be able to view a avaibility of a book at their local library

API options 

book info - 
https://openlibrary.org/developers/api
https://www.goodreads.com/api

local library - 
https://openlibrary.org/dev/docs/api/search git 

Tech Stack - MERN
Authentication - Firebase
Email Notifications - SendGrid

DB Overview 
non relational - MongoDB
relational - Neon

  Design Decisions
  - went with Neon as a lightweight relational DB
    - data is highly relational with users and books relations (v1), as well as user to user relations (v2)
  - initially started with 3 tables (read, completed, wanttoread)
    - changed to 1 table with a single column marking readStatus
    - this allows for quick queries and simple checks to determine status of a book
    - unique index combo of user ID and book ID to not allow a user to have duplicate entries of a book
      - each book for a user can only be in a single state (read, completed, want to read)
