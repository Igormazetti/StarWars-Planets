import React, { useContext } from "react";
import "./table.css";
import { MyContext } from "../context/MyProvider";

export default function Table() {
  const {
    data,
    handleNameFilter,
    numericFilter,
    handleDeleteFilter,
    handleRemoveAll,
  } = useContext(MyContext);

  return (
    <div>
      <div>
        {numericFilter
          ? numericFilter.map((obj, index) => (
              <div className="filtersdiv" data-testid="filter" key={index}>
                <p>{obj.column}</p>
                <p>{obj.comparison}</p>
                <p>{obj.value}</p>
                <button
                  className="btnSingleRemove"
                  onClick={handleDeleteFilter}
                  name={obj.column}
                  type="button"
                >
                  X
                </button>
              </div>
            ))
          : ""}
      </div>

      <button
        id="removeAllBtn"
        onClick={handleRemoveAll}
        type="button"
        data-testid="button-remove-filters"
      >
        Remover Filtragens
      </button>

      <div id="namefilter">
        <label htmlFor="nfilter">
          Planet Name
          <input
            id="nfilter"
            data-testid="name-filter"
            type="text"
            onChange={({ target }) => {
              handleNameFilter(target.value);
            }}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
