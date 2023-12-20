import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      link:inputRef.current.value
    })
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input className="popup__input popup-avatar__input" type="url" name="link" title=" " ref={inputRef} required placeholder="Ссылка на картинку" />
      <span className="popup__input-error link-error"></span>
    </PopupWithForm>  
  );

}

export default EditAvatarPopup;