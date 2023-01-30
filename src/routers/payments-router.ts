import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createPayment, getPaymentByTicketId } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", createPayment);

export { paymentsRouter };
