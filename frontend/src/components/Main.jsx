import React from 'react';
import Card from '../components/Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">  
          <div className="profile__avatar-overlay">
            <img className="profile__avatar" alt="Фотография пользователя" src={currentUser.avatar} onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__info-part">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>  
            <p className="profile__about">{currentUser.about}</p>       
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button> 
      </section>
      <section className="elements">
        {props.cards.map((item) => {
          return <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        })}
      </section>
    </main>
  );

}

export default Main;

