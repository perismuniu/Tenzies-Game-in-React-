import { useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
    const [dice, setDice] = useState(generateAllNewDice())

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)


    function generateAllNewDice () {
        return new Array(10)
            .fill(0)
            .map(() => ({ 
                value : Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }))

    }
   
    function rollDice() {
        setDice(prevDie => prevDie.map( die =>
            die.isHeld ? die : {...die, value : Math.ceil(Math.random() * 6)}
        ))
    }

    function hold (id) {
        setDice(prevDie => prevDie.map((die) =>
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
    }

    const diceArray = dice.map((dieObj) => 
        <Die 
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
         />)

  return (
      <main>
        {gameWon && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
            {diceArray}
        </div>
        <button className="roll" onClick={rollDice}>
            {gameWon ? "New Game":"Roll Dice"}
        </button>
      </main>
  )
}

export default App