import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './index.css'
import img from '../../assets/eff2c64b788c57a76c97565a3ec96e6d.jpg'
export default function Login() {
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
                    <form id="login-form-box">
                        <div className="inpt-form-login-field">
                            <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" />
                            <input type="text" placeholder=" " />
                            <label>Nome de usuário:</label>
                        </div>
                        <div className="inpt-form-login-field">
                            <FontAwesomeIcon className='icon-login-form' icon={faLock} size="2x" />
                            <input type="text" placeholder=" " />
                            <label>Senha:</label>
                        </div>
                        <div id="btn-remeber-and-forgot-pass">
                            <div>
                                <input type="checkbox" />
                                <span>Manter logado</span>
                            </div>
                            <Link to='*'>Esqueceu sua senha ?</Link>
                        </div>
                        <div id="btn-login-box">
                            <button>
                            <span>Login</span>
                            </button>
                        </div>
                    </form>
                    <div id="login-signup-box">
                        <span>Ainda não tem uma conta? <span>Faça já seu cadastro!</span></span>
                    </div>
                </div>
            </div>
        </>
    );
}