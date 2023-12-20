import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {useNavigate} from 'react-router-dom';
import * as Auth from '../utils/Auth.js';

const Login = (props) => {
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
    Auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          props.tokenCheck();
          setFormValue({email: '', password: ''});
          props.handleLogin();
          navigate("/", {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
        props.status(false);
        props.onInfoTooltip();
      })
  }

  return (
    <PopupWithForm name="login" notPopup="true" title="Вход" onSubmit={handleSubmit} buttonText="Войти">
      <input className="popup__input register__input" type="email" name="email" title=" " minLength="2" maxLength="30" required placeholder="Email" value={formValue.email || ''} onChange={handleChange}/>
      {/*<span className="popup__input-error email-error"></span>*/}
      <input className="popup__input register__input" type="password" name="password" title=" " minLength="2" maxLength="20" required placeholder="Пароль" value={formValue.password || ''} onChange={handleChange}/>
      {/*<span className="popup__input-error password-error"></span>*/}
    </PopupWithForm>   
  );
}

export default Login;