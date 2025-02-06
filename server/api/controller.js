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

            let body;
            if ((bookExists.length > 0) && bookExists[0].readstatus != readStatus) {
                console.log("Updating existing book");
                const result = await neonDAO.updateRow(uid, bid, readStatus);
                if (result > 0) {
                    body = {"updatedRows": result};
                }
            } 
            else if (bookExists.length == 0) { //TODO Stuck here
                console.log("Adding new book");
                const result = await neonDAO.addRow(uid, bid, readStatus);
                if (result) {
                    body = {"newRowId": result[0].id};
                }
            }

            if (body) {
                res.status(200).json(body);
            }
            else {
                res.status(500).json("Error adding book");
            }

        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async deleteBook(req, res) {
        try {
            const { uid, bid } = req.body;
            const response = await neonDAO.deleteRow(uid, bid);
            let body = {"deletedRows": response};
            res.status(200).json(body);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async getBook(req, res) {
        try {
            const { uid, bid } = req.body;
            const response = await neonDAO.queryRow(uid, bid);
            console.log("getBook response: ", response);
            res.status(200).json(response[0]);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async getUserBooks(req, res) {
        try {
            const { uid } = req.query;
            const response = await neonDAO.getUserBooks(uid);
            console.log("getUserBooks response: ", response);
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
};