neon = require('@neondatabase/serverless');
ws = require('ws');
require('dotenv').config();
neon.webSocketConstructor = ws; 
var pg = require('pg');
var conString = "postgresql://BookTracker_owner:iS2yNF3Ueuqd@ep-autumn-darkness-a5ylnw2k-pooler.us-east-2.aws.neon.tech/BookTracker?sslmode=require";

module.exports = class NeonDAO {
  static async createConnection() {
        try {
            console.log("creating connection");
            const pool = new neon.Pool({ connectionString: process.env.DATABASE_URL });
            console.log("pool created");
            pool.on('error', (err) => console.error(err)); 
            const client = await pool.connect();
            console.log("client created");
            return client;
        } catch (err) {
            console.error(err);
        }

    }
    
    static async addRow(uid, bid, readStatus) {
        try {

          var sql = new pg.Client(conString);
          sql.connect();
          console.log("addRow sql connection made");
          console.log("uid: ", uid, "bid: ", bid);
          await sql.query('BEGIN');
          const res = await sql.query('INSERT INTO "UserstoBooks" (UserId, BookId, ReadStatus) VALUES ($2, $3, $4) RETURNING id', [
            tableName,
            uid,
            bid,
            readStatus
          ]); // 
          console.log("add row response: ", res);
          await sql.query('COMMIT');
          return res

        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } 
        
    }


    static async updateRow(uid, bid, readStatus) {
        try {
            client = await this.createConnection();
            await client.query('BEGIN');
            res = await client.query('UPDATE "UserstoBooks" SET ReadStatus = $3 WHERE UserId = $1 AND BookId = $2', [
            uid,
            bid,
            readStatus
          ]);
          await client.query('COMMIT');
          return res;
        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } finally {
          client.release();
          await pool.end();

        }
        
    }

    static async queryRow(uid, bid) {
        try {
            var sql = new pg.Client(conString);
            sql.connect();
            console.log("query sql connection made")
            console.log("uid: ", uid, "bid: ", bid)
            const res = await sql.query(`SELECT * FROM "UserstoBooks" WHERE userid = ${uid} AND bookid = ${bid}`) // 
            console.log("query row response: ", res.rows);
            return res.rows
        } catch (err) {
          throw err;
        }
        
    }

    static async deleteRow(uid, bid) {
        try {
            client = await this.createConnection();
            res = await client.query('DELETE FROM "UserstoBooks" WHERE UserId = $1 AND BookId = $2', [
            uid,
            bid
          ]);
          return res;
        } catch (err) {
          throw err;
        } finally {
          client.release();
          await pool.end();

        }
        
    }
}
