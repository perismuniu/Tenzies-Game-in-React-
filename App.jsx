import { useState, useRef, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
    const [dice, setDice] = useState(() => generateAllNewDice())

    const buttonRef = useRef(null)

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if(gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

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
        if(gameWon) {
            setDice(() => generateAllNewDice())

        } else {
            setDice(prevDie => prevDie.map( die =>
                die.isHeld ? die : {...die, value : Math.ceil(Math.random() * 6)}
            ))
        }
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
        <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
            {diceArray}
        </div>
        <button className="roll" onClick={rollDice} ref={buttonRef}>
            {gameWon ? "New Game":"Roll Dice"}
        </button>
      </main>
  )
}

export default App