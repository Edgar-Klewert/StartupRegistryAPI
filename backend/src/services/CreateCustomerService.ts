import prismaClient from "../prisma";

interface CreateCustomerProps{
  name: string;
  city: string;
}

class CreateCustomerService{
  async execute({ name, city }: CreateCustomerProps){

    if(!name || !city){
      throw new Error("Preencha todos os campos")
    }

    const customer = await prismaClient.customer.create({
      data:{
        name,
        city,
        status: true
      }
    })

    return customer
  }
}

export { CreateCustomerService }