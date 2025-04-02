import React from 'react';
import './Stats.css';
import Menu from "../Components/Menu/index.jsx";
import {faChartPie} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Stats = () => {
  return (
<div className="adm">
        <Menu />
        <div className="content">
            <div id="title_box">
                <FontAwesomeIcon className="icon-pink" size='3x' icon={faChartPie} />
                <span>Estatísticas</span>
            </div>
            {/* Rest of your component code */}
        </div>
    </div>
    );
};

export default Stats;