import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";

async function getPaymentByTicketId(ticketId: number): Promise<Payment> {  
  const paymentResult = await paymentRepository.findPaymentByTicketId(ticketId);
  
  if(!paymentResult) throw notFoundError();

  return paymentResult;
}

const paymentService = {
  getPaymentByTicketId
};

export default paymentService;
