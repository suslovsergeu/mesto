let profileEdit = document.querySelector('.profile__icon');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__text');
let popupProfileName = popup.querySelector('.popup__field_name');
let popupProfileDescription = popup.querySelector('.popup__field_description');
let formElement = popup.querySelector('.popup__container');
let elementLike = document.querySelectorAll('.elements__like');

popupProfileName.setAttribute('placeholder',profileName.textContent);
popupProfileDescription.setAttribute('placeholder',profileDescription.textContent);

function visibility() {
  popup.classList.toggle('popup__opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  visibility();
}

  for (i=0; i < elementLike.length; i++) {
    elementLike[i].addEventListener('click', function() {
      this.classList.toggle('elements__like_active');
    })
  }

profileEdit.addEventListener('click',visibility);

close.addEventListener('click',visibility);

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    visibility();
  }
})

formElement.addEventListener('submit', handleFormSubmit);



