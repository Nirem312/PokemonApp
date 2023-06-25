import React, { useContext } from 'react'
import { UserContext } from './App';
import './App.css'

let show = false

export function DisplayPokemonImage(props){
    show = useContext(UserContext);
    {return (show ? <img className="pokestyle" src={props.imageInfo}/> : 
    <img className="pokestyle" style={{WebkitFilter: 'contrast(0%) brightness(60%)'}} src={props.imageInfo}/>)}
}

export function DisplayPokemonName(props){
    show = useContext(UserContext);
    {return (show ? <h1 style={{color: props.correctGuess ? "#6fe85a" : "grey"}}>{props.correctGuess ? <a href={props.pokeWiki} target="_blank">{"🎉"+props.pokemonName+"🎉"}</a> :
    <a href={props.pokeWiki} target="_blank">{props.pokemonName}</a>}</h1> : <h1>{" _ ".repeat(props.pokemonName.length)}</h1>)}
}