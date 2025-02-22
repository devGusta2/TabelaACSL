// src/adm/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const Dashboard = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const machine = 'machine'; // Máquina fixa
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [kpiData, setKpiData] = useState(null);

    const fetchKpiData = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        if (!token) {
            setError("Authentication token not found.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${host_django}/crawler/dashboard/general_kpi/${machine}/${year}/${month}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'User-Agent': 'insomnia/8.4.1',
                    },
                }
            );

            console.log("API Response:", response.data); // Log completo da resposta
            setKpiData({ ...response.data.content }); // Garante a atualização do estado
        } catch (error) {
            console.error('Error fetching KPI data:', error);
            setError(error.response ? error.response.data : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Renderizando com kpiData:", kpiData);
    }, [kpiData]);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="date-selection">
                <label>
                    Month:
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
                    Year:
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
            <button onClick={fetchKpiData}>Fetch KPI Data</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}

            {/* Verifica se os dados existem antes de exibir */}
            {kpiData && kpiData.total_ads !== undefined ? (
                <div className="kpi-data" style={{ border: "1px solid red", padding: "10px" }}>
                    <h2>KPI Data for {month}/{year}</h2>
                    <p><strong>Total Ads:</strong> {kpiData.total_ads}</p>
                    <p><strong>Average Year Model:</strong> {kpiData.average_year_model}</p>
                    <p><strong>Average Price:</strong> {kpiData.average_price}</p>
                </div>
            ) : (
                <p>No data available</p>
            )}

            {/* Mostra os dados crus para debugging */}
            <pre>{JSON.stringify(kpiData, null, 2)}</pre>
        </div>
    );
};

export default Dashboard;
