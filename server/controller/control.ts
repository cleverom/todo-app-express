import express, { NextFunction } from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
const paths = path.join(__dirname, '../../database.json');

type PartialType =  Array<{
    todo: string,
    date: Date,
    id: number
  }>

// type typing = string | number
let database: PartialType;

// to dynamically produce database.json file if not existing
if(fs.existsSync(paths)){
    database = require(paths);
}
const getAll = ((req: express.Request, res: express.Response, next: NextFunction)=>{
    res.status(200).json(database)
})

const getData = ((req: express.Request, res: express.Response, next: NextFunction)=>{
    const singleData = database.find((c: any) => (c.id) === parseInt(req.params.id))
    if(!singleData) res.status(404).send("data not found")
    res.json(singleData)
})


const postData = ((req: express.Request, res: express.Response, next: NextFunction)=>{
    const paths = path.join(__dirname,'../../database.json')
    const newData = {
        todo: req.body.todo,
        date: req.body.date,
        id: req.body.id
    }

    console.log(newData)
    if(!database){
        database = [newData]
    }else{

        database.push(newData)
    }
    let newDatabase = JSON.stringify(database, null, 2)
    fs.writeFile(paths, newDatabase, (err: any)=>{
        
    if(err) throw err
    })
    res.status(201).json({message: newData})
})


const updateData = ((req: express.Request, res: express.Response, next: NextFunction)=>{
    const paths = path.join(__dirname,'../../database.json')
    const singleData = database.find((c: any) => (c.id) === parseInt(req.params.id));
    if(!singleData) res.status(404).json("data not found");
    if(singleData){
        const changeData = req.body;
        console.log(changeData)
            singleData.todo = changeData.todo || singleData.todo
            fs.writeFile(paths, JSON.stringify(database, null, 2), (err: any)=>{
                if(err) throw err
            })
    }
    
    res.status(200).json(singleData);
})


const deleteData = ((req: express.Request, res: express.Response, next: NextFunction)=>{
    const paths = path.join(__dirname,'../../database.json')
    const singleData = database.find(((c: any) => parseInt(c.id) === parseInt(req.params.id)));
    if(!singleData) res.status(404).send("data not found")
    if(singleData){
        database = database.filter((dat: any) => parseInt(dat.id) !== parseInt(req.params.id));
        res.json({message: "data deleted", database});
        
        fs.writeFile(paths, JSON.stringify(database, null, 2), (err: any)=>{
            if(err) throw err
        })
    }
    
    res.status(200).send();
})



module.exports = {
    deleteData,
    updateData,
    postData,
    getData,
    getAll
}
