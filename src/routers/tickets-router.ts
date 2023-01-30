import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createTicket, getTicketById, getTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicketById)
  .post("/", createTicket);

export { ticketsRouter };

