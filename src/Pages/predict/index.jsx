import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Index.css';
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCar, faCity, faCrown, faCube, faGasPump, faGauge, faGear, faMap } from '@fortawesome/free-solid-svg-icons';
const host_django = import.meta.env.VITE_API_URL_DJANGO;

export default function Predict() {
  const [bodyworkList, setBodyworkList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [fuelList, setFuelList] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    mileage: '',
    gear: '',
    fuel: '',
    bodywork: '',
    city: '',
    state: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [brandPrediction, setBrandPrediction] = useState(null);
  const [isBrandPrediction, setIsBrandPrediction] = useState(false); // Para identificar se é predição por marca

  useEffect(() => {
    const fetchData = async (param, setState) => {
      const userToken = localStorage.getItem('token');
      if (!userToken) {
        console.error("Erro: Token não encontrado!");
        return;
      }
      try {
        const response = await axios.get(`${host_django}/artificial_intelligence/list/${param}/?page=1&page_size=99`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${userToken}`
          }
        });
        if (response.data?.content) {
          const key = Object.keys(response.data.content).find(k => Array.isArray(response.data.content[k]));
          if (key) setState(response.data.content[key] || []);
        }
      } catch (error) {
        console.error("Erro na requisição:", error.response ? error.response.data : error.message);
      }
    };

    fetchData('bodywork', setBodyworkList);
    fetchData('brand', setBrandList);
    fetchData('fuel', setFuelList);
    fetchData('gear', setGearList);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBrandPrediction) {
      return; // Impede a execução de predição normal se for uma previsão por marca
    }

    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.error("Erro: Token não encontrado!");
      return;
    }

    try {
      const response = await axios.post(`${host_django}/artificial_intelligence/predict/price/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${userToken}`
        }
      });
      const predictedValue = response.data.content?.predict;

      if (predictedValue !== undefined) {
        setPrediction(predictedValue);
      } else {
        console.error("Erro: A resposta da API não contém 'predict' dentro de 'content'.", response.data);
      }

    } catch (error) {
      console.error("Erro na previsão:", error);
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.error("Erro: Token não encontrado!");
      return;
    }

    try {
      const { brand, mileage, gear, fuel, bodywork, city, state } = formData;
      const response = await axios.post(`${host_django}/artificial_intelligence/predict/price/brand/${brand}/`, {
        mileage,
        gear,
        fuel,
        bodywork,
        city,
        state
      }, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${userToken}`
        }
      });

      // Processando o retorno para capturar os modelos e preços
      const predictions = response.data.content?.predictions || [];
      if (predictions.length > 0) {
        setBrandPrediction(predictions);
      } else {
        console.error("Erro: A resposta da API não contém previsões para modelos.", response.data);
      }
    } catch (error) {
      console.error("Erro na previsão da marca:", error);
    }
  };

  const handleBrandSelect = () => {
    setIsBrandPrediction(true);
  };

  const handleGeneralSelect = () => {
    setIsBrandPrediction(false);
    setFormData({ ...formData, model: '', year_model: '' }); // Resetando model e year_model quando voltar para a previsão normal
  };

  return (
    <div className='predict'>
      <Menu />
      <div className='content-predict'>
        <div className='toggle-buttons'>
          <button onClick={handleGeneralSelect}>Previsão Geral</button>
          <button onClick={handleBrandSelect}>Previsão por Marca</button>
        </div>

        {/* Formulário de Previsão Normal (Com Modelo e Ano) */}
        {!isBrandPrediction && (
          <form id="form" onSubmit={handleSubmit}>
            <div className='column-predict-form'>
              <div id="title-box">Previsão de preços por IA</div>
              <div id="selects-box">
                {[{ label: "Marca", icon: faCrown, name: "brand", list: brandList },
                  { label: "Carroceria", icon: faCar, name: "bodywork", list: bodyworkList },
                  { label: "Câmbio", icon: faGear, name: "gear", list: gearList },
                  { label: "Combustível", icon: faGasPump, name: "fuel", list: fuelList }].map(({ label, icon, name, list }) => (
                    <div className='option-box' key={name}>
                      <div className="label-box">
                        <FontAwesomeIcon icon={icon} size='2x' />
                        <label>{label}:</label>
                      </div>
                      <select name={name} value={formData[name]} onChange={handleChange}>
                        <option value="">Selecione {label.toLowerCase()}</option>
                        {list.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                ))}
                <div className='option-box'>
                  <button type="submit">
                    <h3>Prever</h3>
                  </button>
                </div>
              </div>
            </div>
            <div className='column-predict-form'>
              {[{ label: "Modelo", icon: faCube, name: "model", type: "text" },
                { label: "Ano modelo", icon: faCalendar, name: "year_model", type: "number", min: 1950 },
                { label: "Quilometragem", icon: faGauge, name: "mileage", type: "number", min: 0 },
                { label: "Unidade federativa", icon: faMap, name: "state", type: "text" },
                { label: "Cidade", icon: faCity, name: "city", type: "text" }].map(({ label, icon, name, type, min }) => (
                  <div className='option-box' key={name}>
                    <FontAwesomeIcon icon={icon} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                    <input required type={type} name={name} placeholder=" " value={formData[name]} onChange={handleChange} min={min} />
                    <label>{label}:</label>
                  </div>
              ))}
            </div>
          </form>
        )}

        {/* Formulário de Previsão por Marca (Sem Modelo e Ano) */}
        {isBrandPrediction && (
          <form id="brand-form" onSubmit={handleBrandSubmit}>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faCrown} size='2x' />
                <label>Marca:</label>
              </div>
              <select name="brand" value={formData.brand} onChange={handleChange}>
                <option value="">Selecione a marca</option>
                {brandList.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faCar} size='2x' />
                <label>Carroceria:</label>
              </div>
              <select name="bodywork" value={formData.bodywork} onChange={handleChange}>
                <option value="">Selecione a carroceria</option>
                {bodyworkList.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faGauge} size='2x' />
                <label>Quilometragem:</label>
              </div>
              <input required type="number" name="mileage" value={formData.mileage} onChange={handleChange} min="0" />
            </div>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faGear} size='2x' />
                <label>Câmbio:</label>
              </div>
              <select name="gear" value={formData.gear} onChange={handleChange}>
                <option value="">Selecione o câmbio</option>
                {gearList.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faGasPump} size='2x' />
                <label>Combustível:</label>
              </div>
              <select name="fuel" value={formData.fuel} onChange={handleChange}>
                <option value="">Selecione o combustível</option>
                {fuelList.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faMap} size='2x' />
                <label>Estado:</label>
              </div>
              <input required type="text" name="state" placeholder="Estado" value={formData.state} onChange={handleChange} />
            </div>
            <div className='option-box'>
              <div className="label-box">
                <FontAwesomeIcon icon={faCity} size='2x' />
                <label>Cidade:</label>
              </div>
              <input required type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} />
            </div>
            <div className='option-box'>
              <button type="submit">
                <h3>Prever</h3>
              </button>
            </div>
          </form>
        )}

        {/* Resultado da Previsão */}
        {prediction && (
          <div className="result-box">
            <p>Valor estimado: R$ {prediction}</p>
          </div>
        )}

        {/* Resultado da Previsão por Marca */}
        {brandPrediction && (
          <div className="result-box">
            <h3>Previsões por Modelo:</h3>
            <ul>
              {brandPrediction.map((item, index) => (
                <li key={index}>
                  <strong>{item.model}</strong>: R$ {item.predicted_value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}



