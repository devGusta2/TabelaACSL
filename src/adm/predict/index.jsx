import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Index.css';
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseball, faC, faCalendar, faCar, faCity, faCrown, faCube, faGasPump, faGauge, faGear, faMap, faWheelchair } from '@fortawesome/free-solid-svg-icons';

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

  const fetchData = (param) => {
    const options = {
      method: 'GET',
      url: `http://0.0.0.0:8086/car/list/${param}`,
      params: { page: '1', page_size: '99' },
      headers: {
        'User-Agent': 'insomnia/10.3.0',
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
      }
    };

    return axios.request(options)
      .then(response => {
        if (response.data && response.data[param]) {
          return response.data[param];
        }
        return [];
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  };

  useEffect(() => {
    fetchData('bodywork').then(data => setBodyworkList(data));
    fetchData('brand').then(data => setBrandList(data));
    fetchData('fuel').then(data => setFuelList(data));
    fetchData('gear').then(data => setGearList(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://0.0.0.0:8086/car/predict', formData, {
      headers: {
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setPrediction(response.data.predict);
    })
    .catch(error => console.error(error));
  };

  return (
    <>
      <div className='predict'>
        <Menu />
        <div className='content'>
          <div className='column-predict'>
            <div id='icon-car'>
              <FontAwesomeIcon style={{ color: '#EF44A1' }} icon={faCar} size='5x' />
              <h3>HB20</h3>
            </div>
            <div id='name-model'></div>
            <div id='graphicBox'>
              <div className="chart-container">
                <div className="half-donut"></div>
              </div>
            </div>
          </div>
          <form id="form" onSubmit={handleSubmit}>
            <div className='column-predict-form'>
              <div id="title-box">
                Previsão de preços por IA
              </div>
              <div id="selects-box">
                <div className='option-box'>
                  <div className="label-box">
                    <FontAwesomeIcon icon={faCrown} size='2x' />
                    <label>Marca:</label>
                  </div>
                  <select name="brand" value={formData.brand} onChange={handleChange}>
                    <option>Selecione uma marca:</option>
                    {brandList.map((brand, index) => (
                      <option key={index} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className='option-box'>
                  <div className="label-box">
                    <FontAwesomeIcon icon={faCar} size='2x' />
                    <label>Carroceria:</label>
                  </div>
                  <select name="bodywork" value={formData.bodywork} onChange={handleChange}>
                    <option>Selecione uma Carroceria:</option>
                    {bodyworkList.map((bodywork, index) => (
                      <option key={index} value={bodywork}>{bodywork}</option>
                    ))}
                  </select>
                </div>
                <div className='option-box'>
                  <div className="label-box">
                    <FontAwesomeIcon icon={faGear} size='2x' />
                    <label>Câmbio:</label>
                  </div>
                  <select name="gear" value={formData.gear} onChange={handleChange}>
                    {gearList.map((gear, index) => (
                      <option key={index} value={gear}>{gear}</option>
                    ))}
                  </select>
                </div>
                <div className='option-box'>
                  <div className="label-box">
                    <FontAwesomeIcon icon={faGasPump} size='2x' />
                    <label>Combustível:</label>
                  </div>
                  <select name="fuel" value={formData.fuel} onChange={handleChange}>
                    <option>Selecione um combustível:</option>
                    {fuelList.map((fuel, index) => (
                      <option key={index} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
                <div className='option-box'>
                  <button type="submit">
                    <h3>Prever</h3>
                  </button>
                </div>
              </div>
            </div>
            <div className='column-predict-form'>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCube} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input type='text' id="modelo" name="model" value={formData.model} onChange={handleChange} placeholder=" " />
                <label htmlFor="modelo">Modelo:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCalendar} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input type='text' id="year_model" name="year_model" value={formData.year_model} onChange={handleChange} placeholder=" " />
                <label htmlFor="year_model">Ano modelo:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faGauge} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input type='text' id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} placeholder=" " />
                <label htmlFor="mileage">Quilometragem:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faMap} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input type='text' id="state" name="state" value={formData.state} onChange={handleChange} placeholder=" " />
                <label htmlFor="state">Unidade federativa:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCity} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input type='text' id="city" name="city" value={formData.city} onChange={handleChange} placeholder=" " />
                <label htmlFor="city">Cidade:</label>
              </div>
            </div>
          </form>
          {prediction && (
            <div className="prediction-result">
              <h2>Preço previsto: {prediction}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}