const express=require('express');
const router=express.Router();

const ticketController=require("../controllers/ticket.controller");

router.get('/tickets',ticketController.getAllTickets);
router.post('/createTicket',ticketController.createTicket);

module.exports =router;