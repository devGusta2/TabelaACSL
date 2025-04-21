import React, { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

const FilterModal = ({ onClose, onApply }) => {
    const [localFilters, setLocalFilters] = useState([{ 
        reference_year: new Date().getFullYear(), 
        reference_month: new Date().getMonth() + 1 
    }]);

    const addFilter = () => {
        setLocalFilters([...localFilters, { reference_year: new Date().getFullYear(), reference_month: new Date().getMonth() + 1 }]);
    };

    const updateFilter = (index, field, value) => {
        setLocalFilters((prevFilters) => {
            const newFilters = [...prevFilters];
            newFilters[index] = { ...newFilters[index], [field]: Number(value) }; // Converte para número
            return newFilters;
        });
    };
 

    useEffect(() => {
        onApply(localFilters); // Chama a função sempre que os filtros mudam
    }, [localFilters]);
    
    return (
        <div className="modal">
            <div className="modal_content">
                {/* <h2>Filtrar datas</h2> */}
                {localFilters.map((filter, index) => (
                    <div key={index} className="filter_item">
                        <div className='icon-inpt'>
                            <div className="icon-label">
                                <FontAwesomeIcon icon={faCalendar} className='icon-filter' size='2x' color='#EF44A1' />
                                <label>Ano:</label>
                            </div>
                            <input
                                type="number"
                                placeholder="Ano"
                                min="1950"
                                value={filter.reference_year}
                                onChange={(e) => updateFilter(index, 'reference_year', e.target.value)}
                            />
                        </div>
                        <div className='icon-inpt'>
                            <div className="icon-label">
                                <FontAwesomeIcon icon={faCalendar} className='icon-filter' size='2x' color='#EF44A1' />
                                <label>Mês:</label>
                            </div>
                            <input
                                type="number"
                                placeholder="Mês"
                                min="1"
                                max="12"
                                value={filter.reference_month}
                                onChange={(e) => updateFilter(index, 'reference_month', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <div className='btn-filter-box'>
                    <button onClick={addFilter}><FontAwesomeIcon icon={faPlus} size='2x'/><h4>Adicionar Filtro</h4></button>
                    <button onClick={() => onApply(localFilters)}><FontAwesomeIcon icon={faCheck} size='2x' /><h4>Aplicar Filtros</h4></button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
