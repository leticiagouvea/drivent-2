import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId);

export { paymentsRouter };
