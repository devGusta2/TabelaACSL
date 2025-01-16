import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from '../../src/assets/logo4.png';
import './adm.css';

export default function Adm() {
    const [taskId, setTaskId] = useState();
    const [records, setRecords] = useState([]); // Armazena os registros da API
    const [loading, setLoading] = useState(false); // Indica se está verificando o status
    const [status, setStatus] = useState('');
    const [editableRecords, setEditableRecords] = useState([]);

    // Função para lidar com mudanças nos valores dos inputs
    const handleChange = (id, field, value) => {
        setEditableRecords((prevRecords) =>
            prevRecords.map((record) =>
                record.id === id ? { ...record, [field]: value } : record
            )
        );
    };

    const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(20);

const handlePageChange = (e) => {
    setPage(e.target.value);
};

const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    loadCars();
};


    // Função para carregar os registros
    const loadCars = async () => {
        const options = {
            method: 'POST',
            url: `http://0.0.0.0:8087/records/list/task/machine?page=${page}&page_size=${pageSize}`,
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
            },
        data: {
            reference_dates: [
                {
                    reference_year: 2025, // Isso tem que ser uma variável
                    reference_month: 1  // é possível passar uma lista de dicts reference dates
                }
            ]
        }
    };


        try {
            const response = await axios.request(options);
            setTaskId(response.data.task_id);
            setStatus('PENDING');
        } catch (error) {
            console.error('Erro ao carregar os carros:', error);
        }
    };

    const downloadExcel = async () => {
    const options = {
        method: 'GET',
        url: `http://0.0.0.0:8087/core/download/excel/${taskId}/machine`,
        headers: {
            'User-Agent': 'insomnia/10.1.1',
            Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
        },
        responseType: 'blob', // Define o tipo de resposta como blob
    };

    try {
        const response = await axios.request(options);

        // Cria um link para o download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'planilha.xlsx'); // Nome do arquivo
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};

    // Função para verificar o status da tarefa
    const checkStatus = async () => {
        if (!taskId) return;
        setLoading(true);
        const options = {
            method: 'GET',
            url: `http://0.0.0.0:8087/core/tasks/status/${taskId}`,
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
            },
        };

        try {
            const response = await axios.request(options);
            setStatus(response.data.status);

            if (response.data.status === 'SUCCESS') {
                setRecords(response.data.result.records);
                setEditableRecords(response.data.result.records); // Define os registros como editáveis
                setLoading(false);
            } else {
                setTimeout(checkStatus, 2000); // Recheca após 2 segundos
            }
        } catch (error) {
            console.error('Erro ao verificar o status:', error);
            setLoading(false);
        }
    };

    // Função para deletar um registro
    const handleDelete = async (id) => {
        const options = {
            method: 'DELETE',
            url: 'http://0.0.0.0:8087/records/deactivate/task/machine',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
            },
            data: [id],
        };

        try {
            await axios.request(options);
            alert('Registro deletado com sucesso!');
            setRecords(records.filter((record) => record.id !== id));
            setEditableRecords(editableRecords.filter((record) => record.id !== id));
        } catch (error) {
            console.error('Erro ao deletar o registro:', error);
        }
    };

    // Função para atualizar um registro
    const handleUpdate = async (id) => {
        const updatedRecord = editableRecords.find((record) => record.id === id);
        const options = {
            method: 'PUT',
            url: 'http://0.0.0.0:8087/records/update/machine',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
            },
            data: {
                records: [
                    {
                        record_id: id,
                        data: {
                            title: updatedRecord.title,
                            price: updatedRecord.price,
                            description: updatedRecord.description,
                            mileage: updatedRecord.mileage || 0, // Ajuste conforme os dados
                        },
                    },
                ],
            },
        };

        try {
            await axios.request(options);
            alert('Registro atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o registro:', error);
        }
    };

    useEffect(() => {
        loadCars();
    }, []);

    useEffect(() => {
        if (status === 'PENDING') {
            checkStatus();
        }
    }, [status]);


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const correctPassword = 'MelÉVida@5'; // Substitua pela senha desejada

    const handleLogin = () => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Senha incorreta!');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="login">
                <div className="login_box">
                    <div className="login_detail">
                    <FontAwesomeIcon icon={faUser} size="7x" />
                    <h3>Admin</h3>
                    </div>
                    <div className="login_form">
                        <h2>Login</h2>
                        <p>Área restrita</p>
                        <input
                            type="password"
                            placeholder="Digite a palavra passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Entrar</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="adm">
            <div className="menu">
                <img src={logo} alt=""/>
                <nav>
                    <ul>
                        <li>
                            <Link to="/adm">
                                <FontAwesomeIcon icon={faFile} size="2x"/>
                                <h3>Home</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/adm/insights">
                                <FontAwesomeIcon icon={faChartLine} size="2x"/>
                                <h3>Insights</h3>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

    <div className="content">
        <div className="card_box">
            <div className="card">
                <button onClick={downloadExcel} className="btn_download">Download Excel</button>
                {/* Download button */}

            </div>
        </div>
        <div className="info">
                    <form onSubmit={handleSubmit} className="form_pagination">
                        <label>
                            Página:
                            <input type="number" value={page} onChange={handlePageChange} className="input_pagination"/>
                        </label>
                        <label>
                            Quantidade de Anúncios:
                            <input type="number" value={pageSize} onChange={handlePageSizeChange}
                                   className="input_pagination"/>
                        </label>
                        <button type="submit" className="btn_pagination">Visualizar</button>
                    </form>
                    <table>
                        <thead>
                        <tr>
                            <th>Título</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {editableRecords.map((record) => (
                            <tr key={record.id}>
                                <td>
                                    <input
                                        value={record.title}
                                        onChange={(e) =>
                                            handleChange(record.id, 'title', e.target.value)
                                        }
                                    />
                                </td>
                                <td>{record.brand}</td>
                                <td>{record.model}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={record.price}
                                        onChange={(e) =>
                                            handleChange(record.id, 'price', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        value={record.description}
                                        onChange={(e) =>
                                            handleChange(record.id, 'description', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button className='btn_update' onClick={() => handleUpdate(record.id)}>Atualizar
                                    </button>
                                    <button className='btn_delete' onClick={() => handleDelete(record.id)}>Desativar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
