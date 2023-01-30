import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import enrollmentsService from "@/services/enrollments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketService.getTicketTypes();

    if(!ticketTypes) {
      return res.status(httpStatus.OK).send([]);
    }
  
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.send(httpStatus.NOT_FOUND);
  }  
}

export async function getTicketById(req: AuthenticatedRequest, res: Response) {  
  const { userId } = req;

  try {
    const getEnrollmentByUserId = await enrollmentsService.getOneWithAddressByUserId(userId);

    const enrollmentId = getEnrollmentByUserId.id;

    const ticket = await ticketService.getTicketByEnrollmentId(enrollmentId);

    if(!ticket.enrollmentId) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
