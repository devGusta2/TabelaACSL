import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Index.css";
import Menu from "../Components/Menu";
import Tooltip from '../Components/Tooltip/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar, faCar, faCity, faCrown, faCube, faGasPump,
  faGauge, faGear, faLightbulb, faMap
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
        <div className='toggle-buttons'>

          {/* <button onClick={handleGeneralSelect}>Previsão Geral</button>
        
          <button onClick={handleBrandSelect}>Previsão por Marca</button> */}
        </div>

        {/* Formulário de Previsão Normal (Com Modelo e Ano) */}
        {!isBrandPrediction && (
          <div id="main_predict">
            <div id="title-box-predict">
              Previsão de preços com Inteligência Artificial <FontAwesomeIcon size="2x" icon={faLightbulb} />
            </div>

            <div id="switch_container">
  <div id="switch_box" onClick={() => activePred()}>
    <div id="switch" style={{ marginLeft: active ? "60%" : "0%" }}></div>
  </div>
  <span>Previsão Exploratória</span>
  <Tooltip text="Preveja
 o preço de veículos personalizados com base em <strong>características hipotéticas</strong>. Explore como diferentes configurações afetam o preço de um automóvel, considerando <strong>cenários alternativos</strong> e obtendo estimativas para essas variações.">
    <div ></div>
  </Tooltip>
</div>

            <form id="form" onSubmit={handleSubmit}>
              <div className="col_options_form">
                {[
                  { label: "Marca", icon: faCrown, name: "brand", list: brandList },
                  { label: "Carroceria", icon: faCar, name: "bodywork", list: bodyworkList },
                  { label: "Câmbio", icon: faGear, name: "gear", list: gearList },
                  { label: "Combustível", icon: faGasPump, name: "fuel", list: fuelList }
                ].map(({ label, icon, name, list }) => (
                  <div className="option-box" key={name}>
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

                <div className="result-box">
                  {/* <FontAwesomeIcon icon={faCar} size="2x" style={{ color: '#EF44A1' }} /> */}
                  {prediction && (
                    <div className="result">
                      <span>O valor estimado é:</span><span>{prediction}</span>
                    </div>
                  )}
                </div>

              </div>

              <div id="second_part_col_opt">
                {[
                  { label: "Modelo", icon: faCube, name: "model", type: "text" },
                  { label: "Ano modelo", icon: faCalendar, name: "year_model", type: "number", min: 1950 },
                  { label: "Quilometragem", icon: faGauge, name: "mileage", type: "number", min: 0 },
                  { label: "Unidade federativa", icon: faMap, name: "state", type: "text" },
                  { label: "Cidade", icon: faCity, name: "city", type: "text" }
                ].map(({ label, icon, name, type, min }) => (
                  <div className="option-box" key={name}>
                    <FontAwesomeIcon icon={icon} className="icon-font" size="2x" style={{ color: "#EF44A1" }} />
                    <input required type={type} name={name} placeholder=" " value={formData[name] || ""} onChange={handleChange} min={min} />
                    <label>{label}:</label>
                  </div>
                ))}
                <div className="option-box">
                  <button type="submit">
                    <h3>Prever</h3>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {isBrandPrediction && (
          <div id="main_predict">
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
              display:'flex', flexDirection:'column'
              
              }}>
              <div id="opt-brand-pred">
                <div className="col_options_form">
                {[
                  { label: "Marca", icon: faCrown, name: "brand", list: brandList },
                ].map(({ label, icon, name, list }) => (
                  <div className="option-box" key={name} style={{height:'100px'}}>
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
                <div className="result-box" style={{width:'80%', height:'40%', flexDirection:'column', padding:'20px', overflow:'auto'}}>
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

          </div>

        )}

      </div>
    </div>
  );
}



