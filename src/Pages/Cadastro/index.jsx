import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";

const host_django = import.meta.env.VITE_API_URL_DJANGO;

export default function Cadastro() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== password2) {
            alert("As senhas não coincidem!");
            return;
        }

        const userData = {
            first_name: name,
            last_name: lastName,
            username: username,
            company: company || null,
            email: email,
            password: password,
            is_admin: true,
<<<<<<< HEAD
            is_superuser: false,
            is_staff: false,
            is_active: true,
            is_corporative: false,
            contract_start: new Date().toISOString().split('T')[0],
            contract_end: new Date().toISOString().split('T')[0]
=======
>>>>>>> b5d1686f69ac2d3066c34eda087946c611063323
        };

        try {
            const response = await axios.post(`${host_django}/user/api/register/`, userData, {
                headers: {
                    'User-Agent': 'insomnia/10.1.1',
                    'ngrok-skip-browser-warning': '69420',
                    'Content-Type': 'application/json'
                }
            });
            alert("Cadastro realizado com sucesso!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Erro no cadastro:", error.response?.data || error.message);
            alert(error.response?.data?.username?.[0] || "Erro ao realizar cadastro. Tente novamente.");
        }
    };

    return (
        <div className="cad-container">
            <form id="form-cad" onSubmit={handleSubmit}>
                <div id="title-box-cad">
                    <span>COMECE DE GRAÇA</span>
                    <span>Crie uma nova conta!</span>
                    <span>Já possui cadastro?<Link style={{ marginLeft: '20px' }} to='/Pages/Login'>Login</Link></span>
                </div>
                <div id="inpts-box-cad">
                    <div className="row-inpt-cad">
                        <div className="inpt-form-cad-field">
                            <input className='half-inpt' type="text" placeholder=" " required onChange={(e) => setName(e.target.value)} />
                            <label>Nome:</label>
                        </div>
                        <div className="inpt-form-cad-field">
                            <input className='half-inpt' type="text" placeholder=" " required onChange={(e) => setLastName(e.target.value)} />
                            <label>Sobrenome:</label>
                        </div>
                    </div>
                    <div className="row-inpt-cad">
                        <div className="inpt-form-cad-field">
                            <input className='half-inpt' type="text" placeholder=" " required onChange={(e) => setUsername(e.target.value)} />
                            <label>Nome de usuário:</label>
                        </div>
                        <div className="inpt-form-cad-field">
                            <input className='half-inpt' type="text" placeholder=" " onChange={(e) => setCompany(e.target.value)} />
                            <label>Empresa (Opcional):</label>
                        </div>
                    </div>
                    <div className="inpt-form-cad-field2">
                        <input className='complete-inpt' type="email" placeholder=" " required onChange={(e) => setEmail(e.target.value)} />
                        <label>E-mail:</label>
                    </div>
                    <div className="inpt-form-cad-field2">
                        <input className='complete-inpt' type="password" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
                        <label>Senha:</label>
                    </div>
                    <div className="inpt-form-cad-field2">
                        <input className='complete-inpt' type="password" placeholder=" " required onChange={(e) => setPassword2(e.target.value)} />
                        <label>Confirme sua senha:</label>
                    </div>
                </div>
                <div id="bnt-box-cad">
                    <button type="submit"><h3>Criar conta</h3></button>
                </div>
            </form>
        </div>
    );
}
