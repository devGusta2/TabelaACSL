import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import car from '../src/assets/carrao.png';
import logo from '../src/assets/logo4.png';
import api_crawler from '../src/assets/api_crawler.png';
import final_report from '../src/assets/final_report.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCrown, faCalendarDays, faCar, faDownload, faFile, faList, faHand, faBuilding, faChartSimple, faBook, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios';
import crawlerImg from './assets/api_crawler.png'
import relatorio from './assets/final_report.png'

const host_crawler = import.meta.env.VITE_API_URL_CRAWLER;
const token_crawler = import.meta.env.VITE_TOKEN_CRAWLER;
const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const containerHeight = 400; // Altura da div do gráfico em pixels

  // Função para formatar os números (1000 -> 1k, 1000000 -> 1M)
  const formatValue = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  };

  return (
    <div className="chart-container">
      <div className="y-axis">
        {/* Ajustando a escala para exibir de 0 a maxValue de baixo para cima */}
        {[0, 0.25, 0.5, 0.75, 1].map((percentage) => (
          <div key={percentage} className="y-axis-label">
            {formatValue(maxValue * (1 - percentage))} {/* Corrigido */}
          </div>
        ))}
      </div>
      <div className="bars-container">
        {data.map((item, index) => (
          <div key={index} className="bar">
            <div
              className="bar-fill"
              style={{
                height: `${(item.value / maxValue) * containerHeight}px`,
              }}
            ></div>
            <div className="label">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


function App() {

  const graphic = async () => {
    const options = {
      method: 'GET',
      url: 'http://0.0.0.0:8087/calcs/average/annual/porsche',
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${token_crawler}`
      }
    };

    try {
      const response = await axios.request(options);
      const items = response.data.items;
      const top10Items = items.slice(0, 10); // Pega os 10 primeiros itens

      // Extraindo os valores desejados (annual_average e code_model) de cada item
      const result = top10Items.map(item => ({
        annual_average: item.annual_average,
        code_model: item.code_model
      }));

      //console.log(result); // Exibe os valores desejados para os 10 itens

      // Atualizando as barras com os dados coletados
      updateBars(result); // Passa os 10 itens para a função updateBars

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  const updateBars = (items) => {
    const newData = items.map((item) => ({
      name: item.code_model, // Nome da barra com o code_model
      value: item.annual_average, // O valor da barra será o annual_average
    }));

    setData(newData); // Atualiza os dados
  };

  const [data, setData] = useState([]);


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

  const fetchModelo = async () => {
    const options = {
      method: 'GET',
      url: `${host_crawler}/core/brand/model/list/machine?brand=${marcaSelecionada}&page=1&page_size=10`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token_crawler}`
      }
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      setModelo(response.data.data);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };




  const fetchAnos = async () => {
    const options = {
      method: 'GET',
      url: `${host_crawler}/core/brand/model/list/machine?brand=${marcaSelecionada}&model=${modeloSelecionado}&page=1&page_size=10`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token_crawler}`
      }
    };

    try {
      const response = await axios.request(options);
      //(response.data);
      setAno(response.data.data)

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  // Função para buscar marcas da API
  const fetchMarcas = async () => {
    const options = {
      method: 'GET',
      url: `${host_crawler}/core/brand/model/list/machine`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token_crawler}`
      }
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      setMarcas(response.data.data);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };



  const calcular = async () => {
    const options = {
      method: 'GET',
      url: `${host_crawler}/calcs/average/month/machine?year_model=${anoSelecionado}&code_model=${cod_modelo}&page=1&size=10`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token_crawler}`
      }
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);

      // Ajuste aqui com base na estrutura da API
      // ou response.data.result

      setInfo({
        reference_year: response.data.monthly_averages[0].reference_year,
        reference_month: response.data.monthly_averages[0].reference_month,
        code_model: response.data.monthly_averages[0].code_model,
        year_model: response.data.monthly_averages[0].year_model,
        brand: marcaSelecionada,
        model: modeloSelecionado,
        average_price: response.data.monthly_averages[0].average_price
      });


    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };





  // Efeito para buscar marcas ao carregar o componente
  useEffect(() => {
    graphic();
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



  //parte dos dados da parte de listagem




















  const [listagemData, setListagemData] = useState({ marca: '', qnt_anunc: 1, num_page: 1 });

  const [taskStatus, setTaskStatus] = useState('Não iniciado');
  const [taskId, setTaskId] = useState(null);


  const [records, setRecords] = useState([]);  // Estado para armazenar os registros
  const task_id = "coloque_seu_task_id_aqui";  // Substitua pelo seu ID da tarefa



  // Função para atualizar os dados de listagem
  const handleChangeList = (e) => {
    const { name, value } = e.target;
    setListagemData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Função de listagem
  const listar = async (event) => {
    event.preventDefault();
    const { marca, qnt_anunc, num_page } = listagemData;

    if (!marca || !qnt_anunc || !num_page) {
      alert('Preencha todos os campos antes de listar.');
      return;
    }

    const url = `${host_crawler}/records/list/task/machine?page=${num_page}&page_size=${qnt_anunc}`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
         Authorization: `Bearer ${token_crawler}`
      },
      data: {
        reference_dates: [
          {
            reference_year: 2025, // Isso tem que ser uma variável
            reference_month: 1  // é possível passar uma lista de dicts reference dates
          }
        ]
      }
    };

    try {
      const response = await axios.request(options);
      //console.log('Dados da resposta da listagem:', response.data);

      const newTaskId = response.data.task_id || null; // Ajuste conforme a estrutura da resposta
      setTaskId(newTaskId);

      if (newTaskId) {
        checkTaskStatus(newTaskId);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição de listagem:', error);
    }
  };


  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const checkTaskStatus = async (task_id) => {
    // Se a tarefa já estiver completa, não continuar a verificação
    if (isTaskComplete) return;

    const url = `${host_crawler}/core/tasks/status/${task_id}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token_crawler}`
      },
    };

    try {
      const response = await axios.request(options);
      const status = response.data.status;
      //console.log(response.data);
      setTaskStatus(status);

      if (status === 'SUCCESS') {
        setRecords(response.data.result.records);  // Atualiza os registros
        setIsTaskComplete(true); // Marca a tarefa como completa

        return; // Interrompe a execução
      }

      // Se o status não for "READY" nem "SUCCESS", continua verificando após 3 segundos
      if (status !== 'READY') {
        setTimeout(() => checkTaskStatus(task_id), 3000);
      }

    } catch (error) {
      console.error('Erro ao buscar o status da tarefa:', error);
    }
  };

  // useEffect para iniciar a verificação do status da tarefa assim que o componente for montado
  useEffect(() => {
    checkTaskStatus(task_id);
  }, [task_id]);  // O useEffect é chamado apenas quando o task_id mudar




  const downloadExcel = async () => {
    const options = {
      method: 'GET',
      url: `http://0.0.0.0:8087/core/download/excel/${taskId}/machine`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
       Authorization: `Bearer ${token_crawler}`
      },
      responseType: 'blob', // Define o tipo de resposta como blob
    };

    try {
      const response = await axios.request(options);

      // Cria um link para o download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'planilha.xlsx'); // Nome do arquivo
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };


  return (
    <>
      <div className="">
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
                <li><Link to='/adm'>Admin</Link></li>
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
                <p>Uma plataforma de precificação precisa e exclusiva para carros.</p>
              </div>

              <div className="col_bottom">
                <a href='#consulta' id='btn_consulta'>
                  <h2>Consultar</h2>
                </a>
              </div>
            </div>
          </div>
        </section>

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
        <section id="section-about">

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
        {/* <section id="about">
          <div className="col_consulta">
            <div className="about_product">
              <h1>Sobre o Produto</h1>
              <br/>
              <p id="about">
                Nesta seção será possível conhecer um pouco mais sobre o produto que está sendo ofertado, suas
                funcionalidades,
                entender o problema que a aplicação se propõe a resolver. E apresentar os benefícios de se tornar um de
                nossos clientes.
              </p>
              <h2 style={{color: 'black'}}>FUNCIONALIDADE: Disponibilizamos serviços de API</h2>
              <p>
                Nossa API foi projetada para ser uma solução RESTful robusta, de fácil uso e altamente documentada,
                permitindo que consumidores integrem suas aplicações de maneira eficiente e segura. Ideal para
                automação,
                análise de dados e integração com sistemas de terceiros.
              </p>

              <h3>Principais Características</h3>
              <p>
                <strong>Arquitetura RESTful:</strong> A API segue rigorosamente os princípios REST, permitindo operações
                como criação, leitura, atualização e exclusão (CRUD) em recursos específicos.
              </p>
              <p>
                <strong>Desempenho e Escalabilidade:</strong> Capacidade de lidar com requisições simultâneas de alta
                carga. Uso de cache em pontos estratégicos para garantir respostas rápidas.
              </p>
              <p>
                <strong>Fácil de Usar:</strong> A API é projetada para ser consumida por desenvolvedores de todos os
                níveis. Além da documentação, incluímos endpoints consistentes e intuitivos, padrões de resposta
                padronizados em JSON (simplificando a integração e o consumo dos dados), suporte para paginação, filtros
                avançados e ordenação para lidar com grandes volumes de dados.
              </p>
              <p>
                <strong>Documentação Completa:</strong> Disponibilizamos uma documentação interativa baseada em
                OpenAPI/Swagger, com exemplos detalhados de requisições e respostas para cada endpoint. Explicação clara
                dos parâmetros de entrada, campos obrigatórios e possíveis códigos de erro.
              </p>

            </div>
          </div>

          <div className='content_sc1'>
            <div className='img_sec'>
              <img src={api_crawler} alt=""/>
            </div>
          </div>


          <div className="col_consulta">
            <div className="about_product">
              <div className="text-content">
                <h2 style={{color: 'black'}}>FUNCIONALIDADE: Geração de Relatórios</h2>
                <p>
                  Nossa API permite a <strong>criação de relatórios detalhados</strong>, oferecendo uma visão
                  consolidada
                  dos dados coletados.
                  Esses relatórios são projetados para atender às necessidades estratégicas de empresas e analistas,
                  fornecendo um resumo
                  claro e acionável. Além disso, eles incluem informações organizadas e interpretadas, facilitando o
                  entendimento e a tomada
                  de decisão com base em dados reais.
                </p>

                <h2 style={{color: 'black'}}>FUNCIONALIDADE: Visualização Gráfica</h2>
                <p>
                  Com a funcionalidade de <strong>visualização gráfica</strong>, os dados coletados pela nossa API são
                  transformados em gráficos
                  intuitivos e impactantes. Esses gráficos são ideais para apresentações, relatórios executivos ou para
                  análise visual de tendências
                  e padrões. A representação gráfica permite uma compreensão rápida, clara e eficiente de grandes
                  volumes
                  de
                  informações.
                </p>

                <h2 style={{color: 'black'}}>FUNCIONALIDADE: Insights Sobre os Resultados</h2>
                <p>
                  Nossa API vai além da simples coleta de dados, oferecendo <strong>insights estratégicos</strong> sobre
                  o
                  mercado. Esses insights
                  ajudam a identificar tendências emergentes, comportamentos de preços e oportunidades de negócio. É a
                  solução perfeita para empresas
                  que desejam se manter competitivas, tomando decisões embasadas em análises robustas e confiáveis.
                </p>
              </div>
            </div>
          </div>


          <div className='content_sc1'>
            <div className='img_sec'>
              <img src={final_report} alt=""/>
            </div>
          </div>

          <div className="col_consulta">
            <div className="about_product">
              <h1>Clientes</h1>
              <p>
                Nossos clientes podem se tornar parte do nosso ecossistema adquirindo nosso <strong>plano
                semestral</strong>. Este plano
                oferece <strong>acesso completo à API</strong> durante todo o período de vigência do contrato,
                garantindo
                uma experiência
                contínua e sem interrupções.
              </p>
              <p>
                Além disso, nossos clientes recebem <strong>relatórios mensais</strong> de forma automática. Esses
                relatórios são enviados
                diretamente para o email cadastrado no momento da assinatura do contrato, logo após cada rodada de
                automação.
              </p>
              <p>
                Durante o processo, <strong>gráficos detalhados são criados</strong>, <strong>insights estratégicos
                são
                gerados</strong>,
                e um <strong>estudo completo do mercado de veículos</strong> é elaborado. Assim que concluído, todo o
                material é entregue
                imediatamente para o cliente, proporcionando informações valiosas e atualizadas para tomada de
                decisão.
              </p>
            </div>
            </div>

        </section> */}


        {/* {records.length > 0 ? (
          <section id="Lista_sect">

            <div className="list_box">
              <h1>Lista de veículos</h1>


              <ul>
                {records.map((record, index) => (
                  <li key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                    <h3>{record.title}</h3>
                    <p><strong>Marca:</strong> {record.brand}</p>
                    <p><strong>Modelo:</strong> {record.model} ({record.year_model})</p>
                    <p><strong>Preço:</strong> R$ {record.price.toLocaleString()}</p>
                    <p><strong>Descrição:</strong> {record.description}</p>
                    <p><strong>URL:</strong> <a href={record.url} target="_blank" rel="noopener noreferrer">Ver
                      Detalhes</a></p>
                    <p><strong>Data de Criação:</strong> {new Date(record.created_at).toLocaleString()}</p>
                    <p><strong>Data de Atualização:</strong> {new Date(record.updated_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>

            </div>
          </section>
        ) : (
          <p>Nenhum registro encontrado.</p>
        )} */}
      </div>
    </>
  );
}

export default App;
