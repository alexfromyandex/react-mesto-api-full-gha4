import successPicture from '../images/Union.svg';
import errorPicture from '../images/Union.png';

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `popup popup_opened` : `popup`}>
      <div className={"popup__container infoTooltip__container"}>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="infoTooltip__image" src={props.status ? successPicture : errorPicture} alt="Изображение иконки"/>
        <p className="infoTooltip__text">{props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;