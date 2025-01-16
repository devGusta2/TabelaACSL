import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Insights.css'; // Import the CSS file

const Insights = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [taskId, setTaskId] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://0.0.0.0:8087/calcs/report/insights/task/machine/${year}/${month}`, {
                headers: {
                    'User-Agent': 'insomnia/10.1.1',
                    Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
                },
            });
            setTaskId(response.data.task_id);
            setStatus('PENDING');
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkStatus = async () => {
            if (!taskId) return;

            try {
                const response = await axios.get(`http://0.0.0.0:8087/core/tasks/status/${taskId}`, {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
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

    return (
        <div className="insights-container">
            <h1>Insights</h1>
            <form onSubmit={handleSubmit} className="insights-form">
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
                <button type="submit">Gerar Relatório</button>
            </form>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}
        </div>
    );
};

export default Insights;