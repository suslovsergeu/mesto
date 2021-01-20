/*Элементы страницы*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileEdit = document.querySelector('.profile__icon');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__text');
const elementAdding = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elements__template').content;

const popup = document.querySelector('.popup');
const popupTemplate = document.querySelector('.popup__template').content;
const popupContainer = popup.querySelector('.popup__container');
const popupHeader = popup.querySelector('.popup__header');
const popupSaveButton = popup.querySelector('.popup__save');
const popupCloseButton = document.querySelector('.popup__close');

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoTemplate = document.querySelector('.popup-photo__template').content;

/*Events*/
profileEdit.addEventListener('click',popupEdit);
elementAdding.addEventListener('click',popupAdd);
popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    popupClose();
  }
});
popupPhoto.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    popupClose();
  }
});

/***Functions***/
function popupEdit() {
  popup.innerHTML = "";
  const htmlElement = popupTemplate.cloneNode(true);
  htmlElement.querySelector('.popup__header').textContent = 'Редактировать профиль';
  const popupName = htmlElement.querySelector('.popup__field_name');
  popupName.value = profileName.textContent;
  const popupDescription = htmlElement.querySelector('.popup__field_description');
  popupDescription.value = profileDescription.textContent;
  const saveButton = htmlElement.querySelector('.popup__save');
  saveButton.textContent = 'Сохранить';
  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    popupClose();
  });
  popupOpenClose(htmlElement);
}

function popupAdd() {
  popup.innerHTML = "";
  const htmlElement = popupTemplate.cloneNode(true);
  const popupHeader = htmlElement.querySelector('.popup__header');
  popupHeader.textContent = 'Новое место';
  const popupFieldName = htmlElement.querySelector('.popup__field_name');
  popupFieldName.placeholder = 'Название';
  const popupFieldDescription = htmlElement.querySelector('.popup__field_description');
  popupFieldDescription.placeholder = 'Ссылка на картинку';
  const saveButton = htmlElement.querySelector('.popup__save');
  saveButton.textContent = 'Создать';
  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const obj = {
      name: popupFieldName.value,
      link: popupFieldDescription.value
    };
    initialCards.unshift(obj);
    renderCards();
    popupClose();
  });
  popupOpenClose(htmlElement);
}

function popupOpenClose(htmlElement) {
  const close = htmlElement.querySelector('.popup__close');
  popup.appendChild(htmlElement);
  close.addEventListener('click',popupClose);
  popup.classList.add('popup_opened');
}

function popupPhotoOpen() {
  popupPhoto.innerHTML = "";
  const htmlElement = popupPhotoTemplate.cloneNode(true);
  const popupPhotoImage = htmlElement.querySelector('.popup-photo__image');
  const popupDescription = htmlElement.querySelector('.popup-photo__description');
  popupPhotoOpenClose(htmlElement);
}

function popupPhotoOpenClose(htmlElement) {
  const close = htmlElement.querySelector('.popup__close');
  popupPhoto.appendChild(htmlElement);
  close.addEventListener('click',popupClose);
  popupPhoto.classList.add('popup-photo_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup-photo_opened');
}

function renderCards () {
  elements.innerHTML = "";
  initialCards.forEach((item, index) => {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector('.elements__name').textContent = item.name;
    htmlElement.querySelector('.elements__photo').setAttribute('src', item.link);
    const itemImage = htmlElement.querySelector('.elements__photo');
    const itemLike = htmlElement.querySelector('.elements__like');
    if (item.like === 1) {
      itemLike.classList.add('elements__like_active')
    }
    const itemDelete = htmlElement.querySelector('.elements__delete');
    elements.appendChild(htmlElement);
    itemLike.addEventListener('click',() => {
      itemLike.classList.toggle('elements__like_active');
      if (itemLike.classList.contains('elements__like_active')) {
        item.like = 1;
      } else {
        item.like = 0;
      };
    });
    itemDelete.addEventListener('click',(evt) => {
      initialCards.splice(index, 1);
      renderCards();
    })
    itemImage.addEventListener('click',() => {
      popupPhoto.innerHTML = "";
      const htmlElement = popupPhotoTemplate.cloneNode(true);
      const popupPhotoImage = htmlElement.querySelector('.popup-photo__image');
      popupPhotoImage.setAttribute('src',item.link);
      const popupPhotoDescription = htmlElement.querySelector('.popup-photo__description');
      popupPhotoDescription.textContent = item.name;
      popupPhotoOpenClose(htmlElement);
    })
  });
};
renderCards();















