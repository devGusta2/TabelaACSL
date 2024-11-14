import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import car from '../src/assets/car.jpg';
import logo from '../src/assets/logo4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendar, faCar} from '@fortawesome/free-solid-svg-icons';
import './App.css'
import axios from 'axios';




function App() {
  const [marcas, setMarcas] = useState([]);

  // Função para buscar marcas da API
  // Função para buscar marcas da API
const fetchMarcas = async () => {
  const options = {
    method: 'GET',
    url: 'https://5453-187-48-118-33.ngrok-free.app/core/brand/model/list/porsche',
    headers: {
      'User-Agent': 'insomnia/10.1.1',
      Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);  // Verifique a estrutura da resposta aqui
    setMarcas(response.data.data);  // Ajuste aqui conforme a estrutura real
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
};

useEffect(() => {
  fetchMarcas();
}, []);

  return (
    <>
      <div className="">
        <section id="inicio">
          <header>
              <nav>
                <div className='logo_box'>
                  <img src={logo} alt=""/>
                  {/* <h3>Classic car price</h3> */}
                </div>
                <ul>
                  <li><a href="">Início</a></li>
                  <li><a href="">Depreciação</a></li>
                  <li><a href="#consulta">Consultar</a></li>
                  <li><a href="">Listar</a></li>
                </ul>
              </nav>
            </header>

            <div className='content_sc1'>
              <div className='img_background'>
                  <img src={car} alt="" />
              </div>
              <div className='bottom_row'>
                <div className="col_bottom">
                  <h1>Revelando o verdadeiro valor de cada máquina</h1>
                  <br></br>
                  <p>uma plataforma de precificação precisa e exclusiva para carros de luxo, esportivos e colecionáveis."</p>
                </div>
                
                <div className="col_bottom">
             
                  <button id='btn_consulta'>
                    <h2>Consultar</h2>
                  </button>
                </div>
              </div>
            </div>
        </section>
          
        <section id="consulta">
          <div className="col_consulta">
            <h1>Consulta de carros</h1>
            <br></br>
            <p>Sua pesquisa será realizada de acordo com o seguinte mês e ano de referência.</p>
            
            <br></br>
            <p>Informe primeiro a marca do veículo e depois o modelo e o ano modelo na ordem que desejar. Você também pode digitar a informação no campo "busca", dentro de cada opção do formulário da pesquisa.</p>
          </div>
          <div className="col_consulta">
            <div className="form_box">
              <h2>Pesquisa Comum</h2>
              <form action="">
                <div className="inpts_box">
                    <div className='label_and_icon'>
                      <FontAwesomeIcon icon={faCrown} size='2x'/>
                      <h3>Marca:</h3>
                    </div>
                    
                    <select name="marca" id="marca">
                      <option value="">Selecione a marca do veículo</option>
                      {marcas.map((marca, index) => (
                        <option key={index}value={marca.brand}>{marca.brand}</option>
                      ))}
                    </select>
                    <div className='label_and_icon'>
                      <FontAwesomeIcon icon={faCalendar} size='2x'/>
                      <h3>Modelo:</h3>
                    </div>
                    <select name="" id="">
                      <option value="">Selecione o modelo do veículo</option>
                    </select>
                    <div className='label_and_icon'>
                      <FontAwesomeIcon icon={faCar} size='2x'/>
                      <h3>Ano:</h3>
                    </div>
                    <select name="" id="">
                      <option value="">Selecione o ano do veículo</option>
                    </select>
                </div>
                  <button type='submit'>
                      <h3>Pesquisar</h3>
                  </button>
              </form>
            </div>
          </div>
        </section>
        <section id="graphic">
          <div className="row_graphic">
            <div className="desc_graphic">
              <h1>Gŕafico</h1>
                <p>
                  Nesta seção, você encontrará uma análise detalhada 
                  da depreciação de ativos ao longo do tempo. À esquerda,
                  são apresentados os principais valores e períodos, 
                  enquanto à direita um gráfico interativo exibe a evolução
                  da depreciação, facilitando a visualização da redução do
                  valor dos ativos.
                </p>
            </div>
          </div>
          <div className="row_graphic">
            <div className="graphic_box">

            </div>
            <div className="col_infos">
              <div className="row_info">
                <FontAwesomeIcon icon={faCrown} size='2x' className='icon_font' />
                <h3>Marca:</h3>
              </div>
              <div className="row_info">
                <FontAwesomeIcon icon={faCar} size='2x' className='icon_font' />
                <h3>Modelo:</h3>
              </div>
              <div className="row_info">
                <FontAwesomeIcon icon={faCalendar} size='2x' className='icon_font'/>
                <h3>Ano:</h3>
              </div>
              <button id='btn_nova'>
                <h2>Nova busca</h2>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App;
