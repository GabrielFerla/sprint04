import {useState} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup  from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';


function Produto(){

    const schema = yup.object({
    nome:yup.string().required("Campo nome Obrigatório"),
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
    <form onSubmit={handleSubmit(inserirCLientes)} >
      <fieldset className='ms-3'>
        <legend>Cadastro de Produto</legend>
        <Row className='pt-3'>
          <Col>
            <Form.Group>
              <Form.Label>Digite o nome do produto</Form.Label>
              <Form.Control {...register('nome')} type="text" 
                            placeholder="Digite o nome do produto" />       
            </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Digite o valor do produto</Form.Label>
            <Form.Control {...register('valor')} type="text" 
                          placeholder="Digite o valor do produto" />       
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Digite a marca do produto</Form.Label>
            <Form.Control {...register('marca')} type="text" 
                          placeholder="Digite a marca do produto" />       
          </Form.Group>
        </Col>
        </Row>
        <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Digite a descrisção</Form.Label>
          <Form.Control {...register('descriscao')} as="textarea" placeholder="Digite a descrisção" rows={2
          } />
      </Form.Group>
       
      </fieldset>
      <fieldset className='ms-3'>
      <legend>Dados Do Comprador:</legend>
        <Row className='pt-3'>

        <Col>
          <Form.Group className="mt-3">
            <Form.Label>CEP: </Form.Label>
            <Form.Control {...register('cep')} onBlur={buscarCep} type="text" placeholder="Digite o cep"/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label>Rua: </Form.Label>
            <Form.Control {...register('rua')} type="text" placeholder="Digite o cep"/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label>Numero: </Form.Label>
            <Form.Control {...register('numero')} type="text" placeholder="Digite o numero"/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label>Bairro: </Form.Label>
            <Form.Control {...register('bairro')} type="text" placeholder="Digite o bairro"/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label>Cidade: </Form.Label>
            <Form.Control {...register('cidade')} type="text" placeholder="Digite a cidade"/>
          </Form.Group>
        </Col>

        </Row>
        <Row>
          <Col className='my-3'>
            <Button size="sm" variant="success" type="submit" className='mx-3' >Cadastrar</Button>
            <Button size="sm" variant="success" type="reset">limpar</Button>
          </Col>
        </Row>
      </fieldset>
    </form>
    <div className='mb-3 mx-3'>
      {listaClientes.map((cli,index)=>(
        <>
            <ListGroup as="ol" className='my-3'>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Nome</div>
                  {cli.nome}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Descrisção</div>
                  {cli.descriscao}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Valor</div>
                  R$ : {cli.valor}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Marca</div>
                  {cli.marca}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Rua </div>
                  {cli.rua}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Bairro</div>
                  {cli.bairro}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Cidade</div>
                  {cli.cidade}
                </div>
              </ListGroup.Item>
              </ListGroup>
              </>
      ))}
    </div>
    </>
  )
}
export default Produto