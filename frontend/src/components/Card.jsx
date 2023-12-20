import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const heartButtonClassName = (`element__heart-button ${isLiked && 'element__heart-button_active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element_type_default">
      <article className="element">
          <img className="element__image" alt={`Изображение ${props.card.name}`} src={props.card.link} onClick={handleClick}/>
          {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>}
          <div className="element__info">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like">
            <button className={heartButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="element__like-total">{props.card.likes.length}</p>
          </div>
          </div> 
       </article>
    </div>
  );
}

export default Card;