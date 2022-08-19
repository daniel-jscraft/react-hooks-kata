// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {useState, useEffect} from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {
  let [pokemon, setPokemon] = useState()
  let [error, setError] = useState()
  let [status, setStatus] = useState('idle')

  useEffect( () => {
    if(pokemonName) {

      setPokemon(null)
      setError(null)
      setStatus('pending')

      fetchPokemon(pokemonName).then(
        (response) => {
          setPokemon(response)
          setStatus('resolved')
        },
        (error) => {
          setError(error)
          setStatus('rejected')
        } 
      )
    }
  }, [pokemonName])

  if (status === 'pending') {
    return 'Loading ....'
  }

  if (status === 'resolved') {
    return(<PokemonDataView pokemon={pokemon} />)
  }

  if (status === 'rejected') {
    return (<div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>)
  }

  if (status === 'idle') {
    return 'Submit a pokemon'
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
