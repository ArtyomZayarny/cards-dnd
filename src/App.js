import './App.css';
import { useState } from 'react'

function App() {
  const [cardsList, setCardsList] = useState([
    { id: 1, order: 3, text: 'card 3' },
    { id: 2, order: 1, text: 'card 1' },
    { id: 3, order: 2, text: 'card 2' },
    { id: 4, order: 4, text: 'card 4' }
  ])
  const [currentCard, setCurrentCard] = useState(null)

  const dragStartHandler = (e, card) => {
    //  console.log('drag', card)
    setCurrentCard(card)

  }

  const dragEndHandler = (e) => {
    e.preventDefault()
    e.target.style.background = 'white'

  }

  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }

  const dropHandle = (e, card) => {
    e.preventDefault()
    console.log('start', currentCard)
    console.log('drop', card)

    setCardsList(cardsList.map(c => {

      //change draaggble card order
      if (c.id === currentCard.id) {
        return { ...c, order: card.order }
      }

      //change dropped card order
      if (c.id === card.id) {
        return { ...c, order: currentCard.order }
      }
      return c

    }))
    e.target.style.background = 'white'

  }

  const sortCards = (a, b) => {
    return a.order > b.order ? 1 : -1
  }

  return (
    <div className="App">
      {cardsList.sort(sortCards).map(card =>

        <div key={card.id}
          className="card"
          onDragStart={(e) => { dragStartHandler(e, card) }}
          onDragLeave={(e) => { dragEndHandler(e) }}
          onDragEnd={(e) => { dragEndHandler(e) }}
          onDragOver={(e) => { dragOverHandler(e) }}
          onDrop={(e) => { dropHandle(e, card) }}
          draggable={true}
        >
          {card.text}
        </div>

      )}
    </div>
  );
}

export default App;
