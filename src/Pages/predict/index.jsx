import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Index.css";
import Menu from "../Components/Menu";
import Tooltip from '../Components/Tooltip/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateBack, faCalculator, faCalendar, faCar, faChartBar,
  faChartLine, faCity, faCoins, faCrown, faCube, faDiamond, faDollar, faGasPump, faGauge, faGear,
  faHourglass, faLightbulb, faMap, faSearch,
  faX
} from "@fortawesome/free-solid-svg-icons";











// Topo do componente
import BMW from '../../assets/Brands/BMW.png';
import CHERY from '../../assets/Brands/CHERY.png';
import CHEVROLET from '../../assets/Brands/CHEVROLET.webp';
import CITROEN from '../../assets/Brands/CITROEN.jpg';
import AUDI from '../../assets/Brands/AUDI.jpg';
import FIAT from '../../assets/Brands/FIAT.jfif';
import FORD from '../../assets/Brands/FORD.png';
import HONDA from '../../assets/Brands/HONDA.webp';
import HYUNDAI from '../../assets/Brands/HYUNDAI.jpg';
import JAGUAR from '../../assets/Brands/JAGUAR.avif';
import JEEP from '../../assets/Brands/JEEP.png';
import KIA from '../../assets/Brands/KIA.png';
import MERCEDES from '../../assets/Brands/MERCEDES.jpg';
import MINI from '../../assets/Brands/MINI.png';
import MITSUBISHI from '../../assets/Brands/MITSUBISH.png';
import NISSAN from '../../assets/Brands/NISSAN.jpg';
import PEUGEOT from '../../assets/Brands/PEGEOUT.png';
import PORSCHE from '../../assets/Brands/PORSHE.jpg';
import RAM from '../../assets/Brands/RAM.webp';
import RENAULT from '../../assets/Brands/RENAULT.png';
import SUZUKI from '../../assets/Brands/SUZUKI.png';
import TOYOTA from '../../assets/Brands/TOYOTA.webp';
import VOLKSWAGEN from '../../assets/Brands/VOLKSWAGEN.png';
import VOLVO from '../../assets/Brands/VOLVO.jpg';
import WILLYS from '../../assets/Brands/WILLYS.png';
import LAND from '../../assets/Brands/LAND.jpg';
const brandLogos = {
  BMW,
  CHERY,
  CHEVROLET,
  CITROEN,
  FIAT,
  FORD,
  HONDA,
  HYUNDAI,
  JAGUAR,
  JEEP,
  KIA,
  'MERCEDES-BENZ': MERCEDES,
  MINI,
  MITSUBISHI,
  NISSAN,
  PEUGEOT,
  PORSCHE,
  RAM,
  RENAULT,
  SUZUKI,
  TOYOTA,
  VOLKSWAGEN,
  VOLVO,
  WILLYS,
  AUDI,
  LAND
};









const host_django = import.meta.env.VITE_API_URL_DJANGO;

