import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faDatabase, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
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
                        <li>
                            <Link to="/adm/raw-data">
                                <FontAwesomeIcon icon={faDatabase} size="2x"/>
                                <h3>Raw Data</h3>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}