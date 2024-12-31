import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import car from '../src/assets/carrao.png';
import logo from '../src/assets/logo4.png';
import api_crawler from '../src/assets/api_crawler.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCrown, faCalendarDays, faCar, faDownload, faFile, faList} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios';


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
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
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
  const anoReferencia = 2024;


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
      url: `http://0.0.0.0:8087/core/brand/model/list/machine?brand=${marcaSelecionada}&page=1&page_size=10`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
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
      url: `http://0.0.0.0:8087/core/brand/model/list/machine?brand=${marcaSelecionada}&model=${modeloSelecionado}&page=1&page_size=10`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
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
      url: 'http://0.0.0.0:8087/core/brand/model/list/machine',
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
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
      url: `http://0.0.0.0:8087/calcs/average/month/machine?year_model=${anoSelecionado}&code_model=${cod_modelo}&year_reference=${anoReferencia}&page=1&size=10`,
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
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

  const url = `http://0.0.0.0:8087/core/records/list/task/machine?page=${num_page}&page_size=${qnt_anunc}`;
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'User-Agent': 'insomnia/10.1.1',
      Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
    },
  data: {
            reference_dates: [
                {
                    reference_year: 2024, // Isso tem que ser uma variável
                    reference_month: 12  // é possível passar uma lista de dicts reference dates
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

  const url = `http://0.0.0.0:8087/core/tasks/status/${task_id}`;
  const options = {
    method: 'GET',
    url: url,
    headers: {
      'User-Agent': 'insomnia/10.1.1',
      Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
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
      Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
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
                <img src={logo} alt=""/>
              </div>
              
              <ul>
                <li><a href="#inicio">Início</a></li>

                <li><a href="#consulta">Consultar</a></li>
                <li><a href="#Produto">Sobre o Produto</a></li>
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
                <p>Uma plataforma de precificação precisa e exclusiva para carros de luxo, esportivos e colecionáveis.</p>
              </div>

              <div className="col_bottom">
                <a href='#consulta'id='btn_consulta'>
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
                    <FontAwesomeIcon icon={faCrown} size='2x'/>
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
                    <FontAwesomeIcon icon={faCar} size='2x'/>
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
                    <FontAwesomeIcon icon={faCalendarDays} size='2x'/>
                    
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
                <div onClick={calcular} className='bnt_form' >
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


        <section id="listagem">
          <div className="desc_listagem">
            <h1>Sobre o Produto</h1>
            <br/>
            <p id="desc_l">
              Nesta seção será possível conhecer um pouco mais sobre o produto que está sendo ofertado, suas
              funcionalidades,
              entender o problema que a aplicação se propõe a resolver. E apresentar os benefícios de se tornar um de
              nossos clientes.
            </p>
            <h3 style={{color: 'red'}}>* Disponibilizamos download de .XLSX, contendo a base completa ou parcial!</h3>
            <h3 style={{color: 'red'}}>* Disponibilizamos serviços de API</h3>
            <h3 style={{color: 'red'}}>* Disponibilizamos Relatórios finais contendo a visualização gráfica dos dados
              obtidos</h3>
            <h3 style={{color: 'red'}}>* Disponibilizamos Relatórios finais contendo insights e um estudo completo sobre
              o
              mercado de precificação de veículos</h3>
          </div>

          <div className='content_sc1'>
            <div className='img_sec'>
              <img src={api_crawler} alt=""/>
            </div>
          </div>

        </section>

        {records.length > 0 ? (
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
                  <p><strong>URL:</strong> <a href={record.url} target="_blank" rel="noopener noreferrer">Ver Detalhes</a></p>
                  <p><strong>Data de Criação:</strong> {new Date(record.created_at).toLocaleString()}</p>
                  <p><strong>Data de Atualização:</strong> {new Date(record.updated_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          
        </div>
      </section>
      ) : (
        <p>Nenhum registro encontrado.</p>
      )}
      </div>
    </>
  );
}

export default App;
