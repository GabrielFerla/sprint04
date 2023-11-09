import {} from 'react';
import {FaFacebook} from "react-icons/fa6";
import {FaGithub} from "react-icons/fa6";

function Rodape() {
  return (
   
      <section className="rodape" className='ms-3'>
        <h3>@2023</h3>
        <FaFacebook className="redes" />
        <FaGithub className="redes"/>
      </section>
   
  );
}

export default Rodape;
