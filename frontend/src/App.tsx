import { useEffect, useState, useRef, FormEvent } from 'react'
import { FiTrash } from 'react-icons/fi'
import { api } from './services/api'

interface CustomersProps{
  id: string;
  name: string;
  city: string;
  status: boolean;
  created_at: string;
}

export default function App(){

  const [customers, setCustomers] = useState<CustomersProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const cityRef = useRef<HTMLInputElement | null>(null)

  useEffect(() =>{
    loadCustormers();
  }, [])

  async function loadCustormers(){
    const response = await api.get("/customers")
    setCustomers(response.data);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!nameRef.current?.value || !cityRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      city: cityRef.current?.value 
    })

    console.log(response.data);

  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4x1 font-medium text-white">Startup</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input 
            type="text"
            placeholder="Digite o nome da startup..." 
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

         <label className="font-medium text-white">Cidade:</label>
          <input 
            type="text"
            placeholder="Digite a cidade de origem..." 
            className="w-full mb-5 p-2 rounded"
            ref={cityRef}
          />

          <input type="submit"
          value="Cadastrar" 
          className="cursor-pointer w-full p-2 bg-teal-500 rounded font-medium" />
        </form>

        <section className="flex flex-col gap-4">

        {customers.map ( (customer) =>(
          <article
          key={customer.id}
          className=" w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
          <p><span className="font-medium">Nome:</span>{customer.name} </p>
          <p><span className="font-medium">Cidade:</span>{customer.city}</p>
          <p><span className="font-medium">Status:</span>{customer.status ? "ATIVO" : "INATIVO"}</p>

           <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2">
            <FiTrash size={18} color="#FFF"/>
           </button>
          </article>
          ))}
        </section>
      </main>
    </div>
  )
}