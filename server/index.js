const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5050

//schema
const schemaData = mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
      },
      bankAccountNo: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      addressLine1: String,
      addressLine2: String,
      city: String,
      country: String,
      zipCode: String,
},{
    timestamps: true
})

const vendorModel = mongoose.model("vendor", schemaData) 

//read
// ​http://localhost:5050/
app.get("/", async(req,res)=> {
    const data = await vendorModel.find({})
    res.json({success: true, data: data})
})

//create
// ​http://localhost:5050/create

app.post("/create",async(req, res)=>{
    console.log(req.body)
    const data = new vendorModel(req.body)
    await data.save()
    res.send({success:true, message : "data saved successfully", data : data})

})

//update
// ​http://localhost:5050/update
/*

"id" : ""
"city" : ""

*/
app.put("/update", async(req, res) =>{
    console.log(req.body)
    const{_id,...rest} = req.body
    
    console.log(rest)
    const data = await vendorModel.updateOne({_id : _id},rest)
    res.send({success:true, message:"Data updated successfully", data: data})
})

//delete
// ​http://localhost:5050/delete/id
app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const data = await vendorModel.deleteOne({_id : id})
    res.send({success:true, message:"Data deleted successfully", data: data})
})

mongoose.connect("mongodb+srv://priyaagadi:priyaagadi@cluster0.swgayq2.mongodb.net/")
.then(() => {
    console.log("Connect to DB")
    app.listen(PORT, ()=>console.log("Server is Running"))
})
.catch((err)=>console.log(err))

