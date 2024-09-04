import prismaClient from "../prisma";

class ListCustomersService{
  async execute(){

    const customers = await prismaClient.startup.findMany()

    return customers;
  }
}

export { ListCustomersService }