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
const { deleteData, updateData, postData, getData, getAll } = require('./../controller/control');
let database;
// to dynamically produce database.json file if not existing
if (fs_1.default.existsSync(paths)) {
    database = require(paths);
}
// /* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
router.get('/api/data', (req, res, next) => {
    getAll(req, res, next);
});
router.get('/api/data/:id', (req, res, next) => {
    getData(req, res, next);
});
router.post('/api/data', (req, res, next) => {
    postData(req, res, next);
});
router.put('/api/data/:id', (req, res, next) => {
    updateData(req, res, next);
});
router.delete('/api/data/:id', (req, res, _next) => {
    deleteData(req, res, _next);
});
module.exports = router;
//# sourceMappingURL=index.js.map