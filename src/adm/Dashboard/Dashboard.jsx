// src/adm/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
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

    const scatterData = Array.isArray(kpiData?.top_10_year_model_distribution)
        ? kpiData.top_10_year_model_distribution.map((item) => ({
            x: item.year_model,
            y: item.frequency
        }))
        : [];

    const priceScatterData = Array.isArray(kpiData?.top_10_price_distribution)
        ? kpiData.top_10_price_distribution.map((item) => ({
            x: item.price,
            y: item.frequency
        }))
        : [];

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
                            <h2 className="text-lg font-bold text-pink-600 mb-2">Dispersão de Preços</h2>
                            <h4 className="text-sm text-gray-600 mb-2">Distribuição de preços por frequência</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" name="Preço" label={{ value: 'Preço', position: 'insideBottom', offset: -5 }} />
                                    <YAxis dataKey="y" name="Quantidade de Anúncios" label={{ value: 'Quantidade de Anúncios', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Preço" data={priceScatterData} fill="#ec4899" />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <h2 className="text-lg font-bold text-pink-600 mt-6 mb-2">Dispersão de Ano Modelo</h2>
                            <h4 className="text-sm text-gray-600 mb-2">Distribuição de anos modelos por frequência</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" name="Ano Modelo" label={{ value: 'Ano Modelo', position: 'insideBottom', offset: -5 }} />
                                    <YAxis dataKey="y" name="Quantidade de Anúncios" label={{ value: 'Quantidade de Anúncios', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Ano Modelo" data={scatterData} fill="#ec4899" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

