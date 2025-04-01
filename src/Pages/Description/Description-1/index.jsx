import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.css'
export default function Description1(){
    return (
        <div className="container">
          <h1 className="title">DriveIntel: Inteligência de Mercado Automotivo</h1>
    
          <div className="relevant-section">
            <h2 className="section-title">Para quem o DriveIntel é relevante:</h2>
            <ul className="list">
              <li>
                <i className="fas fa-store-alt"></i>
                <span>Lojistas e concessionárias</span>
              </li>
              <li>
                <i className="fas fa-car"></i>
                <span>Gestores de frotas</span>
              </li>
              <li>
                <i className="fas fa-truck"></i>
                <span>Empresas de aluguel de veículos</span>
              </li>
              <li>
                <i className="fas fa-chart-line"></i>
                <span>Investidores no mercado automotivo</span>
              </li>
              <li>
                <i className="fas fa-credit-card"></i>
                <span>Instituições financeiras</span>
              </li>
              <li>
                <i className="fas fa-gavel"></i>
                <span>Leiloeiros</span>
              </li>
            </ul>
          </div>
    
          <div className="not-relevant-section">
            <h2 className="section-title">Para quem o DriveIntel não é relevante:</h2>
            <ul className="list">
              <li>
                <i className="fas fa-times-circle"></i>
                <span>Consumidores finais</span>
              </li>
              <li>
                <i className="fas fa-times-circle"></i>
                <span>Pequenos revendedores sem estratégia de dados</span>
              </li>
              <li>
                <i className="fas fa-tools"></i>
                <span>Mecânicos e oficinas</span>
              </li>
            </ul>
          </div>
        </div>
      );
}