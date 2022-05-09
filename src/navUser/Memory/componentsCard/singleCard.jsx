
// import '../componentsCard/singleCard.js';
import '../../../style/memory/singleCard.css';


 function SingleCard({ card, handleChoice, flipped, disabled }){

    const handleClick = () =>{
      if (!disabled) {
        handleChoice(card)
      }
        
    }


    return(
        <>
        <div className='card'>
            <div className={flipped ? "flipped" : "" }>
              {/* due immagini una fron e una back che si alterneranno per la visualizzazione */}
              <img src={card.src} className='front' />
              <img 
              src="/img/cover1.png" 
              className='back'
              onClick={handleClick} />
            </div>
          </div>
        </>
    )
}

export default SingleCard



