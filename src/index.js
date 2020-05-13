import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import './index.css';

const App = () => {

  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    encounterWildPokemon()
  }, [])

  const encounterWildPokemon = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
      .then(response => {
        setWildPokemon(response.data);
      })
  }

  const releasePokemon = id => {
    setPokedex(state => state.filter(p => p.id != id))
  }

  const catchPokemon = (pokemon) => {
    setPokedex(state => {
      const pokemonExists = (state.filter(p => pokemon.id == p.id).length > 0);
      if (!pokemonExists){
        state = [...state, pokemon]
        state.sort((a, b) => {
          return a.ib - b.id
        })
      }
      return state
    })
    encounterWildPokemon()
  }

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">React Hooks</h1>
        <h3 className="subtitle">with Pokemon</h3>
      </header>
      <section className="wild-pokemon">
        <h2>Wild Encounter</h2>
        <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} alt={wildPokemon.name} />
        <h3>{wildPokemon.name}</h3>
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
      </section>

      <section className="pokedex">
        <h2>Pokedex</h2>
        <div className="pokedex-list">
          {pokedex.map(pokemon => (
            <div className="pokemon" key={pokemon.id}>
              <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={pokemon.name} />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <button onClick={() => releasePokemon(pokemon.id)} className="remove">&times;</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
