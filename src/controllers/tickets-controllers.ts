import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
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
