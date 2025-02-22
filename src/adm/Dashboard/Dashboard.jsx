// src/adm/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Label } from 'recharts';
import './Dashboard.css';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Dashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [kpiData, setKpiData] = useState(null);

    useEffect(() => {
        fetchKpiData();
    }, [month, year]);

    const fetchKpiData = async () => {
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

    const priceDistributionData = Array.isArray(kpiData?.top_10_price_distribution)
        ? kpiData.top_10_price_distribution.map((item, index) => ({
            range: `Faixa ${index + 1}`,
            price: item.price,
            frequency: item.frequency
        }))
        : [{ range: 'Sem dados', price: 0, frequency: 0 }];

    const yearDistributionData = Array.isArray(kpiData?.top_10_year_model_distribution)
        ? kpiData.top_10_year_model_distribution.map((item) => ({
            year: item.year_model,
            frequency: item.frequency
        }))
        : [{ year: 'Sem dados', frequency: 0 }];

    return (
        <div className="adm p-4">
            <div className="content">
                <div className="dashboard-wrapper">
                    <div className="dashboard-header text-center mb-4">
                        <h1 className="text-2xl font-bold text-pink-600">Indicadores Gerais da Dashboard</h1>
                        <div className="date-selection flex gap-4 justify-center mt-4">
                            <label className="font-bold text-pink-500">
                                Mês:
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={month}
                                    onChange={(e) => setMonth(Number(e.target.value))}
                                    className="p-2 border border-pink-300 rounded"
                                />
                            </label>
                            <label className="font-bold text-pink-500">
                                Ano:
                                <input
                                    type="number"
                                    min="2024"
                                    max={new Date().getFullYear()}
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="p-2 border border-pink-300 rounded"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="dashboard-container bg-pink-50 p-4 rounded-lg shadow-md w-4/5 max-w-4xl mx-auto flex flex-col items-center">
                        {loading && <p className="loading-message text-pink-500 font-bold">Carregando...</p>}
                        {error && <p className="error-message text-red-500 font-bold">Erro: {error}</p>}
                        {kpiData && (
                            <div className="kpi-data bg-white p-4 rounded-lg shadow-md w-full mb-4">
                                <h2 className="text-xl font-bold text-pink-600 mb-2">KPI para {year}/{month}</h2>
                                <p><strong>Quantidade total de anúncios analisados:</strong> {kpiData.total_ads}</p>
                                <p><strong>Ano modelo médio dos veículos:</strong> {kpiData.total_average_year_model}</p>
                                <p><strong>Preço médio geral dos veículos:</strong> R$ {kpiData.total_average_price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        )}
                        <div className="charts w-full">
                            <h2 className="text-lg font-bold text-pink-600 mb-2">Distribuição de Preços</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={priceDistributionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="price">
                                        <Label value="Preços" offset={-5} position="insideBottom" />
                                    </XAxis>
                                    <YAxis>
                                        <Label value="Frequência" angle={-90} position="insideLeft" />
                                    </YAxis>
                                    <Tooltip />
                                    <Bar dataKey="frequency" fill="#ec4899" />
                                </BarChart>
                            </ResponsiveContainer>

                            <h2 className="text-lg font-bold text-pink-600 mt-6 mb-2">Distribuição de Ano Modelo</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={yearDistributionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year">
                                        <Label value="Ano Modelo" offset={-5} position="insideBottom" />
                                    </XAxis>
                                    <YAxis>
                                        <Label value="Frequência" angle={-90} position="insideLeft" />
                                    </YAxis>
                                    <Tooltip />
                                    <Bar dataKey="frequency" fill="#ec4899" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
