import React from "react";
import './index.css';
import { Link } from "react-router-dom";
export default function Cadastro() {
    return (
        <>
            <div className="cad-container">
                <form action="" id="form-cad">
                    <div id="title-box-cad">
                        <span>COMECE DE GRAÇA</span>
                        <span>Crie uma nova conta!</span>
                        <span>Já possui cadastro?<Link style={{ marginLeft: '20px' }} to='/Pages/Login'>Login</Link></span>
                    </div>
                    <div id="inpts-box-cad">
                        <div className="row-inpt-cad">
                            <div className="inpt-form-cad-field">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='half-inpt' type="text" placeholder=" " required onChange={(e) =>setName(e.target.value)} />
                                <label>Nome:</label>
                            </div>
                            <div className="inpt-form-cad-field">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='half-inpt' type="text" placeholder=" " required onChange={(e) => setLastName(e.target.value)} />
                                <label>Sobrenome:</label>
                            </div>
                        </div>
                        <div className="row-inpt-cad">
                            <div className="inpt-form-cad-field">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='half-inpt' type="text" placeholder=" " required onChange={(e) => setUsername(e.target.value)} />
                                <label>Nome de usuario:</label>
                            </div>
                            <div className="inpt-form-cad-field">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='half-inpt' type="text" placeholder=" " required onChange={(e) => setCompany(e.target.value)} />
                                <label>Empresa (Opicional):</label>
                            </div>
                        </div>
                        
                        
                            <div className="inpt-form-cad-field2">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='complete-inpt'type="text" placeholder=" " required onChange={(e) => setEmail(e.target.value)} />
                                <label>E-mail:</label>
                            </div>
                            
                            <div className="inpt-form-cad-field2">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='complete-inpt'type="text" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
                                <label>Senha:</label>
                            </div><div className="inpt-form-cad-field2">
                                {/* <FontAwesomeIcon className='icon-login-form' icon={faUser} size="2x" /> */}
                                <input className='complete-inpt'type="text" placeholder=" " required onChange={(e) => setPassword2(e.target.value)} />
                                <label>Confirme sua senha:</label>
                            </div>
                    </div>
                    <div id="bnt-box-cad">
                        <button><h3>Criar conta</h3></button>
                    </div>
                </form>
            </div>
        </>
    );
}