import ticketRepository from "@/repositories/ticket-repository";
import { TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
  return await ticketRepository.findTicketsType();
}

const ticketService = {
  getTicketTypes
};

export default ticketService;
