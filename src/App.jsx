import './App.css';
import { useState, useEffect } from 'react';
import car from '../src/assets/pink-car.png';
import logo from '../src/assets/logo-pink-alt.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCrown, faCalendarDays, faCar, faFile, faHand, faBuilding, faChartSimple, faBook, faChartLine } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import crawlerImg from './assets/api_crawler.png'
import relatorio from './assets/final_report.png'


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
            <nav>
              <div className='logo_box'>
                <img src={logo} alt="" />
              </div>

              <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#consulta">Consultar</a></li>
                <li><a href="#Produto">Sobre o Produto</a></li>
                <li><a href="#Clientes">Clientes</a></li>
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
              <p>Sua pesquisa será realizada de acordo com o seguinte mês e ano de referência.</p>
              <p>Informe primeiro a marca do veículo e depois o modelo e o ano modelo na ordem que desejar.</p>
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
                  Nesta seção será possível conhecer um pouco mais sobre o produto que está sendo ofertado, suas
                  funcionalidades,
                  entender o problema que a aplicação se propõe a resolver. E apresentar os benefícios de se tornar um de
                  nossos clientes.
                </span>
              </div>
              <img src={crawlerImg} alt="" />
            </div>
            <div id="about-cards-box">
              <div className="card-about">
                <div className='icon-title'>
                  <h3>Fácil de usar</h3>
                  <FontAwesomeIcon icon={faHand} style={{ fontSize: 'clamp(16px, 3vw, 32px)' }} />
                </div>
                <span>
                  A API é projetada para ser consumida por desenvolvedores de todos os
                  níveis. Além da documentação, incluímos endpoints consistentes e intuitivos, padrões de resposta
                  padronizados em JSON (simplificando a integração e o consumo dos dados), suporte para paginação, filtros
                  avançados e ordenação para lidar com grandes volumes de dados.
                </span>
              </div>
              <div className="card-about">
                <div className='icon-title'>
                  <h3>Arquitetura Restful</h3>
                  <FontAwesomeIcon icon={faBuilding} style={{ fontSize: 'clamp(16px, 3vw, 32px)' }} />
                </div>
                <span>
                  A API segue rigorosamente os
                  princípios REST, permitindo operações
                  como criação, leitura, atualização e
                  exclusão (CRUD) em recursos específicos.
                </span>
              </div>
              <div className="card-about">
                <div className='icon-title'>
                  <h3>Desempenho e escalabilidade</h3>
                  <FontAwesomeIcon icon={faChartSimple} style={{ fontSize: 'clamp(16px, 3vw, 32px)' }} />
                </div>
                <span>
                  Capacidade de lidar com requisições
                  simultâneas de alta carga. Uso de
                  cache em pontos estratégicos para
                  garantir respostas rápidas.
                </span>
              </div>
              <div className="card-about">
                <div className='icon-title'>
                  <h3>API e Documentação Interativa</h3>
                  <FontAwesomeIcon icon={faBook} style={{ fontSize: 'clamp(16px, 3vw, 32px)' }} />
                </div>
                <span>
                  Disponibilizamos uma documentação interativa baseada em
                  OpenAPI/Swagger, com exemplos detalhados de requisições e respostas para cada endpoint. Explicação clara
                  dos parâmetros de entrada, campos obrigatórios e possíveis códigos de erro.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="section-relatorio">
          <div id='col-cards-relatorio'>
            <div className="card-relatorio">
              <div className="icon-title-card-relatorio">
                <FontAwesomeIcon icon={faFile} style={{ fontSize: 'clamp(16px, 3.5vw, 100px)' }} />
                <h4>Geração de relatórios</h4>
              </div>
              <div className='text-box-relatorio'>
                <span>
                  Nosso software permite a criação de
                  relatórios detalhados, oferecendo uma
                  visão consolidada dos dados coletados.
                  Esses relatórios são projetados para atender
                  às necessidades estratégicas de empresas e
                  analistas, fornecendo um resumo claro e acionável.
                  Além disso, eles incluem informações organizadas
                  e interpretadas, facilitando o entendimento e a
                  tomada de decisão com base em dados reais.</span>
              </div>
            </div>
            <div className="card-relatorio">
              <div className="icon-title-card-relatorio">
                <FontAwesomeIcon icon={faChartSimple} style={{ fontSize: 'clamp(16px, 3.5vw, 100px)' }} />
                <h4>Visualização Gráfica</h4>
              </div>
              <div className='text-box-relatorio'>
                <span>
                  A geração de gráficos é focada em representar
                  visualmente os dados consolidados do mercado
                  automotivo de forma clara e objetiva. Os gráficos
                  presentes nos relatórios finais destacam informações
                  essenciais para gerentes de vendas e analistas
                  de dados do ramo de precificação de veículos.
                </span>
              </div>
            </div>
            <div className="card-relatorio">
              <div className="icon-title-card-relatorio">
                <FontAwesomeIcon icon={faChartLine} style={{ fontSize: 'clamp(16px, 3.5vw, 100px)' }} />
                <h4>Insights de Resultados</h4>
              </div>
              <div className='text-box-relatorio'>
                <span>
                  A geração de insights é baseada na análise
                  aprofundada dos dados coletados, transformando
                  informações brutas em conhecimentos estratégicos
                  para o mercado automotivo. Os relatórios finais
                  destacam padrões de comportamento, tendências de
                  preços, oportunidades de negociação e variações
                  significativas entre diferentes modelos, marcas,
                  regiões e períodos.
                </span>
              </div>

            </div>
          </div>
          <div id="img-relatorio-box">
            <span>Relatório de Insights</span>
            <img src={relatorio} alt="" />
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
