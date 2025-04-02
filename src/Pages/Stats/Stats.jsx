import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stats.css';
import Menu from "../Components/Menu/index.jsx";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from '../Components/Filter';
const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Stats = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const fetchStats = async () => {
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
        `${host_django}/crawler/calcs/analyze/describe/market/machine/${year}/${month}/`,
        {
          headers: {
            'User-Agent': 'insomnia/10.1.1',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatsData(response.data.content);
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      setError(error.response ? error.response.data : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [year, month]);

  return (
    <div className="adm">
      <Menu />
      <div className="content">
        <div id="title_box">
          <FontAwesomeIcon className="icon-pink" size='3x' icon={faChartPie} />
          <span>Estatísticas</span>
        </div>
        <Filter year={year} setYear={setYear} month={month} setMonth={setMonth} onFilter={fetchStats} />
        {loading && <p className="loading-message">Carregando...</p>}
        {error && <p className="error-message">Erro: {error}</p>}
        {statsData && (
          <div className="stats-table">
            <h2>Estatísticas para {year}/{month}</h2>
            <table>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Count</th>
                  <th>Mean</th>
                  <th>Std</th>
                  <th>Min</th>
                  <th>25%</th>
                  <th>50%</th>
                  <th>75%</th>
                  <th>Max</th>
                </tr>
              </thead>
              <tbody>
                {statsData.describe && statsData.describe.brands && Object.entries(statsData.describe.brands).map(([brand, data]) => (
                  <tr key={brand}>
                    <td>{brand}</td>
                    <td>{data.count}</td>
                    <td>{data.mean}</td>
                    <td>{data.std}</td>
                    <td>{data.min}</td>
                    <td>{data["25%"]}</td>
                    <td>{data["50%"]}</td>
                    <td>{data["75%"]}</td>
                    <td>{data.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;