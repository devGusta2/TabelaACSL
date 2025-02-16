import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Insights.css'; // Import the CSS file
// import './adm.css';
import {faChartLine, faDatabase, faFile} from "@fortawesome/free-solid-svg-icons";
// import logo from '../../src/assets/logo4.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import Menu from '../Components/Menu';

const host_crawler = import.meta.env.VITE_API_URL_CRAWLER;
const token_crawler = import.meta.env.VITE_TOKEN_CRAWLER;
const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Insights = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [taskId, setTaskId] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analyzeData, setAnalyzeData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${host_crawler}/calcs/report/insights/task/machine/${year}/${month}`, {
                headers: {
                    'User-Agent': 'insomnia/10.1.1',
                    'ngrok-skip-browser-warning': '69420',
                    Authorization: `Bearer ${token_crawler}`,
                },
            });
            setTaskId(response.data.task_id);
            setStatus('PENDING');
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    const userToken = localStorage.getItem('token');
    if (!userToken) {
        console.error("Erro: Token não encontrado!");
        setError("Token de autenticação não encontrado.");
        setLoading(false);
        return;
    }

    try {
        const analyzeResponse = await axios.get(`${host_django}/crawler/calcs/analyze/machine/${year}/${month}/`, {
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                'ngrok-skip-browser-warning': '69420',
                Authorization: `Bearer ${userToken}`,
            },
        });

        // Extraindo os dados dentro de "content"
        setAnalyzeData(analyzeResponse.data.content);
    } catch (error) {
        console.error('Erro ao obter análise:', error);
        setError(error.response ? error.response.data : 'Erro desconhecido');
        setLoading(false);
    }
};


    useEffect(() => {
        const checkStatus = async () => {
            if (!taskId) return;

            try {
                const response = await axios.get(`${host_crawler}/core/tasks/status/${taskId}`, {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token_crawler}`,
                    },
                    responseType: 'blob',
                });

                if (response.data.type === 'application/json') {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const result = JSON.parse(reader.result);
                        setStatus(result.status);
                        if (result.status !== 'PDF_GENERATED') {
                            setTimeout(checkStatus, 2000);
                        }
                    };
                    reader.readAsText(response.data);
                } else if (response.data.type === 'application/pdf') {
                    const url = window.URL.createObjectURL(response.data);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'report.pdf');
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (status === 'PENDING') {
            checkStatus();
        }
    }, [status, taskId]);

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
                                    onChange={(e) => setMonth(e.target.value)}
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
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className="insights-container">
                        <form onSubmit={handleSubmit} className="insights-form">
                            <button type="submit">Gerar Relatório</button>
                        </form>
                        {loading && <p className="loading-message">Loading...</p>}
                        {error && <p className="error-message">Error: {error.message}</p>}
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