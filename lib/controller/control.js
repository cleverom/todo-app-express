"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const paths = path_1.default.join(__dirname, '../../database.json');
let database;
// to dynamically produce database.json file if not existing
if (fs_1.default.existsSync(paths)) {
    database = require(paths);
}
const getAll = ((req, res, next) => {
    res.status(200).json(database);
});
const getData = ((req, res, next) => {
    const singleData = database.find((c) => (c.id) === (req.params.id));
    if (!singleData)
        res.status(404).send("data not found");
    res.json(singleData);
});
const postData = ((req, res, next) => {
    const paths = path_1.default.join(__dirname, '../../database.json');
    const newData = {
        todo: req.body.todo,
        date: req.body.date,
        id: req.body.id
    };
    console.log(newData);
    if (!database) {
        database = [newData];
    }
    else {
        database.push(newData);
    }
    database = JSON.stringify(database, null, 2);
    fs_1.default.writeFile(paths, database, (err) => {
        if (err)
            throw err;
    });
    res.status(201).json({ message: newData });
});
const updateData = ((req, res, next) => {
    const paths = path_1.default.join(__dirname, '../../database.json');
    const singleData = database.find((c) => (c.id) === parseInt(req.params.id));
    if (!singleData)
        res.status(404).json("data not found");
    if (singleData) {
        const changeData = req.body;
        console.log(changeData);
        singleData.todo = changeData.todo || singleData.todo;
        fs_1.default.writeFile(paths, JSON.stringify(database, null, 2), (err) => {
            if (err)
                throw err;
        });
    }
    res.status(200).json(singleData);
});
const deleteData = ((req, res, next) => {
    const paths = path_1.default.join(__dirname, '../../database.json');
    const singleData = database.find(((c) => parseInt(c.id) === parseInt(req.params.id)));
    if (!singleData)
        res.status(404).send("data not found");
    if (singleData) {
        database = database.filter((dat) => parseInt(dat.id) !== parseInt(req.params.id));
        res.json({ message: "data deleted", database });
        fs_1.default.writeFile(paths, JSON.stringify(database, null, 2), (err) => {
            if (err)
                throw err;
        });
    }
    res.status(200).send();
});
module.exports = {
    deleteData,
    updateData,
    postData,
    getData,
    getAll
};
//# sourceMappingURL=control.js.map