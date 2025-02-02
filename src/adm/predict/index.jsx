import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Index.css';
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCar, faCity, faCrown, faCube, faGasPump, faGauge, faGear, faMap } from '@fortawesome/free-solid-svg-icons';

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

  const fetchData = (param, setState) => {
    axios.get(`http://0.0.0.0:8086/car/list/${param}`, {
      params: { page: '1', page_size: '99' },
      headers: {
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
      }
    })
      .then(response => {
        if (response.data && response.data[param]) {
          setState(response.data[param]);
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData('bodywork', setBodyworkList);
    fetchData('brand', setBrandList);
    fetchData('fuel', setFuelList);
    fetchData('gear', setGearList);
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
        <div className='content-predict'>

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
                    <option value="">Selecione uma marca</option>
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
                    <option value="">Selecione uma carroceria</option>
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
                    <option value="">Selecione um câmbio</option>
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
                    <option value="">Selecione um combustível</option>
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
                <input required type='text' id="modelo" name="model" placeholder=" " value={formData.model} onChange={handleChange} />
                <label htmlFor="modelo">Modelo:</label>
              </div>

              <div className='option-box'>
                <FontAwesomeIcon icon={faCalendar} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required min='1950' type='number' name="year_model" id="modelo" placeholder=" " value={formData.year_model} onChange={handleChange} />
                <label htmlFor="modelo">Ano modelo:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faGauge} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required min='0' name="mileage" type='number' id="modelo" placeholder=" " value={formData.mileage} onChange={handleChange} />
                <label htmlFor="modelo">Quilometragem:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faMap} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required type='text' name="state" id="modelo" placeholder=" " value={formData.state} onChange={handleChange} />
                <label htmlFor="modelo">Unidade federativa:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCity} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required type='text' name="city" id="modelo" placeholder=" " value={formData.city} onChange={handleChange} />
                <label htmlFor="modelo">Cidade:</label>
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