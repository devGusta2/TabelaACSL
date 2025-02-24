import Menu from '../Components/Menu';
import './index.css'
import bgCarHome from '../../assets/home-wallapapper.jpg'
export default function Home(){
    return(
        <>
            <div className='containter-home'>
                <Menu />
                <img id='bg-home' src={bgCarHome}/>
                
            </div>
        </>
    );
}