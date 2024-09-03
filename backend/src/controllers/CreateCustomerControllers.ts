import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateCustomerService } from '../services/CreateCustomerService'
import { z } from 'zod'

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const customerSchema = z.object({
      name: z.string(),
      city: z.string(),
    })

    try {
      const { name, city } = customerSchema.parse(request.body)

      const customerService = new CreateCustomerService()
      const customer = await customerService.execute({ name, city })

      return reply.status(201).send(customer)
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message })
      }
    }
  }
}

export { CreateCustomerController }
