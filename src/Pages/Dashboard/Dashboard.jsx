import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, ComposedChart, Bar
} from 'recharts';
import Menu from '../Components/Menu';
import TooltipAjuda from '../Components/Tooltip/Tooltip';
import './Dashboard.css';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Dashboard = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [kpiData, setKpiData] = useState(null);
  const [geoData, setGeoData] = useState({ top_10_states: [] });

  // Debounce control
  const [debouncedMonth, setDebouncedMonth] = useState(month);
  const [debouncedYear, setDebouncedYear] = useState(year);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMonth(month);
      setDebouncedYear(year);
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [month, year]);

  // Função genérica de requisição
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

  // Carrega dados ao mudar mês/ano com debounce
  useEffect(() => {
    fetchData(`/crawler/dashboard/general_kpi/machine/${debouncedYear}/${debouncedMonth}/`, setKpiData, {
      total_ads: 0,
      most_frequent_year_model: 0,
      total_average_price: 0,
      top_10_year_model_distribution: [],
      top_10_price_distribution: [],
    });
    fetchData(`/crawler/dashboard/geographic_pricing_analysis/machine/${debouncedYear}/${debouncedMonth}/`, setGeoData, { top_10_states: [] });
  }, [debouncedMonth, debouncedYear, fetchData]);

  // Dados do gráfico
  const scatterData = Array.isArray(kpiData?.top_10_year_model_distribution)
    ? kpiData.top_10_year_model_distribution.map(item => ({ x: item.year_model, y: item.frequency }))
    : [];

  const priceScatterData = Array.isArray(kpiData?.top_10_price_distribution)
    ? kpiData.top_10_price_distribution.map(item => ({ x: item.price, y: item.frequency }))
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
          <h2 className="text-2xl">Dashboard {year}/{month}</h2>

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

          {loading && <p className="loading-message">Carregando...</p>}
          {error && <p className="error-message">Erro: {error}</p>}

          {kpiData && (
            <div className="kpi-data">
              <div className="kpi-header">
                <h2 className="text-xl">Visão Geral do Mercado</h2>
                <TooltipAjuda text="
                  Tais indicadores representam um panorama abrangente do mercado automotivo
                  para o período selecionado. O recorte considera <strong>todos</strong> os anúncios
                  disponíveis no mês e ano de referência, permitindo uma análise completa da oferta de veículos.">
                  <div></div>
                </TooltipAjuda>
              </div>
              <p><strong>Total de anúncios:</strong> {kpiData?.total_ads ?? 0}</p>
              <p><strong>Ano modelo mais frequente:</strong> {kpiData?.most_frequent_year_model ?? 0}</p>
              <p><strong>Preço médio:</strong> R$ {(kpiData?.total_average_price ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          )}
        </div>

        <div className="dashboard-container">
          <div className="charts">
            <div id="title_chart_box">
              <h2 className="text-lg">Dispersão de Preços</h2>
              <TooltipAjuda text="
                Dados baseados nos <strong>10 preços mais frequentes</strong> do mercado, revelando clusters e tendências.">
                <div></div>
              </TooltipAjuda>

              <h2 className="text-lg">Dispersão de Ano Modelo</h2>
              <TooltipAjuda text="Análise dos <strong>10 anos-modelo mais ofertados</strong>, útil para entender padrões de oferta.">
                <div></div>
              </TooltipAjuda>
            </div>

            <div className="row-chart">
              <ResponsiveContainer width="50%" height={'100%'}>
                <ScatterChart key={debouncedMonth + '-' + debouncedYear + '-price'}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" name="Preço" label={{ value: 'Preço', position: 'insideBottom', offset: -5 }} />
                  <YAxis dataKey="y" name="Quantidade de Anúncios" label={{ value: 'Quant. Anúncios', angle: -90, position: 'insideLeft', dy: 80 }} />
                  <Tooltip />
                  <Scatter data={priceScatterData} fill="#ec4899" isAnimationActive />
                </ScatterChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="50%" height={'100%'}>
                <ScatterChart key={debouncedMonth + '-' + debouncedYear + '-year'}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" name="Ano Modelo" label={{ value: 'Ano Modelo', position: 'insideBottom', offset: -5 }} />
                  <YAxis dataKey="y" name="Quantidade de Anúncios" label={{ value: 'Quant. Anúncios', angle: -90, position: 'insideLeft', dy: 80 }} />
                  <Tooltip />
                  <Scatter data={scatterData} fill="#ec4899" isAnimationActive />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div id="title_chart_box">
              <h2 className="text-lg mt-6">Correlação de Preço Médio e Quantidade de Anúncios por Estado</h2>
              <TooltipAjuda text="
                Considera os <strong>10 estados com mais anúncios</strong>, revelando relação entre preços e volume.">
                <div></div>
              </TooltipAjuda>
            </div>

            <div className="row-chart">
              <ResponsiveContainer width="100%"height={'100%'}>
                <ComposedChart data={geoChartData} key={debouncedMonth + '-' + debouncedYear + '-geo'}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" label={{ value: 'Estado', position: 'insideBottom', offset: -5 }} />
                  <YAxis yAxisId="left" orientation="left" label={{ value: 'Quant. Anúncios', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Preço Médio', angle: -90, position: 'insideRight' }} />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="total_ads" fill="#EC95C3" />
                  <Scatter yAxisId="right" dataKey="average_price" fill="#ec4899" isAnimationActive />
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
