import React from 'react';

import './filters.css';

import { Item } from '../../../types'

type Maping = {
  [key: string]: string,
  electronetwork: string,
  accumulator: string
}

type PropsFilters = {
  data: Array<Item>,
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleRadio: (e: React.ChangeEvent<HTMLInputElement>) => void,
  sortingInitialGoods: () => void
}

const renderInput = (handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void,
      brand: string) => {
  const lowerBrand = brand.toLowerCase();
  return (
    <li className="filter-option" key={lowerBrand}>
      <input onChange={handleCheckbox}
        className="visually-hidden filter-input-checkbox" type="checkbox"
        defaultChecked name={lowerBrand} id={lowerBrand} />
      <label className="checkbox" htmlFor={lowerBrand}>{brand}</label>
    </li>
  )
}

const renderRadio = (handleRadio: (e: React.ChangeEvent<HTMLInputElement>) => void,
      power: string, name: string) => {
  const maping: Maping = {
    electronetwork: 'сетевые',
    accumulator: 'аккумуляторные'
  }
  const defaultChecked = power === 'electronetwork' ? true : false;
  return (
    <li className="filter-option" key={power}>
      <input onChange={handleRadio} defaultChecked={defaultChecked}
      className="visually-hidden filter-input-radio"
      type="radio" name={name} id={power} />
      <label className="radio" htmlFor={power}>{maping[power]}</label>
    </li>
  )
}

const Filters = ({data, handleCheckbox, handleRadio, sortingInitialGoods}: PropsFilters) => {
  let brands = data.map((item) => {
    return item.brand
  });
  const uniqueBrands = new Set(brands);
  brands = Array.from(uniqueBrands);
  const inputs = brands.map((brand) => {
    return renderInput(handleCheckbox, brand)
  });

  let powers = data.map((item) => {
    return item.powerSupply
  });
  const uniquePowers = new Set(powers);
  powers = Array.from(uniquePowers);
  const radioInputs = powers.map((item) => {
    return renderRadio(handleRadio, item, 'powerSupply')
  });

  return (
    <section className="filter-catalog">
      <div className="filterh2"><p className="filter-headline">Фильтры:</p></div>
      <form method="get" action="https://echo.htmlacademy.ru">
         <div className="manufacturer">
           <fieldset >
              <legend>Производители:</legend>
              <ul>
                {inputs}
              </ul>
           </fieldset>
         </div>
         <div className="supply">
           <fieldset>
              <legend>Питание:</legend>
              <ul>
                {radioInputs}
              </ul>
           </fieldset>
           <button onClick={(e) => {
             e.preventDefault();
             sortingInitialGoods()
           }}
           className="show" type="submit">Показать</button>
         </div>
      </form>
    </section>
  )
}

export default Filters;
