import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.css'
export default function Description1(){
  return (
    <div className="container">
      <h1 className="title">Definição do DriveIntel</h1>
      <span className="description">
        O <strong>DriveIntel</strong> é uma ferramenta de inteligência de mercado para precificação automotiva, desenvolvida para apoiar negócios do setor na tomada de decisão estratégica de preços. Ele coleta e analisa dados históricos e atuais de anúncios de veículos por meio de web scraping (RPA), utiliza inteligência artificial para prever preços futuros e oferece insights baseados em dados para empresas que operam sob um modelo data-driven.
      </span>

      <div className="points-section">
        <h2 className="section-title">Pontos-chave da definição:</h2>
        <ul className="list">
          <li>
            <i className="fas fa-cogs"></i>
            <span>Ferramenta de inteligência de mercado</span>
          </li>
          <li>
            <i className="fas fa-car-alt"></i>
            <span>Precificação automotiva</span>
          </li>
          <li>
            <i className="fas fa-bullseye"></i>
            <span>Tomada de decisão estratégica</span>
          </li>
          <li>
            <i className="fas fa-robot"></i>
            <span>Coleta e análise de dados (web scraping/RPA)</span>
          </li>
          <li>
            <i className="fas fa-brain"></i>
            <span>Previsão de preços com IA</span>
          </li>
          <li>
            <i className="fas fa-chart-pie"></i>
            <span>Para empresas data-driven</span>
          </li>
        </ul>
      </div>
    </div>
  );
}