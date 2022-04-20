import React, { useContext } from 'react';
import { MyContext } from '../context/MyProvider';
import './filter.css';

export default function FilterForm() {
  const { filtercontext: { setGenre,
    setOperator, setNumero }, numero, handleNumericFilter, filteredOptions,
  } = useContext(MyContext);

  return (
    <form id="filterForm">
      <label htmlFor="genero">
        Genre:
        <select
          onChange={ (e) => setGenre(e.target.value) }
          data-testid="column-filter"
          name="genero"
          id="genero"
        >
          {
            filteredOptions.map((op, index) => (
              <option key={ index } value={ op }>{ op }</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="operador">
        Operator:
        <select
          onChange={ (e) => setOperator(e.target.value) }
          data-testid="comparison-filter"
          name="operador"
          id="operador"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="num">
        <input
          data-testid="value-filter"
          value={ numero }
          onChange={ (e) => setNumero(e.target.value) }
          type="number"
          name="num"
          id="num"
        />
      </label>

      <button
        id="filterBtn"
        data-testid="button-filter"
        onClick={ () => {
          handleNumericFilter();
        } }
        type="button"
      >
        Filtrar
      </button>
    </form>
  );
}
