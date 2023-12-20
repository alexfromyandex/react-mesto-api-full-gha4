import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import * as Auth from '../utils/Auth.js';

const Register = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValue;
    Auth.register(email, password)
    .then(() => {
      props.status(true);
      props.onInfoTooltip();
      navigate('/signin', {replace: true});
    })
    .catch((err) => {
      console.log(err);
      props.status(false);
      props.onInfoTooltip();
    })
  }

  return (
    <>
      <PopupWithForm name="register" notPopup="true" title="Регистрация" onSubmit={handleSubmit} buttonText="Зарегистрироваться">
        <input className="popup__input register__input" type="email" name="email" title=" " minLength="2" maxLength="30" required placeholder="Email" value={formValue.email || ''} onChange={handleChange}/>
        {/*<span className="popup__input-error email-error"></span>*/}
        <input className="popup__input register__input" type="password" name="password" title=" " minLength="2" maxLength="20" required placeholder="Пароль" value={formValue.password || ''} onChange={handleChange}/>
        {/*<span className="popup__input-error password-error"></span>*/}
      </PopupWithForm>  
      <p className="register__text">Уже зарегистрированы?
        <Link to="/signin" className="register__login-link"> Войти</Link>  
      </p>
    </>
  );
}

export default Register;