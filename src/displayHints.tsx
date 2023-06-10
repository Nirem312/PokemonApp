import React from 'react'
import './index.css'
import './App.css'

export function DisplayHintsTypes(props){
    return (
        <p>{props.typeAmount > 0 ? 'Types:' : 'Type:'} {props.pokemonTypes.map(element => 
        <p key={element} className="displayList"> {element}</p>)}</p>
    )
}

export function DisplayHintsAbilities(props){
    return (
        <p>{props.abilitiesAmount > 0 ? 'Abilities:' : 'Ability:'} {props.pokemonAbilities.map(element =>
        <p key={element} className="displayList"> {element}</p>)} </p>
    )
}

