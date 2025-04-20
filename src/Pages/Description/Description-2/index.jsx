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
      
                }}to='../'><FontAwesomeIcon icon={faArrowLeft} size="3x"/><h2>Voltar</h2></Link>
      <h1 className="title" style={{color:'#EF44A1'}}>Definição do DriveIntel</h1>
      <span className="description">
        O <strong>DriveIntel</strong> é uma plataforma de inteligência de mercado para precificação automotiva, desenvolvida para apoiar empresas do setor na definição de estratégias de venda mais lucrativas no momento da saída dos veículos de suas frotas.

Ao coletar e analisar dados históricos e atuais de anúncios de veículos por meio de web scraping (RPA), e aplicar inteligência artificial para prever preços futuros, o DriveIntel fornece insights que ajudam a maximizar o retorno financeiro das empresas no momento do repasse ao consumidor final.

É uma solução pensada para negócios que atuam com volume e operam sob uma abordagem data-driven, onde decisões são guiadas por dados.
      </span>

      <div className="points-section">
        <h2 className="section-title">Pontos-chave da definição:</h2>
        <ul className="list">
          <li style={{ backgroundColor: '#FFCFE9' }}>
            <i className="fas fa-cogs"></i>
            <span>Ferramenta de inteligência de mercado</span>
          </li>
          <li style={{ backgroundColor: '#FFCFE9' }}>
            <i className="fas fa-car-alt"></i>
            <span>Precificação automotiva</span>
          </li>
          <li style={{ backgroundColor: '#FFCFE9' }}>
            <i className="fas fa-bullseye"></i>
            <span>Tomada de decisão estratégica</span>
          </li>
          <li style={{ backgroundColor: '#FFCFE9' }}>
            <i className="fas fa-robot"></i>
            <span>Coleta e análise de dados (web scraping/RPA)</span>
          </li>
          <li style={{ backgroundColor: '#FFCFE9' }}>
            <i className="fas fa-brain"></i>
            <span>Sugestões de preços com IA</span>
          </li>
          <li style={{ backgroundColor: '#FFCFE9' }}>
            <i className="fas fa-chart-pie"></i>
            <span>Para empresas data-driven</span>
          </li>
        </ul>
        <div className="desc-publico-alvo-page">
          O DriveIntel é uma plataforma de inteligência de mercado para precificação automotiva, desenvolvida para apoiar empresas do setor na definição de estratégias de venda mais lucrativas no momento da saída dos veículos de suas frotas.

Ao coletar e analisar dados históricos e atuais de anúncios de veículos por meio de web scraping (RPA), e aplicar inteligência artificial para prever preços futuros, o DriveIntel fornece insights que ajudam a maximizar o retorno financeiro das empresas no momento do repasse ao consumidor final.

É uma solução pensada para negócios que atuam com volume e operam sob uma abordagem data-driven, onde decisões são guiadas por dados.
          Pontos-chave da definição:
          <div id="list-div">
            <ul>
              <li> Ferramenta de inteligência de mercado → Não apenas um sistema de precificação, mas uma plataforma que fornece insights estratégicos.</li>
              <li>Precificação automotiva → Foco no setor automotivo, diferenciando-se de outras soluções genéricas.</li>
                <li> Foco no momento da venda → Ajuda empresas a maximizar o valor de revenda no repasse de veículos, identificando o melhor momento e preço de saída com base em inteligência de mercado.</li>
              <li>Tomada de decisão estratégica → Suporte para definir preços competitivos com base em dados.</li>
              <li>Coleta e análise de dados (web scraping/RPA) → Automação para monitorar preços em tempo real.</li>
              <li>Sugestões de preços com IA → Diferencial competitivo ao definir o valor do anúncio de seus veículos.</li>
              <li> Para empresas data-driven → Indicação clara de que é ideal para quem valoriza decisões baseadas em dados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}