// src/adm/Dashboard/Dashboard.jsx
// src/adm/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Dashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [kpiData, setKpiData] = useState(null);

    useEffect(() => {
        console.log('Dashboard component mounted');
        handleFetchKPI();
    }, [month, year]);

    const handleFetchKPI = async () => {
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
                `${host_django}/crawler/dashboard/general_kpi/machine/${year}/${month}/`,
                {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setKpiData(response.data.content);
        } catch (error) {
            console.error('Erro ao obter dados do KPI:', error);
            setError(error.response ? error.response.data : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adm">
            <div className="content">
                <div className="dashboard-wrapper">
                    <div className="dashboard-header">
                        <h1>Indicadores Gerais da Dashboard</h1>
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
                    <div className="dashboard-container">
                        {loading && <p className="loading-message">Carregando...</p>}
                        {error && <p className="error-message">Erro: {error}</p>}
                        {kpiData && (
                            <div className="kpi-data">
                                <h2>KPI para {year}/{month}</h2>
                                <p><strong>Total de Anúncios:</strong> {kpiData.total_ads}</p>
                                <p><strong>Média do Ano Modelo:</strong> {kpiData.average_year_model}</p>
                                <p><strong>Preço Médio:</strong> {kpiData.average_price}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;