import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faDatabase, faChartLine, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Menu from './Components/Menu';
import logo from '../../src/assets/logo4.png';

import './adm.css';


export default function Adm() {
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
            <Menu /> {/* Substitua o menu atual pelo componente Menu */}
        </div>
    );
}