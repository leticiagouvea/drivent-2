import { prisma } from "@/config";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true
    }
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
  });
}

async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

const ticketRepository = {
  findTicketsType,
  findTicketById,
  findTicketByEnrollmentId,
  createTicket,
  updateTicket
};

export default ticketRepository;
