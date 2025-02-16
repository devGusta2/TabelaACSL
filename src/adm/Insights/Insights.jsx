import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Insights.css'; // Import the CSS file
// import './adm.css';
import {faChartLine, faDatabase, faFile} from "@fortawesome/free-solid-svg-icons";
// import logo from '../../src/assets/logo4.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import Menu from '../Components/Menu';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Insights = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analyzeData, setAnalyzeData] = useState(null);

    const handleDownload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(
                `${host_django}/crawler/download/final_report/${year}/${month}/`,
                {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'blob',
                }
            );

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `final_report_${year}_${month}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao baixar o relatório:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        if (!token) {
            setError("Token de autenticação não encontrado.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${host_django}/crawler/calcs/analyze/machine/${year}/${month}/`,
                {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAnalyzeData(response.data.content);
        } catch (error) {
            console.error('Erro ao obter análise:', error);
            setError(error.response ? error.response.data : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleAnalyze();
    }, [month, year]);

    return (
        <div className="adm">
            <Menu />
            <div className="content">
                <div className="insights-wrapper">
                    <div className="insights-header">
                        <h1>Insights sobre Precificação de Veículos</h1>
                        <div className="date-selection">
                            <label>
                                Mês:
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={month}
                                    onChange={(e) => setMonth(Number(e.target.value))}
                                    required
                                />
                            </label>
                            <label>
                                Ano:
                                <input
                                    type="number"
                                    min="2024"
                                    max={new Date().getFullYear()}
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className="insights-container">
                        <button onClick={handleDownload}>Baixar Relatório</button>
                        {loading && <p className="loading-message">Carregando...</p>}
                        {error && <p className="error-message">Erro: {error}</p>}
                        {analyzeData && (
                            <div className="analyze-data">
                                <h2>Análise para {analyzeData.year_reference}/{analyzeData.month_reference}</h2>
                                <p><strong>Valorização Máxima:</strong> {analyzeData.analysis["Valorização Máxima"]}</p>
                                <p><strong>Depreciação Máxima:</strong> {analyzeData.analysis["Depreciação Máxima"]}</p>
                                <p><strong>Modelo Mais Consistente:</strong> {analyzeData.analysis["Modelo Mais Consistente"]}</p>
                                <p><strong>Modelo Mais Variado:</strong> {analyzeData.analysis["Modelo Mais Variado"]}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;