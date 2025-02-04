import React, { useState } from 'react';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
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
                        <input
                            type="number"
                            placeholder="Ano"
                            value={filter.reference_year}
                            onChange={(e) => updateFilter(index, 'reference_year', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Mês"
                            value={filter.reference_month}
                            onChange={(e) => updateFilter(index, 'reference_month', e.target.value)}
                        />
                    </div>
                ))}
                <div className='btn-filter-box'>
                    <button onClick={addFilter}><FontAwesomeIcon icon={faPlus} size='2x'/>Adicionar Filtro</button>
                    <button onClick={() => onApply(localFilters)}><FontAwesomeIcon icon={faCheck} size='2x'/>Aplicar Filtros</button>
                 
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
