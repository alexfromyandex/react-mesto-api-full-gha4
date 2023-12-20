import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardImage, setCardImage] = React.useState('');
  const [cardName, setCardName]  = React.useState('');

  React.useEffect(() => {
    setCardImage('');
    setCardName('');
  }, [props.isOpen])

  function handleChangeCardImage(evt) {
    setCardImage(evt.target.value);
  }

  function handleChangeCardName(evt) {
    setCardName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name:cardName,
      link:cardImage
    })
  }

return (
  <PopupWithForm name="add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Создать">
    <input className="popup__input popup__input_type_title" type="text" name="name" value={cardName} title=" " minLength="2" maxLength="30" required placeholder="Название" onChange={handleChangeCardName} />
    <span className="popup__input-error name-error"></span>
    <input className="popup__input popup__input_type_link" type="url" name="link" value={cardImage} title=" " required placeholder="Ссылка на картинку" onChange={handleChangeCardImage} />
    <span className="popup__input-error link-error"></span>
  </PopupWithForm>   
);

}

export default AddPlacePopup;