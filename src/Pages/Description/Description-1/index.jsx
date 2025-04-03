import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.css'
import { Link } from "react-router-dom";
export default function Description1(){
    return (
        <div className="container">
          <Link style={{
            display:'flex',
            alignItems:'Center',
            gap:'1em',
            textDecoration:'none',
            color:'#EF44A1'

          }}to='../'><FontAwesomeIcon icon={faArrowLeft} size="3x"/><h2>Voltar</h2></Link>
          <h1 className="title" style={{color:'#EF44A1'}}>DriveIntel: Inteligência de Mercado Automotivo</h1>
    
          <div className="relevant-section">
            <h2 className="section-title" >Para quem o DriveIntel é relevante:</h2>
           
            <ul className="list">
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-store-alt"></i>
                <span>Lojistas e concessionárias</span>
              </li>
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-car"></i>
                <span>Gestores de frotas</span>
              </li>
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-truck"></i>
                <span>Empresas de aluguel de veículos</span>
              </li>
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-chart-line"></i>
                <span>Investidores no mercado automotivo</span>
              </li >
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-credit-card"></i>
                <span>Instituições financeiras</span>
              </li>
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-gavel"></i>
                <span>Leiloeiros</span>
              </li>
            </ul>
            <div className="desc-publico-alvo-page">
            <li>Lojistas e concessionárias – Para definir preços competitivos e antecipar variações no mercado.</li>
            <li>Gestores de frotas – Para calcular o melhor momento de compra e venda de veículos.</li>
            <li>Empresas de aluguel de veículos – Para planejar renovação de frota com base em previsões de preço.</li>
            <li>Investidores no mercado automotivo – Para identificar oportunidades de compra e revenda.</li>
            <li>Instituições financeiras – Para precificação de garantias em financiamentos e seguros automotivos.</li>
            <li>Leiloeiros – Para estimar valores justos de venda e prever tendências do mercado.</li>
            </div>
          </div>
    
          <div className="not-relevant-section">
            <h2 className="section-title">Para quem o DriveIntel não é relevante:</h2>
            <ul className="list">
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-times-circle"></i>
                <span>Consumidores finais</span>
              </li>
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-times-circle"></i>
                <span>Pequenos revendedores sem estratégia de dados</span>
              </li>
              <li style={{backgroundColor:'#FFCFE9'}}>
                <i className="fas fa-tools"></i>
                <span>Mecânicos e oficinas</span>
              </li>
            </ul>
            <div className="desc-publico-alvo-page">
            <li>Consumidores finais que compram apenas um carro para uso próprio – O produto foca em inteligência de mercado e previsões para grandes volumes.</li>
            <li>Pequenos revendedores sem estratégia baseada em dados – Se o modelo de negócio for apenas baseado em feeling e experiência pessoal, sem interesse em análise de mercado, o DriveIntel pode ser subutilizado.</li>
            <li>Mecânicos e oficinas – O foco do produto é precificação de veículos, não manutenção ou reparo.</li>
            </div>
          </div>
        </div>
      );
}