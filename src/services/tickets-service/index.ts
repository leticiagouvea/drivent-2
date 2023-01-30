import ticketRepository from "@/repositories/ticket-repository";
import { TicketTypeEntity } from "@/protocols";
import { TicketType } from "@prisma/client";
import { notFoundError } from "@/errors";

async function getTicketTypes(): Promise<TicketType[]> {
  return await ticketRepository.findTicketsType();
}

async function getTicketByUser(ticketId: number): Promise<TicketTypeEntity> {
  return await ticketRepository.findTicketById(ticketId);
}

async function getTicketByEnrollmentId(enrollmentId: number): Promise<TicketTypeEntity> {
  const ticketResult = await ticketRepository.findTicketByEnrollmentId(enrollmentId);

  if(!ticketResult) throw notFoundError();

  return ticketResult;
}

const ticketService = {
  getTicketTypes,
  getTicketByUser,
  getTicketByEnrollmentId
};

export default ticketService;
