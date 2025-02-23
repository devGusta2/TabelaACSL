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

     return (
        <div className="adm">
            <Menu />
            <div className="final-report">
                <h1 className="text-2xl">Datas de Referência do Relatório Final</h1>
                {loading && <p className="loading-message">Carregando...</p>}
                {error && <p className="error-message">Erro: {error}</p>}
                {!loading && !error && (
                    <table className="reference-dates-table">
                        <thead>
                            <tr>
                                <th>Ano de Referência</th>
                                <th>Mês de Referência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referenceDates.map((date, index) => (
                                <tr key={index}>
                                    <td>{date.year_reference}</td>
                                    <td>{date.month_reference}</td>
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