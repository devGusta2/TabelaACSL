
import './Index.css'
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCrown } from '@fortawesome/free-solid-svg-icons';
export default function Predict(){
    return(
        <>
            <div className='predict'>
                <Menu />
                <div className='content'>
                    <div className='column-predict'>
                        <div id='icon-car'>
                            <FontAwesomeIcon style={{color:'#EF44A1'}}icon={faCar} size='5x'/>
                            <h3>Hb20</h3>
                        </div>
                        <div id='name-model'></div>
                        <div id='graphicBox'></div>
                      
                    </div>
                    <form id="form">
                        <div className='column-predict-form'>
                            <div className='option-box'>
                                <div className="label-box">
                                    <FontAwesomeIcon icon={faCrown} size='2x'/>
                                </div>
                                <select>
                                    
                                </select>
                            </div>
                        </div>
                        <div className='column-predict-form'></div>
                    </form>
                </div>
            </div>
        </>
    );
}