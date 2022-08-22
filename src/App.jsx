import React, { Component } from 'react';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {

const [dice, setDice] = React.useState(allNewDice())
const [tenzies, setTenzies] = React.useState(false)

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue) {
      setTenzies(true)
    return alert("You won!")
    }
}, [dice])
  

function generateNewDie() {
  return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
}
  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollNewDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
   
  }
  function holdDice(id) {
    setDice(
      prevDice => prevDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

const diceElements = dice.map(die => 
<Die 
  key={die.id} 
  value={die.value} 
  isHeld={die.isHeld}
  next={() => holdDice(die.id)}/>
)
  return (
    <main>
      {tenzies === true && <Confetti />}
      <h1 className="title">Tenzies Saga</h1>
            <p className="instructions">Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls.</p>
      <div className='grid-container'>
        {diceElements}
        {/* <Die value='1' />
        <Die value='2' />
        <Die value='3' />
        <Die value='4' />
        <Die value='5' />
        <Die value='6' />
        <Die value='2' />
        <Die value='5' />
        <Die value='1' />
        <Die value='4' /> */}
        <button onClick={rollNewDice} className='roller'> {tenzies ? "New Game" : "Roll"}</button>
        
      </div>
    </main>
    )
}
export default App