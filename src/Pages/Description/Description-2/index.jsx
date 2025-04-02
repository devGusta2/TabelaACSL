import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './index.css'
export default function Description1() {
  return (
    <div className="container">
       <Link style={{
                  display:'flex',
                  alignItems:'Center',
                  gap:'1em',
                  textDecoration:'none',
                  color:'#EF44A1'
      
                }}to='../'><FontAwesomeIcon icon={faArrowLeft} size="3x"/>Voltar</Link>
      <h1 className="title" style={{color:'#EF44A1'}}>Definição do DriveIntel</h1>
      <span className="description">
        O <strong>DriveIntel</strong> é uma ferramenta de inteligência de mercado para precificação automotiva, desenvolvida para apoiar negócios do setor na tomada de decisão estratégica de preços. Ele coleta e analisa dados históricos e atuais de anúncios de veículos por meio de web scraping (RPA), utiliza inteligência artificial para prever preços futuros e oferece insights baseados em dados para empresas que operam sob um modelo data-driven.
      </span>

      <div className="points-section">
        <h2 className="section-title">Pontos-chave da definição:</h2>
        <ul className="list">
          <li style={{ backgroundColor: '#FA8FB1' }}>
            <i className="fas fa-cogs"></i>
            <span>Ferramenta de inteligência de mercado</span>
          </li>
          <li style={{ backgroundColor: '#FA8FB1' }}>
            <i className="fas fa-car-alt"></i>
            <span>Precificação automotiva</span>
          </li>
          <li style={{ backgroundColor: '#FA8FB1' }}>
            <i className="fas fa-bullseye"></i>
            <span>Tomada de decisão estratégica</span>
          </li>
          <li style={{ backgroundColor: '#FA8FB1' }}>
            <i className="fas fa-robot"></i>
            <span>Coleta e análise de dados (web scraping/RPA)</span>
          </li>
          <li style={{ backgroundColor: '#FA8FB1' }}>
            <i className="fas fa-brain"></i>
            <span>Previsão de preços com IA</span>
          </li>
          <li style={{ backgroundColor: '#FA8FB1' }}>
            <i className="fas fa-chart-pie"></i>
            <span>Para empresas data-driven</span>
          </li>
        </ul>
        <div className="desc-publico-alvo-page">
          O DriveIntel é uma ferramenta de inteligência de mercado para precificação automotiva, desenvolvida para apoiar negócios do setor na tomada de decisão estratégica de preços. Ele coleta e analisa dados históricos e atuais de anúncios de veículos por meio de web scraping (RPA), utiliza inteligência artificial para prever preços futuros e oferece insights baseados em dados para empresas que operam sob um modelo data-driven.
          Pontos-chave da definição:
          <div id="list-div">
            <ul>
              <li> Ferramenta de inteligência de mercado → Não apenas um sistema de precificação, mas uma plataforma que fornece insights estratégicos.</li>
              <li>Precificação automotiva → Foco no setor automotivo, diferenciando-se de outras soluções genéricas.</li>
              <li>Tomada de decisão estratégica → Suporte para definir preços competitivos com base em dados.</li>
              <li>Coleta e análise de dados (web scraping/RPA) → Automação para monitorar preços em tempo real.</li>
              <li>Previsão de preços com IA → Diferencial competitivo ao antecipar tendências do mercado.</li>
              <li> Para empresas data-driven → Indicação clara de que é ideal para quem valoriza decisões baseadas em dados</li>
            </ul>






          </div>
        </div>
      </div>
    </div>
  );
}