const Die = (props) => {

  const style = {
    backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'
  }

  return (
      <button 
        style={style} 
        onClick={props.hold}
        
      >
          {props.value}
      </button>
  )
}

export default Die