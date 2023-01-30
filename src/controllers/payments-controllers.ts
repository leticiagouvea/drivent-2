import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import paymentService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";
import { PaymentEntity } from "@/protocols";
import enrollmentsService from "@/services/enrollments-service";

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

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const paymentBody = req.body as PaymentEntity;
  const { userId } = req;

  if(!paymentBody.cardData || !paymentBody.ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const isTicket = await ticketsService.getTicketByUser(paymentBody.ticketId);

    if(!isTicket) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const getEnrollmentByUserId = await enrollmentsService.getOneWithAddressByUserId(userId);

    const enrollmentId = getEnrollmentByUserId.id;

    const ticket = await ticketsService.getTicketByEnrollmentId(enrollmentId);

    if(!ticket.enrollmentId) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const numberCardToString = paymentBody.cardData.number.toString();
    const cardLastDigits = numberCardToString.slice(-4);

    const paymentDataCreate = {
      ticketId: paymentBody.ticketId,
      value: isTicket.TicketType.price,
      cardIssuer: paymentBody.cardData.issuer,
      cardLastDigits,
    };

    await paymentService.createTicketPayment(paymentDataCreate);    

    await ticketsService.updateUserTicket(paymentBody.ticketId);

    const paymentResult = await paymentService.getPaymentByTicketId(paymentBody.ticketId);

    return res.status(httpStatus.OK).send(paymentResult);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
