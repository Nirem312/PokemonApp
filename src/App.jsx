import React, {useState, useEffect} from "react"
import './App.css'
import Banner from "./Banner"
import {DisplayPokemonImage, DisplayPokemonName} from "./displayPokemon"
import {DisplayHintsTypes, DisplayHintsAbilities} from "./displayHints"

let o = 0
let i = 0
let letter=""
let hintCounter = 0
let correctGuess = false
let correctGuessCounter = 0
let getHint = false

export default function App() {
  const [pokemonData, setPokemonData] = useState({})
  const [count, setCount] = useState(1)
  const [show, setShow] = useState(false)
  const [types, setTypes] = useState([])
  const [pokemonAbilities, setPokemonAbilities] = useState([])
  const [formData, setFormData] = useState({answer: ""})

  function handleChange(event) {
    let tryAnswer = event.target.value
    if (tryAnswer.match(/^[a-zA-Z]+$/)) {
      if (tryAnswer.toLowerCase() === pokemonName){
        setShow(true)
        correctGuess = true
        correctGuessCounter++
      }
    }
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [event.target.name]: event.target.value
          }
      })
  }

  function toggle(){
      setShow(prevState => !prevState)
  }

  function getPokemonAbilities(){
    if (getHint === true) {
      o = 0
      for (o in pokemonData.abilities) {
        if (o == 0) {
          setPokemonAbilities(prevAbilities => {return [...prevAbilities, pokemonData.abilities[0].ability.name]})
        } else if (o == 1) {
          setPokemonAbilities(prevAbilities => {return pokemonData.abilities[1].is_hidden ? 
            [...prevAbilities,', '+pokemonData.abilities[1].ability.name+' (Hidden)'] : 
            [...prevAbilities,', '+pokemonData.abilities[1].ability.name]})
        } else if (o == 2) {
          setPokemonAbilities(prevAbilities => {return pokemonData.abilities[2].is_hidden ? 
            [...prevAbilities,', '+pokemonData.abilities[2].ability.name+' (Hidden)'] : 
            [...prevAbilities,', '+pokemonData.abilities[2].ability.name]})
        }
      }
    }
  }

  function getTypes() {
    if (getHint === true) {
      i = 0
      for (i in pokemonData.types) {
        if (i == 0) {
          setTypes(prevTypes => {return [...prevTypes, pokemonData.types[0].type.name]})
        } else if (i == 1) {
          setTypes(prevTypes => {return [...prevTypes,', '+pokemonData.types[1].type.name]})
        }
      }
    }
  }

  function getLetter() {
    return getHint ? "" : letter = pokemonName.charAt(Math.floor(Math.random() * pokemonName.length)).toUpperCase()
  }

  function hint(){
    hintCounter++
    setTypes([])
    setPokemonAbilities([])
    getLetter()
    switch (hintCounter) {
      case 1:
        break;
      case 2:
        getTypes()
        break;
      default:
        getTypes(), getPokemonAbilities()
        break;
    }
    getHint=true
  }
  
  function newPokemon(){
    pokemonName
    setTypes([])
    setCount(() => Math.floor(Math.random() * 905))
    hintCounter = 0
    letter = ""
    getHint = false
    correctGuess = false
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          answer: ""
      }
    })
    if (show === true)
      setShow(false)
  }

  useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon/"+`${count}`)
          .then(res => res.json())
          .then(data => setPokemonData(data))
  }, [count])
  
  const pokemonName = pokemonData.name
  const pokeWiki = 'https://pokemondb.net/pokedex/'+pokemonName
  
  return (
    <div>
        <Banner />

        <h1>Correct guesses: {correctGuessCounter}</h1>
        <input 
          ref={input => input && input.focus()}
          maxLength={25}
          size={25}
          disabled={show}
          type="text"
          className="answer"
          placeholder="Who's that pokemon?"                 
          onChange={handleChange}
          name="answer"
          value={formData.answer}>
        </input>
        <br/>

        {pokemonName && !correctGuess && getHint && <p>This Pokemon name contains this letter: {letter}</p>}

        {pokemonData.types && !correctGuess && getHint && 
        <DisplayHintsTypes 
          pokemonTypes={types}
          typeAmount={i}
        />}

        {pokemonData.abilities && !correctGuess && getHint &&
        <DisplayHintsAbilities 
          pokemonAbilities={pokemonAbilities}
          abilitiesAmount={o}
        />}

        {!correctGuess && !show && <button onClick={hint}>Get a hint ({hintCounter > 3 ? 3 : hintCounter}/3)</button>}

        {pokemonName && 
        <DisplayPokemonName 
          showState={show}
          correctGuess={correctGuess}
          pokeWiki={pokeWiki}
          pokemonName={pokemonName}
        />}

        {pokemonData.sprites && 
        <DisplayPokemonImage 
          showState={show}
          imageInfo={pokemonData.sprites.other.home.front_default}
          pokeInfo={pokemonData}
        />}

        <br/>
        {!correctGuess && !show && <button onClick={toggle}>Reveal Pokemon</button>}
        <button onClick={newPokemon}>Get new Pokemon</button>
    </div>
  )
}


