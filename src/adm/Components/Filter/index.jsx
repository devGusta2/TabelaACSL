import React, { useState } from 'react';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
const FilterModal = ({ onClose, onApply }) => {
    const [localFilters, setLocalFilters] = useState([{ reference_year: 2025, reference_month: 1 }]);

    const addFilter = () => {
        setLocalFilters([...localFilters, { reference_year: 0, reference_month: 0 }]);
    };

    const updateFilter = (index, field, value) => {
        const updatedFilters = [...localFilters];
        updatedFilters[index][field] = value;
        setLocalFilters(updatedFilters);
    };

    return (
        <div className="modal">
            <div className="modal_content">
                <h2>Filtrar Anúncios</h2>
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
                                min='1950'
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
                                min='1'
                                max='12'
                                value={filter.reference_month}
                                onChange={(e) => updateFilter(index, 'reference_month', e.target.value)}
                            />
                        </div>

                    </div>
                ))}
                <div className='btn-filter-box'>
                    <button onClick={addFilter}><FontAwesomeIcon icon={faPlus} size='2x' />Adicionar Filtro</button>
                    <button onClick={() => onApply(localFilters)}><FontAwesomeIcon icon={faCheck} size='2x' />Aplicar Filtros</button>

                </div>
            </div>
        </div>
    );
};

export default FilterModal;
