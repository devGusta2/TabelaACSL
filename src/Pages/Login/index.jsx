import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img from '../../assets/eff2c64b788c57a76c97565a3ec96e6d.jpg'
import axios from "axios";
import './index.css'

const host_django = import.meta.env.VITE_API_URL_DJANGO;





export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

 

    const auth = async (e) => {
        e.preventDefault();
        
        // Verifica se username e password existem antes de enviar
        if (!username || !password) {
            console.log("Erro: Preencha os campos corretamente.");
            return;
        }
    
        const data = {
            username: username,
            password: password
        };
    
        const options = {
            method: 'POST',
            url: `${host_django}/user/api/token/`,
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                'ngrok-skip-browser-warning': '69420',
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        try {
            const response = await axios.request(options);
    
            // Exibir resposta no console
            console.log("Login bem-sucedido!", response.data);
    
            // Se precisar armazenar o token para próximas requisições
            localStorage.setItem("token", response.data.access);
    
        } catch (error) {
            console.log("Erro ao logar: ", error.response ? error.response.data : error.message);
        }
    };
    
    
    return (
        <>
            <div className="login-container">
                <img id="background-img" src={img}>

                </img>
                <div id="login-column">
                    <div id="login-title-box">
                        <span>Login</span>
                        <br />
                        <span>Bem vindo(a) de volta. Entre na sua conta!</span>
                    </div>
                    <form id="login-form-box" onSubmit={auth}>
                        <div className="inpt-form-login-field">
                            <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" />
                            <input type="text" placeholder=" " required onChange={(e) => setUserName(e.target.value)} />
                            <label>Nome de usuário:</label>
                        </div>
                        <div className="inpt-form-login-field">
                            <FontAwesomeIcon className='icon-login-form' icon={faLock} size="2x" />
                            <input type="text" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
                            <label>Senha:</label>
                        </div>
                        <div id="btn-remeber-and-forgot-pass">
                            <div>
                                <input type="checkbox" />
                                <span>Manter logado</span>
                            </div>
                            <Link to='*' style={{ color: '#ef44a1' }}>Esqueceu sua senha ?</Link>
                        </div>
                        <div id="btn-login-box">
                            <button type="submit">
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                    <div id="login-signup-box">
                        <span>Ainda não tem uma conta? <span style={{ color: '#ef44a1' }}>Faça já seu cadastro!</span></span>
                    </div>
                </div>
            </div>
        </>
    );
}