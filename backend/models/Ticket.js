const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ticketSchema=new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
        media:String,

    },
    {timestamps:true}
);
const Ticket=mongoose.model("Ticket",ticketSchema);
module.exports=Ticket;