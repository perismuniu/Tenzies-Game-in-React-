import { useState } from 'react'
import Die from './components/Die'

const App = () => {
    const [dice, setDice] = useState(generateAllNewDice())
    function generateAllNewDice () {
        const randomArray = []
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.ceil(Math.random() * 6)
            randomArray.push(randomIndex)
        }
        return randomArray
    }
   

    const diceArray = dice.map((num) => <Die value={num}/>)

  return (
      <main>
        <div className="container">
            {diceArray}
        </div>
      </main>
  )
}

export default App
