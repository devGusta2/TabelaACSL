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

  const fetchData = (param) => {
    const options = {
      method: 'GET',
      url: `http://127.0.0.1:8086/docs/car/list/${param}`,
      params: { page: '1', page_size: '99' },
      headers: {
        'User-Agent': 'insomnia/10.3.0',
        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
      }
    };

    return axios.request(options)
      .then(response => {
        // Dependendo do parâmetro, extrai a lista correta
        if (response.data && response.data[param]) {
          return response.data[param]; // Retorna a lista esperada
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

  return (
    <>
      <div className='predict'>
        <Menu />
        <div className='content-predict'>
          <div className='column-predict'>
            <div id='icon-car'>
              <FontAwesomeIcon style={{ color: '#EF44A1' }} icon={faCar} size='5x' />

            </div>
            <div id='name-model'>
              <h3>HB20</h3>
            </div>
            <div id='graphicBox'>
              <div className="chart-container">
                <div className="half-donut">

                </div>
              </div>
            </div>
          </div>
          <form id="form">
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
                  <select required>
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
                  <select required>
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
                  <select required>
                    <option>Selecione uma câmbio:</option>
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
                  <select required>
                    <option>Selecione um combustível:</option>
                    {fuelList.map((fuel, index) => (
                      <option key={index} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
                <div className='option-box'>
                  <button>
                    <h3>Prever</h3>
                  </button>
                </div>
              </div>
            </div>
            <div className='column-predict-form'>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCube} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required type='text' id="modelo" placeholder=" " />
                <label htmlFor="modelo">Modelo:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCalendar} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required min='1950' type='number' id="modelo" placeholder=" " />
                <label htmlFor="modelo">Ano modelo:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faGauge} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required min='0' type='number' id="modelo" placeholder=" " />
                <label htmlFor="modelo">Quilometragem:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faMap} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required type='text' id="modelo" placeholder=" " />
                <label htmlFor="modelo">Unidade federativa:</label>
              </div>
              <div className='option-box'>
                <FontAwesomeIcon icon={faCity} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                <input required type='text' id="modelo" placeholder=" " />
                <label htmlFor="modelo">Cidade:</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
