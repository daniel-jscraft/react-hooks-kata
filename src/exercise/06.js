// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {useState, useEffect} from 'react'
import {PokemonForm, fetchPokemon, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {
  let [status, setStatus] = useState({code:'idle'})

  useEffect( () => {
    if(pokemonName) {
      setStatus({code:'pending'})
      fetchPokemon(pokemonName).then(
        (data) => {
          setStatus({
            code : 'resolved',
            data
          })
        },
        (error) => {
          setStatus({
            code : 'rejected',
            error
          })
        } 
      )
    }
  }, [pokemonName])

  if (status.code === 'pending') {
    return 'Loading ....'
  }

  if (status.code === 'resolved') {
    return(<PokemonDataView pokemon={status.data} />)
  }

  if (status.code === 'rejected') {
    return (<div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{status.error.message}</pre>
    </div>)
  }

  if (status.code === 'idle') {
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
