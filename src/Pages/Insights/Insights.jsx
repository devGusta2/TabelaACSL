import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Insights.css';
import Menu from '../Components/Menu';
import { faCalendar, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Insights = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [insightsData, setInsightsData] = useState(null);

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
                `${host_django}/crawler/calcs/insights/machine/${year}/${month}/`,
                {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setInsightsData(response.data.content);
        } catch (error) {
            console.error('Erro ao obter insights:', error);
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
                <div id="title_box">
                    <FontAwesomeIcon size='5x' icon={faChartBar} />
                    <span>Informações inteligentes sobre Precificação de Veículos</span>
                </div>

                {loading && <p className="loading-message">Carregando...</p>}
                {error && <p className="error-message">Erro: {error}</p>}
                {insightsData && (
                    <div id="cards_info_box">
                        <div className="row_cards">
                            <div id="data_box">
                                <div className="inpt_label_field">
                                    <div className="label_icon_box">
                                        <FontAwesomeIcon size='3x' icon={faCalendar} />
                                        <label>Mês</label>
                                    </div>
                                    <input
                                        placeholder='Insira um mês'
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={month}
                                        onChange={(e) => setMonth(Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="inpt_label_field">
                                    <div className="label_icon_box">
                                        <FontAwesomeIcon size='3x' icon={faCalendar} />
                                        <label>Ano:</label>
                                    </div>
                                    <input
                                        type="number"
                                        min="2024"
                                        max={new Date().getFullYear()}
                                        value={year}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        required
                                        placeholder='Insira ano modelo'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row_cards">
                            <div className="insights">
                                <h2>Insights para {insightsData.year_reference}/{insightsData.month_reference}</h2>
                                <ul>
                                    {insightsData.insights.map((insight, index) => (
                                        <li key={index}>{insight}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Insights;