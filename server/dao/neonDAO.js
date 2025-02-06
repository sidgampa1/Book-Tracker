neon = require('@neondatabase/serverless');
ws = require('ws');
require('dotenv').config();
neon.webSocketConstructor = ws; 
var pg = require('pg');
var conString = "postgresql://BookTracker_owner:iS2yNF3Ueuqd@ep-autumn-darkness-a5ylnw2k-pooler.us-east-2.aws.neon.tech/BookTracker?sslmode=require";

var sql = new pg.Client(conString);
sql.connect();

module.exports = class NeonDAO {

    
    static async addRow(uid, bid, readStatus) {
        try {
          console.log("addRow sql connection made");
          console.log("uid: ", uid, "bid: ", bid);
          await sql.query('BEGIN');
          const res = await sql.query(`INSERT INTO "UserstoBooks" (userid, bookid, readstatus) VALUES (${uid}, ${bid}, ${readStatus}) RETURNING id`);
          console.log("add row response: ", res.rows);
          await sql.query('COMMIT');
          console.log("commited add row")
          return res.rows

        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } 
        
    }


    static async updateRow(uid, bid, readStatus) {
        try {
            console.log("received request at updateRow", uid, bid, readStatus);
            // var sql = new pg.Client(conString);
            // sql.connect();
            // console.log("connected to neon");
            const res = await sql.query(`UPDATE "UserstoBooks" SET readstatus = ${readStatus} WHERE userid = ${uid} AND bookid = ${bid}`);
            console.log("update row response: ", res);
            await sql.query('COMMIT');
            console.log("commited updated row");
            console.log(res.rowCount);
            // await sql.end()
            // console.log("ended connection");
            return res.rowCount;
        } catch (err) {
          // await sql.query('ROLLBACK');
          console.log("ERR on updateRow: ", err);
          throw err;
        } 
    }

    static async queryRow(uid, bid) {
        try {
            // var sql = new pg.Client(conString);
            // sql.connect();
            console.log("query sql connection made")
            console.log("uid: ", uid, "bid: ", bid)
            const res = await sql.query(`SELECT * FROM "UserstoBooks" WHERE userid = ${uid} AND bookid = ${bid}`)
            console.log("query row response: ", res.rows);
            // await sql.end()
            return res.rows
        } catch (err) {
          throw err;
        }
        
    }

    static async getUserBooks(uid) {
      try {
          // var sql = new pg.Client(conString);
          // sql.connect();
          console.log("user books sql connection made")
          console.log("uid: ", uid)
          const res = await sql.query(`SELECT * FROM "UserstoBooks" WHERE userid = ${uid}`)
          console.log("query row response: ", res.rows);
          // await sql.end()
          return res.rows
      } catch (err) {
        throw err;
      }
      
  }

    static async deleteRow(uid, bid) {
        try {
            console.log("deleteRow sql connection made")
            const res = await sql.query(`DELETE FROM "UserstoBooks" WHERE UserId = ${uid} AND BookId = ${bid}`);
            console.log("delete row response: ", res);
          return res.rowCount;
        } catch (err) {
          throw err;
        } 
        
    }
}
