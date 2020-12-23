let profileEdit = document.querySelector('.profile__icon');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__text');
let popupProfileName = popup.querySelector('.popup__field_name');
let popupProfileDescription = popup.querySelector('.popup__field_description');
let formElement = popup.querySelector('.popup__container');
let elementLike = document.querySelectorAll('.elements__like');

function popupOpen() {
  popupProfileName.setAttribute('value',profileName.textContent);
  popupProfileDescription.setAttribute('value',profileDescription.textContent);
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  popupClose();
}

  for (i=0; i < elementLike.length; i++) {
    elementLike[i].addEventListener('click', function() {
      this.classList.toggle('elements__like_active');
    })
  }

profileEdit.addEventListener('click',popupOpen);

close.addEventListener('click',popupClose);

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    popupClose();
  }
})

formElement.addEventListener('submit', handleFormSubmit);



