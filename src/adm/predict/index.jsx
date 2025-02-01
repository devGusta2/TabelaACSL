
import './Index.css'
import Menu from '../Components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
export default function Predict(){
    return(
        <>
            <div className='predict'>
                <Menu />
                <div className='content'>
                    <div id='icon-car'>
                        <FontAwesomeIcon style={{color:'#EF44A1'}}icon={faCar} size='7x'/>
                        <h2>Hb20</h2>
                    </div>
                </div>
            </div>
        </>
    );
}