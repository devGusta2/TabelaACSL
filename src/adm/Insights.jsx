import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            setTaskId(response.data.taskId);
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
                });
                setStatus(response.data.status);

                if (response.data.status === 'SUCCESS') {
                    const pdfResponse = await axios.get(`http://0.0.0.0:8087/core/tasks/download/${taskId}`, {
                        headers: {
                            'User-Agent': 'insomnia/10.1.1',
                            Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
                        },
                        responseType: 'blob',
                    });
                    const url = window.URL.createObjectURL(new Blob([pdfResponse.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'report.pdf');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    setLoading(false);
                } else {
                    setTimeout(checkStatus, 2000);
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
        <div>
            <h1>Insights</h1>
            <form onSubmit={handleSubmit}>
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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Insights;