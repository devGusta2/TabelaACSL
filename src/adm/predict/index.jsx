
import './Index.css'
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseball, faC, faCalendar, faCar, faCity, faCrown, faCube, faGasPump, faGauge, faGear, faMap, faWheelchair } from '@fortawesome/free-solid-svg-icons';

export default function Predict() {
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
                                    <select>
                                        <option>Selecione uma marca:</option>
                                    </select>
                                </div>
                                <div className='option-box'>
                                    <div className="label-box">
                                        <FontAwesomeIcon icon={faCar} size='2x' />
                                        <label>Carroceria:</label>
                                    </div>
                                    <select>
                                        <option>Selecione uma carroceria:</option>
                                    </select>
                                </div>
                                <div className='option-box'>
                                    <div className="label-box">
                                        <FontAwesomeIcon icon={faGear} size='2x' />
                                        <label>Câmbio:</label>
                                    </div>
                                    <select>
                                        <option>Selecione uma carroceria:</option>
                                    </select>
                                </div>
                                <div className='option-box'>
                                    <div className="label-box">
                                        <FontAwesomeIcon icon={faGasPump} size='2x' />
                                        <label>Combustível:</label>
                                    </div>
                                    <select>
                                        <option>Selecione um combustível:</option>
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
                                <input type='text' id="modelo" placeholder=" " />
                                <label htmlFor="modelo">Modelo:</label>
                            </div>
                            <div className='option-box'>
                                <FontAwesomeIcon icon={faCalendar} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                                <input type='text' id="modelo" placeholder=" " />
                                <label htmlFor="modelo">Ano modelo:</label>
                            </div>
                            <div className='option-box'>
                                <FontAwesomeIcon icon={faGauge} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                                <input type='text' id="modelo" placeholder=" " />
                                <label htmlFor="modelo">Quilometragem:</label>
                            </div>
                            <div className='option-box'>
                                <FontAwesomeIcon icon={faMap} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                                <input type='text' id="modelo" placeholder=" " />
                                <label htmlFor="modelo">Unidade federativa:</label>
                            </div>
                            <div className='option-box'>
                                <FontAwesomeIcon icon={faCity} className='icon-font' size='2x' style={{ color: '#EF44A1' }} />
                                <input type='text' id="modelo" placeholder=" " />
                                <label htmlFor="modelo">Cidade:</label>
                            </div>
                       
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}