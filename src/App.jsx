import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import car from '../src/assets/car.jpg';
import logo from '../src/assets/logo4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendar, faCar} from '@fortawesome/free-solid-svg-icons';
import './App.css'

function App() {


  return (
    <>
      <div className="">
        <section>
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
                    
                    <select name="" id="">
                      <option value="">Selecione a marca do veículo</option>
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
        <section>

        </section>
      </div>
    </>
  )
}

export default App;
