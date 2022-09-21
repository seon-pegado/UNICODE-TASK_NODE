import express from 'express';
import fetch from "node-fetch";
import { MongoClient } from "mongodb";
import  "./breakingbad.js";
// import character from "./character.js";
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    char_id: { type:Number },
    _name: { type:String },
    birthday: { type:String },
    occupation: { type:Array },
    img: { type:String },
    _status: { type:String },
    nickname: { type:String },
    appearance: { type:Array },
    portrayed: { type:String },
    category: { type:String },
    bcsa: { type:Array }
});
const character=mongoose.model("character", Schema);
//to save data in mongodb
async function getCharacter() {
    const myChar = await fetch("https://breakingbadapi.com/api/characters");
    const response = await myChar.json();
    for (let i = 0; i < response.length; i++) {
        const char = new character({
            char_id: response[i]["char_id"],
            _name: response[i]["name"],
            birthday: response[i]["birthday"],
            occupation: response[i]["occupation"],
            img: response[i]["img"],
            _status: response[i]["status"],
            nickname: response[i]["nickname"],
            appearance: response[i]["appearance"],
            portrayed: response[i]["portrayed"],
            category: response[i]["category"],
            bcsa: response[i]["better_call_saul_appearance"]
        });
        await char.save();
    }
}
getCharacter();
const url="mongodb://localhost:27017";
const client = new MongoClient(url);
async function getData()
{
    let result= await client.connect();
    let db=result.db("breaking_bad");
    //let collection =db.collection("character");
    //let response=await collection.find({}).toArray();
    return db.collection("characters");
}


const app=express();
//to show data on screen
app.get('/',async (req,resp)=>
{
    let ans = await getData();
    let data =await ans.find().toArray();
    resp.send(data);   
})
app.listen(5000,()=>
{
    console.log('The server is running at port 5000');
})
































// async function getData()
// {
//     const myData= await fetch("https://breakingbadapi.com/api/characters")
//     const response=await myData.json();
//     console.log(response );//print every information of character
   
//     // for(let i=0;i<response.length;i++)
//     // {
//     //     process.stdout.write((i+1)+') '+response[i]['name']+' ');
//     //    
//     // }only to print names of character

    

// }

// getData();