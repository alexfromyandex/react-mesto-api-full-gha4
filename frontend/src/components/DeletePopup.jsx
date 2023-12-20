/* я доделаю) но сначала сдам работу чтобы уложиться в сроки) */
import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
  <PopupWithForm name="delete" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} /> 
);

}

export default DeletePopup;