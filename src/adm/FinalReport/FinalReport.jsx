import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinalReport.css';
import Menu from "../Components/Menu/index.jsx";

const host_django = import.meta.env.VITE_API_URL_DJANGO;

const FinalReport = () => {
    const [referenceDates, setReferenceDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReferenceDates = async () => {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');

            if (!token) {
                setError("Token de autenticação não encontrado.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${host_django}/crawler/aux/final_report/reference_dates/`, {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReferenceDates(response.data.content);
            } catch (error) {
                console.error('Erro ao obter datas de referência:', error);
                setError(error.response ? error.response.data : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchReferenceDates();
    }, []);

    const handleDownload = async (year, month) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(
                `${host_django}/crawler/download/final_report/${year}/${month}/`,
                {
                    headers: {
                        'User-Agent': 'insomnia/10.1.1',
                        'ngrok-skip-browser-warning': '69420',
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'blob',
                }
            );

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `final_report_${year}_${month}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            const errorMessage = error.response?.data?.content?.message || 'Erro ao baixar o relatório.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adm">
            <Menu />
            <div className="final-report">
                <h1 className="text-2xl">Relatórios Finais Mensais</h1>
                {loading && <p className="loading-message">Carregando...</p>}
                {error && <p className="error-message">Erro: {error}</p>}
                {!loading && !error && (
                    <table className="reference-dates-table">
                        <thead>
                            <tr>
                                <th>Ano de Referência</th>
                                <th>Mês de Referência</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referenceDates.map((date, index) => (
                                <tr key={index}>
                                    <td>{date.year_reference}</td>
                                    <td>{date.month_reference}</td>
                                    <td>
                                        <button onClick={() => handleDownload(date.year_reference, date.month_reference)}>
                                            Baixar Relatório
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default FinalReport;