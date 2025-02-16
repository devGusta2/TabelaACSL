import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Index.css';
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCar, faCity, faCrown, faCube, faGasPump, faGauge, faGear, faMap } from '@fortawesome/free-solid-svg-icons';


const host_ia = import.meta.env.VITE_API_URL_IA;
const token_ia = import.meta.env.VITE_TOKEN_IA;
const host_django = import.meta.env.VITE_API_URL_DJANGO;
export default function Predict() {
  const [bodyworkList, setBodyworkList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [fuelList, setFuelList] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year_model: '',
    mileage: '',
    gear: '',
    fuel: '',
    bodywork: '',
    city: '',
    state: ''
  });
  const [prediction, setPrediction] = useState(null);

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

    // Garante que estamos acessando corretamente a resposta dentro de "content"
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

  return (
    <div className='predict'>
      <Menu />
      <div className='content-predict'>
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
        {prediction && (
          <div className="prediction-result">
            <h2>Preço previsto: {prediction}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
