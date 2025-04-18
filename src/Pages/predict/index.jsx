import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Index.css";
import Menu from "../Components/Menu";
import Tooltip from '../Components/Tooltip/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCalendar, faCar, faChartBar, faChartLine, faCity, faCrown, faCube, faGasPump,
  faGauge, faGear, faLightbulb, faMap,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const host_django = import.meta.env.VITE_API_URL_DJANGO;

export default function Predict() {
  const [bodyworkList, setBodyworkList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [fuelList, setFuelList] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [brandPrediction, setBrandPrediction] = useState(null);
  const [isBrandPrediction, setIsBrandPrediction] = useState(false);
  const [active, setActive] = useState(false);

  // Estado inicial do formulário garantindo valores controlados
  const [formData, setFormData] = useState({
    brand: "",
    bodywork: "",
    gear: "",
    fuel: "",
    model: "",
    year_model: "",
    mileage: "",
    state: "",
    city: ""
  });

  useEffect(() => {
    const fetchData = async (param, setState) => {
      const userToken = localStorage.getItem("token");
      if (!userToken) return console.error("Erro: Token não encontrado!");

      try {
        const response = await axios.get(`${host_django}/artificial_intelligence/list/${param}/?page=1&page_size=99`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${userToken}`
          }
        });

        if (response.data?.content) {
          const key = Object.keys(response.data.content).find(k => Array.isArray(response.data.content[k]));
          if (key) setState(response.data.content[key] || []);
        }
      } catch (error) {
        console.error("Erro na requisição:", error.response?.data || error.message);
      }
    };

    fetchData("bodywork", setBodyworkList);
    fetchData("brand", setBrandList);
    fetchData("fuel", setFuelList);
    fetchData("gear", setGearList);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBrandPrediction) return;

    const userToken = localStorage.getItem("token");
    if (!userToken) return console.error("Erro: Token não encontrado!");

    try {
      const response = await axios.post(`${host_django}/artificial_intelligence/predict/price/`, formData, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${userToken}`
        }
      });

      const predictedValue = response.data.content?.predict;
      predictedValue !== undefined ? setPrediction(predictedValue) : console.error("Erro: A resposta da API não contém 'predict'.", response.data);
    } catch (error) {
      console.error("Erro na previsão:", error);
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem("token");
    if (!userToken) return console.error("Erro: Token não encontrado!");

    try {
      const { brand } = formData;
      const response = await axios.post(`${host_django}/artificial_intelligence/predict/price/brand/${brand}/`, {}, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${userToken}`
        }
      });

      const predictions = response.data.content?.predictions || [];
      predictions.length > 0 ? setBrandPrediction(predictions) : console.error("Erro: Sem previsões para modelos.", response.data);
    } catch (error) {
      console.error("Erro na previsão da marca:", error);
    }
  };

  const activePred = () => {
    setActive(!active)
    setIsBrandPrediction((prev) => !prev);

  }

  return (
    <div className='predict'>
      <Menu />
      <div className='content-predict'>
        <div id="card-descricao-geral-func">
          <div id="title-e-desc-desc">
            <span id="title-projecao">Projeção de preços por Inteligência artificial</span>
            <br />
            <span>
              Com base em dados reais de mercado, o sistema prevê
              o preço estimado de veículos de uma determinada marca
              para o próximo ano-modelo, simulando as especificações
              de modelos mais frequentes dessa marca com suas características
              típicas   Essa funcionalidade permite ao lojista explorar quanto
              veículos semelhantes — mas com ano-modelo posterior — podem ser
              avaliados no cenário atual, oferecendo uma visão antecipada
              sobre os valores esperados na revenda do automóvel
            </span>
          </div>
          <div id="box-icon-AI">
            <FontAwesomeIcon size='8x' icon={faLightbulb}></FontAwesomeIcon>
          </div>
        </div>



        <div id="container-info-form-desc">
          <div id="row-lower-infos">
            <div id="col-info-form-projecao">
              <div id="card-motivos-box">
                <div id="title-motivos-box">
                  <span>Por que usar a Sugestão Inteligente de Preço?</span>
                </div>
                <div id="row-list-content-flex">
                  <div id="balls-box-motivos">
                    <div className="ball-motivos"></div>
                    <div className="ball-motivos"></div>
                    <div className="ball-motivos"></div>
                    <div className="ball-motivos"></div>
                  </div>
                  <div id="list-motivos-contetn">
                    <div className="row-motivos">

                      <span>Evitar prejuízos ao revender carros por menos do que eles realmente valerão</span>
                    </div>
                    <div className="row-motivos">

                      <span>Planejar estoque de forma inteligente, priorizando modelos com maior valorização futura</span>
                    </div>

                    <div className="row-motivos">

                      <span> Negociar com mais segurança, usando dados e projeções reais para justificar o preço.</span>
                    </div>
                    <div className="row-motivos">

                      <span>Antecipar tendências de mercado e sair na frente da concorrência.</span>
                    </div>
                  </div>
                </div>
              </div>
               {/* <div id="card-lower-form">
            <div className="col_options_form">
                  {[
                    { label: "Marca", icon: faCrown, name: "brand", list: brandList },
                  ].map(({ label, icon, name, list }) => (
                    <div className="option-box" key={name} style={{ height: '100px' }}>
                      <div className="label-box">
                        <FontAwesomeIcon icon={icon} size="2x" />
                        <label>{label}:</label>
                      </div>
                      <select name={name} value={formData[name] || ""} onChange={handleChange}>
                        <option value="">Selecione {label.toLowerCase()}</option>
                        {list.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>


                <div className="option-box">
                  <button type="submit">
                    <h3>Prever</h3>
                  </button>
                </div>
            </div> */}
            </div>
            <div id="info-como-feito">
            
              <div id="info-como-feito-title-box">
                <span>Como a projeção é feita:</span>
              </div>
              <div className="icon-title-desc-feito">
                <div className="icon-como-box">
                  <FontAwesomeIcon icon={faSearch} size="3x"/>
                </div>
                <div className="desc-title-como">
                  <span>Coleta de dados:</span>
        
                    <span>
                      Os anúncios são coletados de 
                      forma automatizada, garantindo
                      ampla representatividade dos
                      dados de mercado.
                    </span>
                </div>
              </div>
              <div className="icon-title-desc-feito">
                <div className="icon-como-box">
                  <FontAwesomeIcon icon={faLightbulb} size="3x"/>
                </div>
                <div className="desc-title-como">
                  <span>Análise com IA:</span>
      
                    <span>
                    O modelo processa o histórico de anúncios para aprender padrões de precificação e gerar recomendações de valor de anúncio de forma automática, baseada nas dinâmicas reais do mercado.
                    </span>
                </div>
              </div>
              <div className="icon-title-desc-feito">
                <div className="icon-como-box">
                  <FontAwesomeIcon icon={faCalculator} size="3x"/>
                </div>
                <div className="desc-title-como">
                  <span>Coleta de dados:</span>
          
                    <span>
                      Os anúncios são coletados de 
                      forma automatizada, garantindo
                      ampla representatividade dos
                      dados de mercado.
                    </span>
                </div>
              </div>
              <div className="icon-title-desc-feito">
                <div className="icon-como-box">
                  <FontAwesomeIcon icon={faChartLine} size="3x"/>
                </div>
                <div className="desc-title-como">
                  <span>Coleta de dados:</span>
   
                    <span>
                      Os anúncios são coletados de 
                      forma automatizada, garantindo
                      ampla representatividade dos
                      dados de mercado.
                    </span>
                </div>
              </div>
            </div>
            

           
          </div>
        </div>















        {/* <div id="main_predict">
            <div id="title-box-predict">
              Previsão de preços com Inteligência Artificial<FontAwesomeIcon size="2x" icon={faLightbulb} />
            </div>

            <div id="switch_container">
              <div id="switch_box" onClick={() => activePred()}>
                <div id="switch" style={{ marginLeft: active ? "60%" : "0%" }}></div>
              </div>
              <span>Previsão por Marca</span>
              <Tooltip text="Preveja o preço estimado de todos os modelos de uma marca para o próximo ano, com base em <strong>dados concretos de mercado</strong>. Antecipe negociações e esteja um passo à frente na tomada de decisão.">
                <div></div>
              </Tooltip>
            </div>

            <form id="form" onSubmit={handleBrandSubmit} style={{
              display: 'flex', flexDirection: 'column'

            }}>
              <div id="opt-brand-pred">
                <div className="col_options_form">
                  {[
                    { label: "Marca", icon: faCrown, name: "brand", list: brandList },
                  ].map(({ label, icon, name, list }) => (
                    <div className="option-box" key={name} style={{ height: '100px' }}>
                      <div className="label-box">
                        <FontAwesomeIcon icon={icon} size="2x" />
                        <label>{label}:</label>
                      </div>
                      <select name={name} value={formData[name] || ""} onChange={handleChange}>
                        <option value="">Selecione {label.toLowerCase()}</option>
                        {list.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>


                <div className="option-box">
                  <button type="submit">
                    <h3>Prever</h3>
                  </button>
                </div>


              </div>

              {brandPrediction && (
                <div className="result-box" style={{ width: '80%', height: '40%', flexDirection: 'column', padding: '20px', overflow: 'auto' }}>
                  <h3>Previsões por Modelo:</h3>
                  <ul className='ul-results'>
                    {brandPrediction.map((item, index) => (
                      <li key={index}>
                        <strong>{item.model}</strong>: R$ {item.predicted_value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>

          </div> */}
      </div>
    </div>
  );
}



