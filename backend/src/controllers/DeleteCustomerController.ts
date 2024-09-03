import { FastifyRequest, FastifyReply } from 'fastify';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { z } from 'zod';

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = querySchema.parse(request.query);

      const customerService = new DeleteCustomerService();
      const customer = await customerService.execute({ id });

      return reply.send(customer);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
    }
  }
}

export { DeleteCustomerController };
