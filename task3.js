import express from "express";
import mongoose from "mongoose";
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
const char = mongoose.model("characters",Schema);

const app = express();
app.use(express.json());
app.post("/post", async (req, resp) => {
    let  data=new char(req.body)
    let ans=await data.save();
    resp.send(ans);
})
app.get('/newdata',async(req,resp)=>{
    let data=await char.find();
    resp.send(data);
})

app.listen(5000, () => {
    console.log('The server is running at port 5000');
})