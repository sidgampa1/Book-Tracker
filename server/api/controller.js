const neonDAO = require("../dao/NeonDAO.js");

module.exports = class NeonController {
    static async addBook(req, res) {
        try {
            console.log("received request at addBook");
            console.log("Request Body: ", req.body);
            const { uid, bid, readStatus } = req.body;
            const bookExists = await neonDAO.queryRow(uid, bid);
            console.log("Result ", bookExists);
            
            if ((bookExists.length > 0) & bookExists.readstatus != readStatus) {
                console.log("Updating existing book");
                response = await neonDAO.updateRow(uid, bid, readStatus);
            } else if (bookExists == null) { 
                console.log("Adding new book");
                response = await neonDAO.addRow(uid, bid, readStatus);
            }

            console.log("Response: ", response);
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