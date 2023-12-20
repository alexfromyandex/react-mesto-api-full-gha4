function ImagePopup(props) {
  return (
   <div className={props.card ? "popup popup-photo popup_opened" : "popup popup-photo"}>
      <div className="popup-photo__container">
        <img className="popup-photo__image" src={props.card?.link} alt={props.card?.name} />
        <button className="popup__close-button popup-photo__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup-photo__title">{props.card?.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;