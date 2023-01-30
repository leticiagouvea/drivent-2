import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId }
  }); 
}

const paymentRepository = {
  findPaymentByTicketId
};

export default paymentRepository;
