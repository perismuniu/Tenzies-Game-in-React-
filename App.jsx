import { useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'

const App = () => {
    const [dice, setDice] = useState(generateAllNewDice())

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
        setDice(generateAllNewDice())
    }

    const diceArray = dice.map((dieObj) => <Die key={dieObj.id} value={dieObj.value}/>)

  return (
      <main>
        <div className="container">
            {diceArray}  
        </div>
        <button className="roll" onClick={rollDice}>Roll Dice</button>
      </main>
  )
}

export default App