import './App.css';
import { useState, useEffect } from 'react';
import car from '../src/assets/revuelto-porquinho-da-india.png';
import logo from '../src/assets/logo-pink-alt.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import carDefinition from '../src/assets/carDefinition.png'
import handShakeImg from '../src/assets/handshake.jpg'
import {
  faCrown,
  faCalendarDays,
  faCar,
  faChartLine,
  faChartBar, faFileAlt, faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const host_django = import.meta.env.VITE_API_URL_DJANGO;

function App() {
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [ano, setAno] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [cod_modelo, setCod_modelo] = useState('');
  const [dados, setInfo] = useState({
    reference_year: '',
    reference_month: '',
    code_model: '',
    year_model: '',
    brand: '',
    model: '',
    average_price: ''
  });

  // Função chamada ao selecionar uma marca

  const handleChange = (event) => {
    const marca = event.target.value;
    setMarcaSelecionada(marca);

    // Se a marca for a opção padrão (valor vazio), limpa o estado dos modelos
    if (marca === "") {
      setModelo([]); // Limpa a lista de modelos
      setModeloSelecionado(""); // Reseta o modelo selecionado
      setAno([]);
    }
  };
  //Função ao selecionar um modelo
  const handleChangeModel = (event) => {
    const modelo = event.target.value;
    setModeloSelecionado(modelo);
    setAno([]); // Limpa a lista de anos sempre que o modelo for alterado
    setAnoSelecionado(''); // Reseta o ano selecionado
  };



  const handleSelectChange = (event) => {
    const [year_model, code_model] = event.target.value.split("-");
    setAnoSelecionado(year_model);
    setCod_modelo(code_model);
    //console.log("Ano:", year_model);
    //console.log("Código do Modelo:", code_model);
  };

  const fetchMarcas = async () => {
    try {
      const response = await axios.get(`${host_django}/crawler/brand/model/list/machine/`, {
        params: {
          page: 1,
          page_size: 99
        },
        headers: {
          'User-Agent': 'insomnia/10.1.1',
          'ngrok-skip-browser-warning': '69420',
        }
      });
      setMarcas(response.data.content.data);
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
    }
  };

  const fetchModelo = async () => {
    try {
      const response = await axios.get(`${host_django}/crawler/brand/model/list/machine/`, {
        params: {
          brand: marcaSelecionada,
          page: 1,
          page_size: 99
        },
        headers: {
          'User-Agent': 'insomnia/10.1.1',
          'ngrok-skip-browser-warning': '69420',
        }
      });

      setModelo(response.data.content.data);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const fetchAnos = async () => {
    try {
      const response = await axios.get(`${host_django}/crawler/brand/model/list/machine/`, {
        params: {
          brand: marcaSelecionada,
          model: modeloSelecionado,
          page: 1,
          page_size: 99
        },
        headers: {
          'User-Agent': 'insomnia/10.1.1',
          'ngrok-skip-browser-warning': '69420',
        }
      });

      setAno(response.data.content.data);
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }
  };




  const calcular = async () => {
    try {
      const response = await axios.get(`${host_django}/crawler/average_prices/machine/${cod_modelo}/`, {
        params: {
          year_model: anoSelecionado,
          is_active: true,
          page: 1,
          page_size: 10
        },
        headers: {
          'User-Agent': 'insomnia/10.1.1',
          'ngrok-skip-browser-warning': '69420',
        }
      });

      // Pegando o primeiro item dentro de "content.monthly_averages"
      const data = response.data.content.monthly_averages[0];

      setInfo({
        reference_year: data.reference_year,
        reference_month: data.reference_month,
        code_model: data.code_model,
        year_model: data.year_model,
        brand: marcaSelecionada,
        model: modeloSelecionado,
        average_price: data.average_price
      });

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };



  // Efeito para buscar marcas ao carregar o componente
  useEffect(() => {

    fetchMarcas();
  }, []);

  useEffect(() => {
    if (marcaSelecionada) {
      fetchModelo();
    }
  }, [marcaSelecionada]);

  useEffect(() => {
    if (modeloSelecionado) {
      fetchAnos();
    }
  }, [modeloSelecionado]);

  // Estado para armazenar os registros
  // Substitua pelo seu ID da tarefa




  return (
    <>
      <div className="">
        {/* Início */}
        <section id="inicio">
          <header>
            <nav >
              <div className='logo_box'>
                <img src={logo} alt="" />
              </div>

              <ul style={{ listStyle: 'none' }}>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#consulta">Consultar</a></li>
                <li><a href="#Produto">Sobre o Produto</a></li>
                <li><a href="#secttion-drive-intel-aplications">Púbico Alvo e Aplicações</a></li>
                <li><Link to='/pages/cadastro'>Autenticação</Link></li>
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
                <br />
                <p>Plataforma de inteligência de mercado automotivo, focada em precificação de veículos para empresas do setor.</p>
              </div>

              <div className="col_bottom">
                <a href='#consulta' id='btn_consulta'>
                  <h2>Consultar</h2>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Secção de consulta*/}
        <section id="consulta">
          <div className="col_consulta">
            <div className="form_box">
              <h2>Pesquisa Comum</h2>
              <form id="first_form">
                <div className="inpts_box">
                  <div className='label_and_icon'>
                    <FontAwesomeIcon icon={faCrown} size='2x' />
                    <h3>Marca:</h3>
                  </div>
                  <select name="marca" id="marca" onChange={handleChange}>
                    <option value="">Selecione a marca do veículo</option>
                    {marcas.map((marca, index) => (
                      <option key={index} value={marca.brand}>
                        {marca.brand}
                      </option>
                    ))}
                  </select>
                  <div className='label_and_icon'>
                    <FontAwesomeIcon icon={faCar} size='2x' />
                    <h3>Modelo:</h3>
                  </div>
                  <select name="marca" id="marca" onChange={handleChangeModel}>
                    <option value="">Selecione o modelo do veículo</option>
                    {modelo.map((modelo, index) => (
                      <option key={index} value={modelo.model}>
                        {modelo.model}
                      </option>
                    ))}
                  </select>
                  <div className='label_and_icon'>
                    <FontAwesomeIcon icon={faCalendarDays} size='2x' />
                    <h3>Ano:</h3>
                  </div>
                  <select name="marca" id="marca" onChange={handleSelectChange}>
                    <option value="">Selecione o modelo do veículo</option>
                    {ano.map((ano, index) => (
                      <option key={index} value={`${ano.year_model}-${ano.code_model}`}>
                        {ano.year_model}
                      </option>
                    ))}
                  </select>
                </div>
                <div onClick={calcular} className='bnt_form'>
                  <h3>Pesquisar</h3>
                </div>
              </form>
            </div>
          </div>
          <div className="col_consulta">
            <div className="desc_col_consult">
              <h1>Consulta de carros</h1>
              <p>Obtenha a média de mercado de veículos com base em dados atualizados. Selecione a marca, o
                modelo e o ano do veículo para acessar informações precisas sobre os preços praticados, auxiliando na sua análise e tomada de decisão.</p>
            </div>
            <div className="table_box">
              <div className='celula'><h3>Ano de referência:</h3></div>
              <div className='celula'>{dados.reference_year}</div>
              <div className='celula'><h3>Mês de referência:</h3></div>
              <div className='celula'>{dados.reference_month}</div>
              <div className='celula'><h3>Código modelo:</h3></div>
              <div className='celula'>{dados.code_model}</div>
              <div className='celula'><h3>Ano modelo:</h3></div>
              <div className='celula'>{dados.year_model}</div>
              <div className='celula'><h3>Marca:</h3></div>
              <div className='celula'>{dados.brand}</div>
              <div className='celula'><h3>Modelo:</h3></div>
              <div className='celula'>{dados.model}</div>
              <div className='celula'><h3>Média de mercado:</h3></div>
              <div className='celula'>R$ {dados.average_price}</div>
            </div>
          </div>
        </section>
        {/* Secção sobre */}
        <section id="Produto">
          <div id='info-about'>
            <div id="about-img-box">
              <div id="col-title-desc">
                <span>Sobre o produto</span>
                <span>
                  O DriveIntel é uma plataforma especializada em análise de dados do mercado automotivo.
                  Nosso foco é transformar informações em inteligência acionável, auxiliando equipes na tomada de
                  decisões estratégicas com mais precisão e confiança. Com insights aprofundados, relatórios detalhados
                  e visualizações claras, ajudamos a antecipar tendências, otimizar precificação e fortalecer estratégias
                  de mercado.
                </span>
              </div>
              <img src={logo} alt="" className="logo-about" />
            </div>
            <div id="about-cards-box">
              <div className="card-about">
                <div className='icon-title'>

                  <FontAwesomeIcon icon={faChartLine} style={{ fontSize: 'clamp(16px, 3vw, 50px)' }} />
                  <h3>Informação Inteligente</h3>
                </div>
                <span>
                  Tenha acesso a dados estratégicos sobre o mercado automotivo. Nossa plataforma analisa milhares de
                  anúncios para fornecer insights precisos sobre a valorização e depreciação de veículos, ajudando sua
                  empresa a tomar decisões mais assertivas.
                </span>
              </div>
              <div className="card-about">
                <div className='icon-title'>

                  <FontAwesomeIcon icon={faDollarSign} style={{ fontSize: 'clamp(16px, 3vw, 50px)' }} />
                  <h3>Sugestões de Preços</h3>
                </div>
                <span>
                  Nossa inteligência artificial analisa dados reais de mercado para sugerir um valor competitivo de
                  anúncio. Evite prejuízos ao comprar ou vender com base em precificação confiável e atualizada.
                </span>
              </div>
              <div className="card-about">
                <div className='icon-title'>

                  <FontAwesomeIcon icon={faChartBar} style={{ fontSize: 'clamp(16px, 3vw, 50px)' }} />
                  <h3>Visualização de Dados</h3>
                </div>
                <span>
                  Acompanhe o comportamento do mercado por meio de gráficos claros e objetivos. Nossa plataforma
                  transforma grandes volumes de dados em visualizações simples, permitindo uma análise rápida das
                  tendências de preços e variações do mercado automotivo.
                </span>
              </div>
              <div className="card-about">
                <div className='icon-title'>

                  <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: 'clamp(16px, 3vw, 50px)' }} />
                  <h3>Geração de Relatórios</h3>
                </div>
                <span>
                  Receba relatórios completos e detalhados sobre o mercado de veículos. Nossa plataforma processa
                  grandes volumes de dados para entregar informações precisas, facilitando sua análise e otimizando
                  suas estratégias de precificação.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id='secttion-drive-intel-aplications'>
          <div className="row-aplications-driveintel">
            <div className="img-box-aplications">
              <img src={handShakeImg} alt="" className='img-aplications' />
            </div>
            <div className="text-aplications-box">
              <h1>Para quem o DriveIntel é relevante ?</h1>
              <span>
                O DriveIntel ajuda lojistas,
                concessionárias, gestores de frotas,
                empresas de aluguel, investidores,
                instituições financeiras e leiloeiros
                a tomar decisões estratégicas, como
                definir preços, prever variações de
                mercado, calcular ...
              </span>
              <Link className='aplications-btn' to='/pages/Description/Description-1'><h2>Ler mais</h2></Link>

            </div>
          </div>
          <div className="row-aplications-driveintel">
            <div className="img-box-aplications">
              <img src={carDefinition} alt="" className='img-aplications' />
            </div>
            <div className="text-aplications-box">
              <h1>Definição do DriveIntel</h1>
              <span>
                O DriveIntel é uma ferramenta de inteligência de
                mercado para precificação automotiva, desenvolvida
                para apoiar negócios do setor na tomada de decisão
                estratégica de preços. Ele coleta e analisa dados
                históricos e atuais de anúncios de veículos por
                meio de web scraping (RPA) ...
              </span>
              <Link className='aplications-btn' to='/pages/Description/Description-2'><h2>Ler mais</h2></Link>
            </div>
          </div>
        </section>
        <footer id="footer">
          <div className="footer-content">
            <p>&copy; 2025 DriveIntel. Todos direitos são reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
