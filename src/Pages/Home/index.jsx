import Menu from '../Components/Menu';
import './index.css'
import { faChartLine, faDatabase, faCalendar, faHome, faChartBar, faFileAlt, faFile, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Home() {
    return (
        <>
            <div className='containter-home'>
                <Menu />
                <div id='bg-home'>
                    <div className="card-map-home">
                        <div className="row-title-icon">
                            <FontAwesomeIcon icon={faChartLine} size="4x" />
                            <h3>Informação Inteligente</h3>
                        </div>
                        <div className="text-dots">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Nemo tempore omnis provident facere totam reprehenderit
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                            </span>
                        </div>
                        <div className="list">
                            <ul>
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>

                            </ul>
                            <ul>
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>

                            </ul>
                        </div>
                    </div>
                    <div className="card-map-home">
                        <div className="row-title-icon">
                            <FontAwesomeIcon icon={faLightbulb} size="4x" />
                            <h3>Predição de Preços</h3>
                        </div>
                        <div className="text-dots">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Nemo tempore omnis provident facere totam reprehenderit
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                            </span>
                        </div>
                        <div className="list">
                            <ul>
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>

                            </ul>
                            <ul>
                                <li>Requisito 1</li>
                            
                                <li>Requisito 3</li>

                            </ul>
                        </div>
                    </div>
                    <div className="card-map-home">
                        <div className="row-title-icon">
                            <FontAwesomeIcon icon={faDatabase} size="4x" />
                            <h3>Visualização de dados</h3>
                        </div>
                        <div className="text-dots">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Nemo tempore omnis provident facere totam reprehenderit
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                            </span>
                        </div>
                        <div className="list">
                            <ul>
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>

                            </ul>
                            <ul>
                                <li>Requisito 1</li>
          
                            </ul>
                        </div>
                    </div>
                    <div className="card-map-home">
                        <div className="row-title-icon">
                            <FontAwesomeIcon icon={faFile} size="4x" />
                            <h3>Relatórios</h3>
                        </div>
                        <div className="text-dots">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Nemo tempore omnis provident facere totam reprehenderit
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                                eos harum neque, corrupti doloribus nostrum autem cumque vel
                                excepturi magni odio praesentium unde?
                            </span>
                        </div>
                        <div className="list">
                            <ul>
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>

                            </ul>
                       
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}