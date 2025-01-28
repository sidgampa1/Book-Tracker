const neonDAO = require("../dao/NeonDAO.js");

module.exports = class NeonController {
    static async addBook(req, res) {
        try {
            console.log("received request at addBook");
            console.log("Request Body: ", req.body);
            const { uid, bid, readStatus } = req.body;
            const bookExists = await neonDAO.queryRow(uid, bid);
            console.log("recived query resp ", bookExists, bookExists.length);
            // console.log("Result ", bookExists[0].readstatus, readStatus);

            if ((bookExists.length > 0) && bookExists[0].readstatus != readStatus) {
                console.log("Updating existing book");
                const result = await neonDAO.updateRow(uid, bid, readStatus);
                if (result > 0) {
                    res.status(201).json({"numRowsUpdated": result});
                }
            } 
            else if (bookExists.length == 0) { //TODO Stuck here
                console.log("Adding new book");
                const result = await neonDAO.addRow(uid, bid, readStatus);
                if (result) {
                    res.status(201).json({"newRowId": result[0].id});
                }
            }

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