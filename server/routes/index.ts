import express, { NextFunction } from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
const paths = path.join(__dirname, '../../database.json');
const {deleteData,
    updateData,
    postData,
    getData,
    getAll} = require('./../controller/control')
type typing = {
    todo: string,
    date: string,
    id: number,
}
let database: typing;

// to dynamically produce database.json file if not existing
if(fs.existsSync(paths)){
    database = require(paths);
}
// /* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/api/data', (req: express.Request, res: express.Response, next: NextFunction)=>{
    getAll(req, res, next);
})

router.get('/api/data/:id', (req: express.Request, res: express.Response, next: NextFunction)=>{
getData(req, res, next)
})


router.post('/api/data', (req: express.Request, res: express.Response, next: NextFunction)=>{
postData(req, res, next)
})


router.put('/api/data/:id', (req: express.Request, res: express.Response, next: NextFunction)=>{
updateData(req, res, next)
})


router.delete('/api/data/:id', (req: express.Request, res: express.Response, _next: NextFunction)=>{
deleteData(req, res, _next)
})



module.exports = router
