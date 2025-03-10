import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    ComposedChart,
    Bar,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ScatterChart
} from 'recharts';
import Menu from '../Components/Menu';
import './Dashboard.css';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Dashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loadingCount, setLoadingCount] = useState(0);
    const [error, setError] = useState(null);
    const [kpiData, setKpiData] = useState({ total_ads: 0, total_average_year_model: 0, total_average_price: 0 });
    const [geoData, setGeoData] = useState({ top_10_states: [] });

    const setLoading = (isLoading) => {
        setLoadingCount((prev) => (isLoading ? prev + 1 : Math.max(prev - 1, 0)));
    };

    const fetchData = useCallback(async (endpoint, setData, defaultData) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        if (!token) {
            setError("Token de autenticação não encontrado.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${host_django}${endpoint}`, {
                headers: {
                    'User-Agent': 'insomnia/10.1.1',
                    'ngrok-skip-browser-warning': '69420',
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data.content || defaultData);
        } catch (error) {
            console.error(`Erro ao obter dados de ${endpoint}:`, error);
            setError(error.response?.data?.message || error.message || 'Erro desconhecido');
            setData(defaultData);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(`/crawler/dashboard/general_kpi/machine/${year}/${month}/`, setKpiData, {
            total_ads: 0,
            total_average_year_model: 0,
            total_average_price: 0,
            top_10_year_model_distribution: [], // Adicionando fallback para top_10_year_model_distribution
            top_10_price_distribution: [], // Adicionando fallback para top_10_price_distribution
        });
        fetchData(`/crawler/dashboard/geographic_pricing_analysis/machine/${year}/${month}/`, setGeoData, { top_10_states: [] });
    }, [month, year, fetchData]);


    const scatterData = Array.isArray(kpiData?.top_10_year_model_distribution)
        ? kpiData.top_10_year_model_distribution.map(({ year_model, frequency }) => ({
            x: year_model,
            y: frequency,
        }))
        : [];

    const priceScatterData = Array.isArray(kpiData?.top_10_price_distribution)
        ? kpiData.top_10_price_distribution.map(({ price, frequency }) => ({
            x: price,
            y: frequency,
        }))
        : [];

    const geoChartData = Array.isArray(geoData?.top_10_states)
        ? geoData.top_10_states.map(({ state, total_ads, average_price }) => ({
            name: state,
            total_ads,
            average_price,
        }))
        : [];


    return (
        <div className="adm">
            <Menu />
            <div className="content">

                <div className="dashboard-header">
                    <div className="title_box">
                        <h2 className='text-2xl '>Indicadores gerais da dashboard</h2>
                    </div>
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
                                aria-label="Selecione o mês"
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
                                aria-label="Selecione o ano"
                            />
                        </label>
                    </div>
                    {loadingCount > 0 && <p className="loading-message">Carregando...</p>}
                    {error && <p className="error-message">Erro: {error}</p>}
                    {(kpiData || {}) && (
                        <div className="kpi-data">
                            <h2 className="text-xl">KPI para {year}/{month}</h2>
                            <p><strong>Total de anúncios:</strong> {kpiData?.total_ads ?? 0}</p>
                            <p><strong>Ano modelo médio:</strong> {kpiData?.total_average_year_model ?? 0}</p>
                            <p><strong>Preço médio:</strong> R$ {(kpiData?.total_average_price ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                    )}

                </div>
                <div className="dashboard-container">
                    <div id="title_chart_box">
                        <h2 className="text-lg">Dispersão de Preços</h2>
                        <h2 className="text-lg">Dispersão de Ano Modelo</h2>
                    </div>
                    <div className="charts">
                        <div className="row-chart">
                            <ResponsiveContainer width="50%" height='100%'>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" name="Preço" label={{ value: 'Preço', position: 'insideBottom', offset: -5 }} />
                                    <YAxis dataKey="y" name="Quantidade de Anúncios" label={{ value: 'Quant. Anúncios', angle: -90, position: 'insideLeft', dy: 80 }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Preço" data={priceScatterData} fill="#ec4899" />
                                </ScatterChart>
                            </ResponsiveContainer>

                            <ResponsiveContainer width="50%" height='100%'>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" name="Ano Modelo" label={{ value: 'Ano Modelo', position: 'insideBottom', offset: -5 }} />
                                    <YAxis dataKey="y" name="Quantidade de Anúncios" label={{ value: 'Quant. Anúncios', angle: -90, position: 'insideLeft', dy: 80 }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Ano Modelo" data={scatterData} fill="#ec4899" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                        <div id="title_chart_box">
                            <h2 className="text-lg mt-6">Correlação por Estado</h2>
                        </div>
                        <div className="row-chart">

                            <ResponsiveContainer width="90%" height='100%'>
                                <ComposedChart data={geoChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" label={{ value: 'Total de Anúncios', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Preço Médio', angle: -90, position: 'insideRight' }} />
                                    <Tooltip />
                                    <Bar yAxisId="left" dataKey="total_ads" fill="#ffcfe9" name="Total de Anúncios" />
                                    <Scatter yAxisId="right" dataKey="average_price" fill="#ec4899" name="Preço Médio" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                  
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

