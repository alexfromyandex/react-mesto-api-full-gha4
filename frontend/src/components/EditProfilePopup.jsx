import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  },[currentUser, props.isOpen]); 

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name, 
      about:description
    })
  }

return (
  <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
    <input className="popup__input popup__input_type_name" type="text" name="name" title=" " minLength="2" maxLength="40" required placeholder="Имя" value={name || ''} onChange={handleChangeName}/>
    <span className="popup__input-error name-error"></span>
    <input className="popup__input popup__input_type_about" type="text" name="info" title=" " minLength="2" maxLength="200" required placeholder="Занятие" value={description || ''} onChange={handleChangeDescription}/>
    <span className="popup__input-error info-error"></span>
  </PopupWithForm> 
);
}

export default EditProfilePopup;