import ticketRepository from "@/repositories/ticket-repository";
import { TicketTypeEntity } from "@/protocols";
import { Ticket, TicketType } from "@prisma/client";
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

async function  createUserTicket(ticketTypeId: number, enrollmentId: number) {
  return await ticketRepository.createTicket(ticketTypeId, enrollmentId);
}

async function updateUserTicket(ticketId: number): Promise<Ticket> {
  return await ticketRepository.updateTicket(ticketId);
}

const ticketService = {
  getTicketTypes,
  getTicketByUser,
  getTicketByEnrollmentId,
  createUserTicket,
  updateUserTicket
};

export default ticketService;