export default function Predict() {
  const [brandList, setBrandList] = useState([]);
  const [formData, setFormData] = useState({ brand: "" });
  const [brandPrediction, setBrandPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.error("Token não encontrado!");

      try {
        const res = await axios.get(`${host_django}/artificial_intelligence/list-brands/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
          }
        });
        const data = res.data?.content?.brands || [];
        setBrandList(data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        console.log("Detalhes do erro:", error.response?.data);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return console.error("Token não encontrado!");

    try {
      const response = await axios.post(
        `${host_django}/artificial_intelligence/predict/price/brand/${formData.brand}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      const predictions = response.data.content?.predictions || [];
      setBrandPrediction(predictions);
      setShowModal(true);
    } catch (error) {
      console.error("Erro na previsão por marca:", error);
    }
  };

  return (
    <div className='predict'>
      <Menu />
      <div className='content-predict'>
        {/* Bloco de introdução e descrição */}
        <div id="card-descricao-geral-func">
          <div id="title-e-desc-desc">
            <span id="title-projecao">Sugestão Inteligente de Preço para Anúncio</span>
            <br />
            <span>
              Receba uma sugestão inteligente de preço para anunciar seus veículos com base em um benchmarking de mercado. A recomendação ajuda a posicionar melhor seus anúncios, evitando preços fora da realidade e aumentando as chances de negociação com mais agilidade e segurança.

            </span>
          </div>
          <div id="box-icon-AI">
            <FontAwesomeIcon size='8x' icon={faLightbulb}></FontAwesomeIcon>
          </div>
        </div>

        {/* Formulário */}
        <div id="container-info-form-desc">
          <div id="row-lower-infos">
            <div id="col-info-form-projecao">
              <div id="card-motivos-box">
                <div id="title-motivos-box">
                  <span>Por que usar?</span>
                </div>
                <div id="row-list-content-flex">
                  <div id="balls-box-motivos">
                    <div className="ball-motivos"></div>
                    <div className="ball-motivos"></div>
                    <div className="ball-motivos"></div>
                    <div className="ball-motivos"></div>
                  </div>
                  <div id="list-motivos-contetn">
                    <div className="row-motivos"><span>Evite prejuízos ao anunciar carros com valores abaixo do esperado;</span></div>
                    <div className="row-motivos"><span>Ganhe agilidade e confiança ao definir preços baseados em dados reais;</span></div>
                    <div className="row-motivos"><span>Use o benchmark para justificar o valor do anúncio na negociação;</span></div>
                    <div className="row-motivos"><span>Acompanhe movimentos do mercado e se antecipe à concorrência.</span></div>
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div id="card-lower-form">
                <div className="col_options_form">
                  {[{ label: "Marca", icon: faCrown, name: "brand", list: brandList }].map(({ label, icon, name, list }) => (
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
                  <div className="option-box">
                    <button type="button" onClick={handleBrandSubmit}>
                      <FontAwesomeIcon icon={faHourglass} size="2x" />
                      <h3>Fazer projeção</h3>
                    </button>
                    <button type="button" onClick={() => setFormData({ brand: "" })}>
                      <FontAwesomeIcon icon={faArrowRotateBack} size="2x" />
                      <h3>Redefinir</h3>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Explicação da IA */}
            <div id="info-como-feito" style={{ boxShadow: '4px 4px 10px rgb(167, 167, 167)', borderRadius: '16px', padding: '25px' }}>
              <div id="info-como-feito-title-box">
                <span>Como o processo é feito?</span>
              </div>

              {[
                { icon: faSearch, title: "Coleta de dados", desc: "Milhares de anúncios de veículos são coletados de forma automatizada na internet, garantindo informações sempre atualizadas e representativas do mercado.\n" +
                      "\n" },
                { icon: faLightbulb, title: "Análise com IA", desc: "A partir de tais dados, o sistema aprende como veículos semelhantes são precificados e sugere valores com base nesses padrões." },
                { icon: faCalculator, title: "Cálculo Inteligente", desc: "Embasando-se nos preços dos anúncios, a IA aplica modelos estatísticos para estimar valores justos e confiáveis de acordo com o comportamento real do mercado." },
                { icon: faChartLine, title: "Geração da Recomendação", desc: "Com base nos dados analisados, o sistema entrega uma sugestão de preço para anúncio que reflete o valor praticado para veículos similares no mercado atual." }
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="icon-title-desc-feito">
                  <div className="icon-como-box">
                    <FontAwesomeIcon icon={icon} size="3x" />
                  </div>
                  <div className="desc-title-como">
                    <span>{title}:</span>
                    <span>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">

            {/* Logo da marca com switch */}
            {brandPrediction.length > 0 && (() => {

              const brand = formData.brand
              let logo;

              switch (brand) {
                case 'AUDI':
                  logo = AUDI;
                  break;
                case 'FORD':
                  logo = FORD;
                  break;
                case 'CHEVROLET':
                  logo = CHEVROLET;
                  break;
                case 'FIAT':
                  logo = FIAT;
                  break;
                case 'VOLKSWAGEN':
                  logo = VOLKSWAGEN;
                  break;
                case 'HYUNDAI':
                  logo = HYUNDAI;
                  break;
                case 'TOYOTA':
                  logo = TOYOTA;
                  break;
                case 'HONDA':
                  logo = HONDA;
                  break;
                case 'JEEP':
                  logo = JEEP;
                  break;
                case 'NISSAN':
                  logo = NISSAN;
                  break;
                case 'RENAULT':
                  logo = RENAULT;
                  break;
                case 'KIA':
                  logo = KIA;
                  break;
                case 'PEUGEOT':
                  logo = PEUGEOT;
                  break;
                case 'CITROEN':
                  logo = CITROEN;
                  break;
                case 'BMW':
                  logo = BMW;
                  break;
                case 'MERCEDES-BENZ':
                  logo = MERCEDES;
                  break;
                case 'MITSUBISHI':
                  logo = MITSUBISHI;
                  break;
                case 'VOLVO':
                  logo = VOLVO;
                  break;
                case 'CHERY':
                  logo = CHERY;
                  break;
                case 'PORSCHE':
                  logo = PORSCHE;
                  break;
                case 'MINI':
                  logo = MINI;
                  break;
                case 'RAM':
                  logo = RAM;
                  break;
                case 'JAGUAR':
                  logo = JAGUAR;
                  break;
                case 'SUZUKI':
                  logo = SUZUKI;
                  break;
                case 'WILLYS':
                  logo = WILLYS;
                  break;
                case 'LAND':
                  logo = LAND;
                  break;
                default:
                  logo = null;
              }


              return logo ? (
                <div className="top-brand-logo" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <img
                    src={logo}
                    alt={brand}
                    style={{ maxWidth: '200px', height: 'auto' }}
                  />
                  <button id="btn-fechar-projecao-modal" onClick={() => setShowModal(false)}><FontAwesomeIcon size='2x' icon={faX} />Fechar</button>
                </div>
              ) : null;
            })()}

            {/* Continuação do modal */}
            <h2>Previsão por modelos da marca {formData.brand}</h2>

            <div id="container-response-predict">
              <ul className="ul-results">
                {brandPrediction.length > 0 ? (
                  brandPrediction.map((item, index) => (
                    <li key={index} style={{ height: '400px', width: '500px' }}>
                      <div className="row-response-items">
                        <div className="col-response-item">
                          <FontAwesomeIcon icon={faCalendar} size="2x" />
                          <FontAwesomeIcon icon={faDiamond} size="2x" />
                          <FontAwesomeIcon icon={faGauge} size="2x" />
                          <FontAwesomeIcon icon={faMap} size="2x" />
                          <FontAwesomeIcon icon={faCity} size="2x" />
                          <FontAwesomeIcon icon={faCar} size="2x" />
                          <FontAwesomeIcon icon={faGear} size="2x" />
                          <FontAwesomeIcon icon={faGasPump} size="2x" />
                          <FontAwesomeIcon icon={faDollar} size="2x" />
                        </div>
                        <div className="col-response-item">
                          <h3>Ano:</h3>
                          <h3>Modelo:</h3>
                          <h3>Quilometragem:</h3>
                          <h3>UF:</h3>
                          <h3>Cidade:</h3>
                          <h3>Carroceria:</h3>
                          <h3>Câmbio:</h3>
                          <h3>Combustível:</h3>
                          <h3>Preço:</h3>

                        </div>
                        <div className="col-response-item">
                          <span>{item.year_model}</span>
                          <span>{item.model}</span>
                          <span>{item.mileage}</span>
                          <span>{item.state}</span>
                          <span>{item.city}</span>
                          <span>{item.bodywork}</span>
                          <span>{item.gear}</span>
                          <span>{item.fuel}</span>
                          <span>
                            R$ {item.predicted_value?.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                              useGrouping: true,
                            }) || '0,00'}
                          </span>

                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>Nenhum dado de previsão encontrado.</p>
                )}
              </ul>
            </div>


          </div>
        </div>
      )}


    </div>
  );
}
