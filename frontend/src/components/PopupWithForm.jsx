function PopupWithForm(props) {
  if (!props.notPopup) {
    return (
      <div className={props.isOpen ? `popup popup-${props.name} popup_opened` : `popup popup-${props.name}`}>
        <div className={`popup__container popup-${props.name}__container`}>
          <button className="popup__close-button" type="button" onClick={props.onClose}></button>
          <h3 className={`popup__title popup-${props.name}__title`}>{`${props.title}`}</h3>
          <form className="popup__form" name={`${props.name}PopupForm`} onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button className="popup__submit-button" type="submit">{props.buttonText}</button>
          </form>
        </div>
    </div>
    );
  } else { 
    return (
        <div className={"popup__container register__container"}>
          <h3 className={"popup__title register__title"}>{`${props.title}`}</h3>
          <form className="popup__form" name={`${props.name}Form`} onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button className="popup__submit-button register__submit-button" type="submit">{props.buttonText}</button>
          </form>
        </div>
    );
  }
}

export default PopupWithForm;

