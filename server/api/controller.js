const neonDAO = require("../dao/NeonDAO.js");

module.exports = class NeonController {
    static async addBook(req, res) {
        try {
            console.log("received request at addBook");
            console.log("Request Body: ", req.body);
            const { uid, bid, readStatus } = req.body;
            const bookExists = await neonDAO.queryRow(uid, bid);
            console.log("Result ", bookExists[0].readstatus, readStatus);

            // console.log(JSON.stringify(response))
            if ((bookExists.length > 0) & bookExists[0].readstatus != readStatus) {
                console.log("Updating existing book");
                const response = await neonDAO.updateRow(uid, bid, readStatus);
                print("Update Response: ", response);
            } 
            // else if (bookExists == null) { //TODO Stuck here
            //     console.log("Adding new book");
            //     response = await neonDAO.addRow(uid, bid, readStatus);
            // }

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