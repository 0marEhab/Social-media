const express=require('express');
const router=express.Router();

const ticketController=require("../controllers/ticket.controller");
const upload = require('./../middleware/upload');

router.get('/tickets',ticketController.getAllTickets);
router.post("/createTicket", upload.single("media"), ticketController.createTicket);

module.exports =router;