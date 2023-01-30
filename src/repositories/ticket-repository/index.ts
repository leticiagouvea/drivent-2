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

const ticketRepository = {
  findTicketsType,
  findTicketById,
  findTicketByEnrollmentId
};

export default ticketRepository;
