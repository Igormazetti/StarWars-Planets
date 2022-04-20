import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

export default function MyProvider({ children }) {
  const [nameData, setNameData] = useState([]);
  const [data, setData] = useState([]);
  const [numericFilter, setNumericFilter] = useState([]);
  const [genre, setGenre] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numero, setNumero] = useState(0);
  const [originalOptions, setOriginalOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [usedOptions, setUsedOptions] = useState([]);
  const filtercontext = {
    setGenre,
    setOperator,
    setNumero,
  };

  const handleNameFilter = (filter) => {
    if (filter === '') {
      return setData(nameData);
    }
    const getByName = data.filter((item) => item.name.toLowerCase().includes(filter));
    setData(getByName);
  };

  const filter = () => {
    numericFilter.forEach((obj) => {
      const getFiltered = data.filter((item) => {
        if (obj.comparison === 'maior que') {
          return Number(item[obj.column]) > Number(obj.value);
        }
        if (obj.comparison === 'menor que') {
          return Number(item[obj.column]) < Number(obj.value);
        }
        return Number(item[obj.column]) === Number(obj.value);
      });
      setData(getFiltered);
    });
  };

  const handleRemoveAll = () => {
    setNumericFilter([]);
    setData(nameData);
    setFilteredOptions(originalOptions);
    setNumero(0);
  };

  const handleDeleteFilter = ({ target }) => {
    if (numericFilter.length === 1) {
      setData(nameData);
      setNumero(0);
    }
    const remove = numericFilter.filter((item) => item.column !== target.name);
    setNumericFilter(remove);
    const removed = usedOptions.filter((item) => item !== target.name);
    setUsedOptions(removed);
  };

  const handleNumericFilter = () => {
    setNumericFilter((prevState) => [...prevState, {
      column: genre,
      comparison: operator,
      value: Number(numero),
    }]);

    setUsedOptions((prev) => [...prev, genre]);
  };

  useEffect(() => {
    filter();
  }, [numericFilter]);

  useEffect(() => {
    const newOptions = originalOptions.filter((opt) => !usedOptions.includes(opt));
    setFilteredOptions(newOptions);
  }, [usedOptions]);

  useEffect(() => {
    setOriginalOptions(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setFilteredOptions(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    async function fetchData() {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const request = await fetch(URL);
      const response = await request.json();
      setData(response.results);
      setNameData(response.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <MyContext.Provider
        value={ { data,
          handleNameFilter,
          setNumericFilter,
          numericFilter,
          filtercontext,
          numero,
          filter,
          handleRemoveAll,
          handleDeleteFilter,
          filteredOptions,
          handleNumericFilter } }
      >
        {children}
      </MyContext.Provider>
    </div>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
