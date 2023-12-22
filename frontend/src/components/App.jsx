import React from 'react';
import '../index.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cardsArray]) => {
          setCards(cardsArray);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        }) 
        // eslint-disable-next-line
     }}, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }  

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.unlikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleCardDelete(card) {
   api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

 function handleUpdateUser(data) {
  api.patchUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(data) {
    api.patchUserAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleLogin = () => {
    setLoggedIn(true);
  } 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData({});
  }

  const navigate = useNavigate();

  const [status, setStatus] = React.useState(false)

  function setStatusInfo(r) {
    setStatus(r);
  }

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token'); 
      if (jwt){
        Auth.tokenCheck(jwt)
        .then((res) => {
         setUserData({
            email: res.email
          });
          setLoggedIn(true);
          navigate("/", {replace: true})
        })
        .catch((err) => {
          console.log(err);
        })
      } else {navigate("/signup", {replace: true})}
    }
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <Header loggedIn={loggedIn} handleLogout={handleLogout} userData={userData}/>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Main} onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete} 
            cards={cards} loggedIn={loggedIn}/>} />
        <Route path="/signin" element={<Login handleLogin={handleLogin} onInfoTooltip={handleInfoTooltipClick} tokenCheck={tokenCheck} status={setStatusInfo}/>} />
        <Route path="/signup" element={<Register onInfoTooltip={handleInfoTooltipClick} status={setStatusInfo}/>} />
      </Routes>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} buttonText="Создать" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status}></InfoTooltip>
    </div>  
    </CurrentUserContext.Provider>
  );

}

export default App;
