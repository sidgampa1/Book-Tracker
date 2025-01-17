neonConfig = require('@neondatabase/serverless');
ws = require('ws');
neonConfig.webSocketConstructor = ws; 

module.exports = class NeonDAO {
    static async createConnection() {
        try {
            pool = new Pool({ connectionString: process.env.DATABASE_URL });
            pool.on('error', (err) => console.error(err)); 
            client = await pool.connect();
            return client;
        } catch (err) {
            console.error(err);
        }

    }
    
    static async addRow(uid, bid, readStatus) {
        try {
            client = await this.createConnection();
            await client.query('BEGIN');
            res = await client.query('INSERT INTO "UserstoBooks" (UserId, BookId, ReadStatus) VALUES ($2, $3, $4) RETURNING id', [
            tableName,
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
            client = await this.createConnection();
            res = await client.query('SELECT * FROM "UserstoBooks" WHERE UserId = $1 AND BookId = $2', [
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
