import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import img from "../../assets/eff2c64b788c57a76c97565a3ec96e6d.jpg";

const host_django = import.meta.env.VITE_API_URL_DJANGO;

export default function Cadastro() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [canInsights, setCanInsights] = useState(false);
    const [canFinalReport, setCanFinalReport] = useState(false);
    const [canPredict, setCanPredict] = useState(false);

    const navigate = useNavigate();

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
            is_admin: false,
            is_corporative: true,
            can_insights: canInsights, // Valor do checkbox
            can_final_report: canFinalReport, // Valor do checkbox
            can_predict: canPredict, // Valor do checkbox
            can_data_visualization: false // Adicionado para evitar erro de banco
        };

        try {
            const response = await axios.post(`${host_django}/user/api/register/`, userData, {
                headers: {
                    "User-Agent": "insomnia/10.1.1",
                    "ngrok-skip-browser-warning": "69420",
                    "Content-Type": "application/json",
                },
            });
            alert("Cadastro realizado com sucesso!");
            console.log("Response:", response.data);
            navigate("/Pages/Login");
        } catch (error) {
            console.error("Erro no cadastro:", error.response?.data || error.message);
            alert(error.response?.data?.username?.[0] || "Erro ao realizar cadastro. Tente novamente.");
        }
    };

    return (
        <div className="cad-container">
            <img src={img} alt="" id='background-img' />
            <form id="form-cad" onSubmit={handleSubmit}>
                <div id="title-box-cad">
                    <span>COMECE DE GRAÇA</span>
                    <span>Crie uma nova conta!</span>
                    <span>
                        Já possui cadastro?<Link style={{ marginLeft: "20px" }} to="/Pages/Login">Login</Link>
                    </span>
                </div>

                <div id="inpts-box-cad">
                    <div className="row-inpt-cad">
                        <div className="inpt-form-cad-field">
                            <input className="half-inpt" type="text" placeholder=" " required onChange={(e) => setName(e.target.value)} />
                            <label>Nome:</label>
                        </div>
                        <div className="inpt-form-cad-field">
                            <input className="half-inpt" type="text" placeholder=" " required onChange={(e) => setLastName(e.target.value)} />
                            <label>Sobrenome:</label>
                        </div>
                    </div>

                    <div className="row-inpt-cad">
                        <div className="inpt-form-cad-field">
                            <input className="half-inpt" type="text" placeholder=" " required onChange={(e) => setUsername(e.target.value)} />
                            <label>Nome de usuário:</label>
                        </div>
                        <div className="inpt-form-cad-field">
                            <input className="half-inpt" type="text" placeholder=" " onChange={(e) => setCompany(e.target.value)} />
                            <label>Empresa (Opcional)</label>
                        </div>
                    </div>

                    <div className="inpt-form-cad-field2">
                        <input className="complete-inpt" type="email" placeholder=" " required onChange={(e) => setEmail(e.target.value)} />
                        <label>E-mail:</label>
                    </div>

                    <div className="inpt-form-cad-field2">
                        <input className="complete-inpt" type="password" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
                        <label>Senha:</label>
                    </div>

                    <div className="inpt-form-cad-field2">
                        <input className="complete-inpt" type="password" placeholder=" " required onChange={(e) => setPassword2(e.target.value)} />
                        <label>Confirme sua senha:</label>
                    </div>

                    {/* Checkboxes para as permissões */}

                </div>
                <div id="permissions-box">

                    <label>
                        <input

                            type="checkbox"
                            checked={canInsights}
                            onChange={(e) => setCanInsights(e.target.checked)}
                        />
                        <label>Insights</label>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={canFinalReport}
                            onChange={(e) => setCanFinalReport(e.target.checked)}
                        />
                        <label>Relatório Final</label>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={canPredict}
                            onChange={(e) => setCanPredict(e.target.checked)}
                        />
                        <label>Previsão de Preços</label>
                    </label>
                </div>
                <div id="bnt-box-cad">
                    <button type="submit">
                        <h3>Criar conta</h3>
                    </button>
                </div>
            </form>
            
        </div>
    );
}
