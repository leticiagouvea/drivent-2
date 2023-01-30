import { prisma } from "@/config";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  findTicketsType
};

export default ticketRepository;
