import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import car from '../src/assets/car.jpg';
import logo from '../src/assets/logo4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendarDays, faCar} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios';

function App() {
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
      url: `http://0.0.0.0:8087/core/brand/model/list/porsche?brand=${marcaSelecionada}&page=1&page_size=10`,
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
      url: `http://0.0.0.0:8087/core/brand/model/list/porsche?brand=${marcaSelecionada}&model=${modeloSelecionado}&page=1&page_size=10`,
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
      url: 'http://0.0.0.0:8087/core/brand/model/list/porsche',
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
      url: `http://0.0.0.0:8087/calcs/average/month/porsche?year_model=${anoSelecionado}&code_model=${cod_modelo}&year_reference=${anoReferencia}&page=1&size=10`,
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

      graphic();
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };
  



//FUNÇÃO DO GRÁFICO

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
    //console.log(response.data);
    console.log(response.data);
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
                <p>Uma plataforma de precificação precisa e exclusiva para carros de luxo, esportivos e colecionáveis.</p>
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
            <div className="form_box">
              <h2>Pesquisa Comum</h2>
              <form>
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
                {dados.brand}
              </div>
              <div className="row_info">
                <FontAwesomeIcon icon={faCar} size='2x' className='icon_font' />
                <h3>Modelo:</h3>
                {dados.model}
              </div>
              <div className="row_info">
                <FontAwesomeIcon icon={faCalendarDays} size='2x' className='icon_font'/>
                <h3>Ano:</h3>
                {dados.year_model}
              </div>
              <a href='#consulta'id='btn_nova'>
                <h2>Nova busca</h2>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
