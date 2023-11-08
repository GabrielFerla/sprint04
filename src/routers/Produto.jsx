import {useState} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup  from 'yup'

function Produto(){

    const schema = yup.object({
    nome:yup.string().required("Campo nome Obrigatório"),
    email:yup.string().email("Digite um email Válido")
    .required("Campo email obrigatório"),
    cpf:yup.string().min(11,'CPF deve conter 11 digitos')
    .required("Campo cpf Obrigatório")
   })
   .required();

   const {register,handleSubmit,formState:{errors},setValue,setFocus}
   =useForm({
    resolver:yupResolver(schema)
   })
   const [listaClientes, setListaClientes]=useState([]);

   function inserirCLientes(cliente){
    setListaClientes([...listaClientes, cliente])
   }

   function buscarCep(e){
    //regex- expressão regular- formatação
    const cep = e.target.value.replace(/\D/g,'')
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res)=> res.json())
    .then((data)=> {
      setValue('rua', data.logradouro);
      setValue('bairro',data.bairro);
      setValue('estado',data.uf)
      setValue('cidade',data.localidade);
      setFocus('numero');
      
    })

   }


  return(
    <>
    <form onSubmit={handleSubmit(inserirCLientes)}>
      <fieldset>
        <legend>Dados Pessoais:</legend>:
        <label>
          Nome:
          <input type="text" {...register('nome')}/>
          <span>{errors.nome?.message}</span>
        </label>

        <label>
          Email:
          <input type="text" {...register('email')}/>
          <span>{errors.email?.message}</span>
        </label>

        <label>
          Cpf:
          <input type="text" {...register('cpf')}/>
          <span>{errors.cpf?.message}</span>
        </label>
    
      </fieldset>
      <fieldset>
        <legend>Dados Endereço:</legend>
        <label>
          Cep:
          <input type="text" {...register('cep')} onBlur={buscarCep} />
        </label>
        <label>
          Rua:
          <input type="text" {...register('rua')}/>
        </label>

        <label>
          Numero:
          <input type="text" {...register('numero')}/>
        </label>
        <label>
          Bairro:
          <input type="text" {...register('bairro')}/>
        </label>
        <label>
          Cidade:
          <input type="text" {...register('cidade')}/>
        </label>
        <button type="submit">Cadastrar</button>
        <button type="reset">limpar</button>
      </fieldset>
    </form>
    <div>
      {listaClientes.map((cli,index)=>(
          <div  key={index}>    
          <p>Nome:{cli.nome}</p>
          <p>Email:{cli.email}</p>
          <p>CPF:{cli.cpf}</p>
          <p>Rua:{cli.rua}</p>
          <p>Bairro:{cli.bairro}</p>
          <p>Cidade:{cli.cidade}</p>
        </div>
       
      ))}
    </div>
    </>
  )
}
export default Produto