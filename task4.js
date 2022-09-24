import express from 'express';
import mongoose from 'mongoose';
import "./breakingbad.js";

const Schema = new mongoose.Schema({
    char_id: Number,
    _name: String,
    birthday: String,
    occupation: Array,
    img: String,
    _status: String,
    nickname: String,
    appearance: Array,
    portrayed: String,
    category:String,
    bcsa: Array
});
const char = mongoose.model("character",Schema);

const app=express();
app.use(express.json());
app.delete("/delete/:char_id",async(req,resp)=>{
    let data=await char.deleteOne(req.params);
    resp.send(data);
})

app.put("/update/:char_id",async(req,resp)=>{
    let data=await char.updateOne(
        req.params,
        {
            $set:req.body 
        }
    );
    resp.send(data);
})
app.get("/NewData",async(req,resp)=>{
    let data=await char.find();
    resp.send(data);
})
app.listen(5000, () => {
    console.log('The server is running at port 5000');
})