import { useState, useRef, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
    // State to store the dice array
    const [dice, setDice] = useState(() => generateAllNewDice())

     // Ref for the button element to enable focus when the game is won
    const buttonRef = useRef(null)

    // Check if the game is won: all dice are held and have the same value
    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    // Side effect to focus the button when the game is won
    useEffect(() => {
        if(gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

     // Function to generate an array of 10 new dice
    function generateAllNewDice () {
        return new Array(10)
            .fill(0)
            .map(() => ({ 
                value : Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }))

    }
   
    // Function to roll dice; either starts a new game or updates dice values
    function rollDice() {
        if(gameWon) {
             // If the game is won, generate a new set of dice
            setDice(() => generateAllNewDice())

        } else {
            // Otherwise, only update dice that are not held
            setDice(prevDie => prevDie.map( die =>
                die.isHeld ? die : {...die, value : Math.ceil(Math.random() * 6)}
            ))
        }
    }

    // Function to toggle the `isHeld` property of a die
    function hold (id) {
        setDice(prevDie => prevDie.map((die) =>
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
    }

     // Map over the dice array to render Die components
    const diceArray = dice.map((dieObj) => 
        <Die 
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
         />)

  return (
      <main>
        {/* Display confetti when the game is won */}
        {gameWon && <Confetti />}

        {/* Accessible live region for screen readers to announce the game win */}
        <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>

        {/* Game title and instructions */}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        {/* Container for the dice */}
        <div className="container">
            {diceArray}
        </div>

        {/* Button to roll dice or start a new game */}
        <button className="roll" onClick={rollDice} ref={buttonRef}>
            {gameWon ? "New Game":"Roll Dice"}
        </button>
      </main>
  )
}

export default App