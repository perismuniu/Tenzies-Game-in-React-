const Die = (props) => {

  // Inline style to dynamically set the background color based on `isHeld` prop
  const style = {
    backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'
  }

  return (
      <button 
        style={style} 
        onClick={props.hold}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
      >
          {props.value}
      </button>
  )
}

export default Die