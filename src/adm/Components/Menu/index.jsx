import './index.css'
import logo from '../../../../src/assets/logo4.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDatabase, faCalendar, faFile} from '@fortawesome/free-solid-svg-icons';
export default function Menu(){
    return(
        <>
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
                                    <li>
                                        <Link to="/adm/predict">
                                            <FontAwesomeIcon icon={faCalendar} size="2x"/>
                                            <h3>Predição</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
        </>
    );
}