import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import paymentService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;

  if(!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const isTicket = await ticketsService.getTicketByUser(Number(ticketId));

    if(!isTicket) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const paymentResult = await paymentService.getPaymentByTicketId(Number(ticketId));

    return res.status(httpStatus.OK).send(paymentResult);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
