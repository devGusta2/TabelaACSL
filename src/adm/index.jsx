import './adm.css';
import logo from '../../src/assets/logo4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Adm() {
    const [taskId, setTaskId] = useState();
    const [records, setRecords] = useState([]); // Armazena os registros da API
    const [loading, setLoading] = useState(false); // Indica se está verificando o status
    const [status, setStatus] = useState('');

    // Função para carregar os carros
    const loadCars = async () => {
        const options = {
            method: 'GET',
            url: `http://0.0.0.0:8087/core/records/list/task/porsche?page=1&page_size=10&reference_year_start=0&reference_month_start=0&reference_year_end=0&reference_month_end=0`,
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
            }
        };

        try {
            const response = await axios.request(options);
            setTaskId(response.data.task_id);
            setStatus('PENDING'); // Define o status inicial como PENDING
            console.log('Task ID:', response.data.task_id);
        } catch (error) {
            console.error('Erro ao carregar os carros:', error);
        }
    };

    // Função para verificar o status da tarefa
    const checkStatus = async () => {
        if (!taskId) return;
        setLoading(true); // Ativa o estado de carregamento
        const options = {
            method: 'GET',
            url: `http://0.0.0.0:8087/core/tasks/status/${taskId}`,
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529'
            }
        };

        try {
            const response = await axios.request(options);
            console.log('Status da tarefa:', response.data);
            setStatus(response.data.status);

            // Se o status for SUCCESS, atualiza os registros
            if (response.data.status === 'SUCCESS') {
                setRecords(response.data.result.records);
                setLoading(false); // Para o carregamento
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
        try {
            await axios.delete(`http://0.0.0.0:8087/core/records/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer a7f3e4f0b118bcf44c6f76dce9d56be8d12081c9a0107b214de617ac4a1a0529',
                },
            });
            alert('Registro deletado com sucesso!');
            setRecords(records.filter(record => record.id !== id)); // Remove o registro da tabela
        } catch (error) {
            console.error('Erro ao deletar o registro:', error);
        }
    };

    // Função para atualizar um registro
    const handleUpdate = (id) => {
        alert(`Atualizar registro: ${id}`);
        // Aqui você pode implementar o redirecionamento para a página de edição
    };

    useEffect(() => {
        loadCars(); // Carrega os carros ao montar o componente
    }, []);

    useEffect(() => {
        if (status === 'PENDING') {
            checkStatus(); // Inicia a verificação do status
        }
    }, [status]);

    return (
        <>
            <div className='adm'>
                <div className="menu">
                    <img src={logo} alt="" />
                    <nav>
                        <ul>
                            <li>
                                <a link='/adm' href="">
                                    <FontAwesomeIcon icon={faFile} size='2x' />
                                    <h3>Anúncios</h3>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="content">
                    <div className="card_box">
                        <div className="card">
                            <h1>984</h1>
                            <h5>Veículos</h5>
                        </div>
                    </div>
                    <div className="info">
    {/* Tabela de registros */}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano Modelo</th>
                <th>Ano de Referência</th>
                <th>Preço</th>
                <th>Data de Criação</th>
                <th>Última Atualização</th>
                <th>Descrição</th>
                <th>URL</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {records.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.title}</td>
                    <td>{record.brand}</td>
                    <td>{record.model}</td>
                    <td>{record.year_model}</td>
                    <td>{record.year_reference}</td>
                    <td>
                        {record.price
                            ? `R$ ${record.price.toLocaleString("pt-BR")}`
                            : "N/A"}
                    </td>
                    <td>{new Date(record.created_at).toLocaleString()}</td>
                    <td>{new Date(record.updated_at).toLocaleString()}</td>
                    <td>
                        {record.description ? record.description : "Sem descrição"}
                    </td>
                    <td>
                        <a href={record.url} target="_blank" rel="noopener noreferrer">
                            Link
                        </a>
                    </td>
                    <td>
                        <button onClick={() => handleUpdate(record.id)}>Update</button>
                        <button onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

                </div>
            </div>
        </>
    );
}
