import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Index.css";
import Menu from "../Components/Menu";
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
              Previsão de preços por IA <FontAwesomeIcon size="2x" icon={faLightbulb} />
            </div>

            <div id="switch_container">
              <div id="switch_box" onClick={() => activePred()}>
                <div id="switch" style={{ marginLeft: active ? "60%" : "0%" }}></div>
              </div>
              <span>Modo playground</span>
              <div id="icon-info" onClick={() => alert("Simulação Inteligente de Preços para Veículos Inexistentes no Mercado Essa funcionalidade permite ao time de análise de dados simular o preço de um veículo que ainda não possui anúncio no mercado. Através de inteligência artificial, é possível gerar estimativas precisas com base em veículos similares, ajudando na tomada de decisões estratégicas, como precificação de novos modelos ou a análise de oportunidades antes de uma possível entrada no mercado. Ela possibilita uma previsão assertiva, mesmo em cenários hipotéticos, fornecendo insights valiosos para ações proativas e fundamentadas.")}>i</div>
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
        {/* Formulário de Previsão por Marca (Sem Modelo e Ano) */}



        {isBrandPrediction && (
          <div id="main_predict">
            <div id="title-box-predict">
              Previsão de preços por IA <FontAwesomeIcon size="2x" icon={faLightbulb} />
            </div>

            <div id="switch_container">
              <div id="switch_box" onClick={() => activePred()}>
                <div id="switch" style={{ marginLeft: active ? "60%" : "0%" }}></div>
              </div>
              <span>Voltar para modo Geral</span>
              <div id="icon-info" onClick={() => alert("Essa funcionalidade permite ao time de análise de dados simular o preço de um veículo que ainda não possui anúncio no mercado. Através de inteligência artificial, é possível gerar estimativas precisas com base em veículos similares, ajudando na tomada de decisões estratégicas, como precificação de novos modelos ou a análise de oportunidades antes de uma possível entrada no mercado. Ela possibilita uma previsão assertiva, mesmo em cenários hipotéticos, fornecendo insights valiosos para ações proativas e fundamentadas.")}>i</div>
            </div>










            <form id="form" onSubmit={handleBrandSubmit} style={{
              display:'flex', flexDirection:'column'
              
              }}>
              <div id="opt-brand-pred">
                <div className="col_options_form">
                {[
                  { label: "Marca", icon: faCrown, name: "brand", list: brandList },
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
              </div>

                
                <div className="option-box">
                  <button type="submit">
                    <h3>Prever</h3>
                  </button>
                </div>

              
              </div>
              <h3>Previsões por Modelo:</h3>
              {brandPrediction && (
                <div className="result-box" style={{width:'80%', height:'20%', flexDirection:'column', padding:'20px', overflow:'auto'}}>
          
                  <ul>
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




          //   <form id="brand-form" onSubmit={handleBrandSubmit}>
          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faCrown} size='2x' />
          //         <label>Marca:</label>
          //       </div>
          //       <select name="brand" value={formData.brand} onChange={handleChange}>
          //         <option value="">Selecione a marca</option>
          //         {brandList.map((item, index) => (
          //           <option key={index} value={item}>{item}</option>
          //         ))}
          //       </select>
          //     </div>
          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faCar} size='2x' />
          //         <label>Carroceria:</label>
          //       </div>
          //       <select name="bodywork" value={formData.bodywork} onChange={handleChange}>
          //         <option value="">Selecione a carroceria</option>
          //         {bodyworkList.map((item, index) => (
          //           <option key={index} value={item}>{item}</option>
          //         ))}
          //       </select>
          //     </div>
          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faGauge} size='2x' />
          //         <label>Quilometragem:</label>
          //       </div>
          //       <input required type="number" name="mileage" value={formData.mileage} onChange={handleChange} min="0" />
          //     </div>
          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faGear} size='2x' />
          //         <label>Câmbio:</label>
          //       </div>
          //       <select name="gear" value={formData.gear} onChange={handleChange}>
          //         <option value="">Selecione o câmbio</option>
          //         {gearList.map((item, index) => (
          //           <option key={index} value={item}>{item}</option>
          //         ))}
          //       </select>
          //     </div>
          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faGasPump} size='2x' />
          //         <label>Combustível:</label>
          //       </div>
          //       <select name="fuel" value={formData.fuel} onChange={handleChange}>
          //         <option value="">Selecione o combustível</option>
          //         {fuelList.map((item, index) => (
          //           <option key={index} value={item}>{item}</option>
          //         ))}
          //       </select>
          //     </div>



          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faMap} size='2x' />
          //         <label>Estado:</label>
          //       </div>
          //       <input required type="text" name="state" placeholder="Estado" value={formData.state} onChange={handleChange} />
          //     </div>
          //     <div className='option-box'>
          //       <div className="label-box">
          //         <FontAwesomeIcon icon={faCity} size='2x' />
          //         <label>Cidade:</label>
          //       </div>
          //       <input required type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} />
          //     </div>
          //     <div className='option-box'>
          //       <button type="submit">
          //         <h3>Prever</h3>
          //       </button>
          //     </div>
          //     {brandPrediction && (
          //   <div className="result-box">
          //     <h3>Previsões por Modelo:</h3>
          //     <ul>
          //       {brandPrediction.map((item, index) => (
          //         <li key={index}>
          //           <strong>{item.model}</strong>: R$ {item.predicted_value}
          //         </li>
          //       ))}
          //     </ul>
          //   </div>
          // )}
          //   </form>

        )}

      </div>
    </div>
  );
}



