import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img from '../../assets/eff2c64b788c57a76c97565a3ec96e6d.jpg'
import axios from "axios";
import './index.css'

const host_django = import.meta.env.VITE_API_URL_DJANGO;





import { useNavigate } from "react-router-dom";

export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [erroSenha, setErroSenha] = useState(false);
    const navigate = useNavigate(); // Hook para navegação

    const auth = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            console.log("Erro: Preencha os campos corretamente.");
            return;
        }

        const data = { username, password };

        const options = {
            method: 'POST',
            url: `${host_django}/user/api/token/`,
            headers: {
                'User-Agent': 'insomnia/10.1.1',
                'ngrok-skip-browser-warning': '69420',
                'Content-Type': 'application/json'
            },
            data
        };

        try {
            const response = await axios.request(options);
            console.log("Login bem-sucedido!", response.data);

            localStorage.setItem("token", response.data.access);
            // const permissions = {
            //     canViewRawData: response.user.is_admin ? "True" : "False",
            //     canAcesseInsights: response.user.can_insights ? "True" : "False",
            //     canPricePredict: response.user.can_predict ? "True" : "False"
            // };
            // localStorage.setItem("userPermissions", JSON.stringify(permissions));
            localStorage.setItem("isAdmin", response.data.user.is_admin)
            if (!response.data.user.is_admin) {
                const userPermissions = {
                    canViewRawData: "False",
                    canAcesseInsights: response.data.user.can_insights ? "True" : "False",
                    canPricePredict: response.data.user.can_predict ? "True" : "False",
                    canDataVisualization: response.data.user.can_data_visualization ? "True" : "False"
                };
            
                localStorage.setItem("userPermissions", JSON.stringify(userPermissions));
            }
            console.log( response.data.user.can_final_report,response.data.user.can_insights , response.data.user.can_predict)
            // Redireciona após o login bem-sucedido
             navigate("/adm/Home");  // Substitua "/dashboard" pela rota desejada
          

        } catch (error) {
            console.log("Erro ao logar: ", error.response ? error.response.data : error.message);
            if (error.response && error.response.data.detail === "Usuário e/ou senha incorreto(s)") {
                setErroSenha(true);
            }
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
                            <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x"/>
                            <input type="text" placeholder=" " required onChange={(e) => setUserName(e.target.value)}/>
                            <label>Nome de usuário:</label>
                        </div>
                        <div className="inpt-form-login-field">
                            <FontAwesomeIcon className='icon-login-form' icon={faLock} size="2x"/>
                            <input type="password" placeholder=" " required
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <label>Senha:</label>
                        </div>
                        {erroSenha && <h5 style={{color:'red'}}>Login ou senha incorretos!</h5>}
                        <div id="btn-remeber-and-forgot-pass">
                            <div>
                                <input type="checkbox"/>
                                <span>Manter logado</span>
                            </div>
                            <Link to='*' style={{color: '#ef44a1'}}>Esqueceu sua senha ?</Link>
                        </div>
                        
                        <div id="btn-login-box">
                            <button type="submit">
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                    <div id="login-signup-box">
                        <span>Ainda não tem uma conta? <span
                            style={{color: '#ef44a1'}}><Link to='/Pages/Cadastro'>Faça já seu cadastro!</Link></span></span>
                    </div>
                </div>
            </div>
        </>
    );
}