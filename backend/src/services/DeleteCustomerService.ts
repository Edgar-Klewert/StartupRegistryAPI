import prismaClient from "../prisma";

interface DeleteCustomerProps{
  id: string;
}

class DeleteCustomerService{
  async execute({ id }: DeleteCustomerProps){
    if(!id){
      throw new Error("Solicitação invalida.")
    }

    const findCustomer = await prismaClient.startup.findFirst({
      where:{
        id: id
      }
    })
    if(!findCustomer){
      throw new Error("Startup não existe!")
    }
    await prismaClient.startup.delete({
      where:{
        id: findCustomer.id
      }
    })
    
    return { message: "Deletado com sucesso!"}
    
  }
}

export { DeleteCustomerService }