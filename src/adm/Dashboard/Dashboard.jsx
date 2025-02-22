// src/adm/Dashboard/Dashboard.jsx
// src/adm/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Menu from '../Components/Menu';
import './Dashboard.css';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Dashboard = () => {
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2025);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [kpiData, setKpiData] = useState(null);
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetchKpiData();
        fetchGeoData();
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

    const fetchGeoData = async () => {
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
                `${host_django}/crawler/dashboard/geographic_pricing_analysis/machine/${year}/${month}/`,
                {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setGeoData(response.data.content);
        } catch (error) {
            console.error('Erro ao obter dados geográficos:', error);
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

    const geoChartData = geoData?.top_10_states?.map((stateData) => ({
        name: stateData.state,
        total_ads: stateData.total_ads,
        average_price: stateData.average_price
    })) || [];

    return (
        <div className="adm">
            <Menu />
            <div className="content">
                <div className="dashboard-wrapper">
                    <div className="dashboard-header">
                        <h1 className="text-2xl">Indicadores Gerais da Dashboard</h1>
                        <div className="date-selection">
                            <label className="font-bold">
                                Mês:
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={month}
                                    onChange={(e) => setMonth(Number(e.target.value))}
                                    className="p-2"
                                />
                            </label>
                            <label className="font-bold">
                                Ano:
                                <input
                                    type="number"
                                    min="2024"
                                    max={new Date().getFullYear()}
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="p-2"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="dashboard-container">
                        {loading && <p className="loading-message">Carregando...</p>}
                        {error && <p className="error-message">Erro: {error}</p>}
                        {kpiData && (
                            <div className="kpi-data">
                                <h2 className="text-xl">KPI para {year}/{month}</h2>
                                <p><strong>Quantidade total de anúncios analisados:</strong> {kpiData.total_ads}</p>
                                <p><strong>Ano modelo médio dos veículos:</strong> {kpiData.total_average_year_model}</p>
                                <p><strong>Preço médio geral dos veículos:</strong> R$ {kpiData.total_average_price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        )}
                        <div className="charts">
                            <h2 className="text-lg">Dispersão de Preços</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" name="Preço" />
                                    <YAxis dataKey="y" name="Quantidade" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Preço" data={priceScatterData} fill="#ec4899" />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <h2 className="text-lg mt-6">Dispersão de Ano Modelo</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" name="Ano Modelo" />
                                    <YAxis dataKey="y" name="Quantidade" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Ano Modelo" data={scatterData} fill="#ec4899" />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <h2 className="text-lg mt-6">Análise Geográfica</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={geoChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total_ads" fill="#82ca9d" name="Total de Anúncios" />
                                    <Bar dataKey="average_price" fill="#8884d8" name="Preço Médio" />
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

