const neonDAO = require("../dao/NeonDAO.js");

module.exports = class NeonController {
    static async addBook(req, res) {
        try {
            console.log("received request at addBook");
            const { uid, bid, readStatus } = req.body;
            const bookExists = await neonDAO.queryRow(uid, bid);
            console.log("Book Exists? ", bookExists.rows.length > 0);
            
            if ((bookExists.rows.length > 0) & bookExists.rows[0].readstatus != readStatus) {
                response = await neonDAO.updateRow(uid, bid, readStatus);
            } else {
                response = await neonDAO.addRow(uid, bid, readStatus);
            }

            res.status(201).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async deleteBook(req, res) {
        try {
            const { uid, bid } = req.body;
            response = await neonDAO.deleteRow(uid, bid);
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async getBook(req, res) {
        try {
            const { uid, bid } = req.body;
            response = await neonDAO.queryRow(uid, bid);
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
};