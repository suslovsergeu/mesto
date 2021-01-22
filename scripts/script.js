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
const popupContainer = popup.querySelector('.popup__container');
const popupHeader = popup.querySelector('.popup__header');
const popupFieldName = popup.querySelector('.popup__field_name');
const popupFieldDescription = popup.querySelector('.popup__field_description');
const popupSaveButton = popup.querySelector('.popup__save');
const popupCloseButton = document.querySelector('.popup__closed');

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoContainer = document.querySelector('.popup-photo__container');
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');
const popupPhotoCloseButton = document.querySelector('.popup-photo__closed');

/*Events*/
profileEdit.addEventListener('click', popupEdit);
elementAdding.addEventListener('click', popupAdd);

popup.addEventListener('click', popupCloseSide);
popupPhoto.addEventListener('click', popupCloseSide);
popupCloseButton.addEventListener('click', popupClose);
popupPhotoCloseButton.addEventListener('click', popupClose);

/***Functions***/
function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose(handler) {
  popup.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup-photo_opened');
  popupSaveButton.removeEventListener('click', handler);
}

function popupCloseSide(event) {
  if (event.target === event.currentTarget) {
    popupClose();
  };
}

function clearFields() {
  popupFieldName.value = '';
  popupFieldDescription.value = '';
}

function addContent(evt) {
  evt.preventDefault();
  const obj = {
    name: popupFieldName.value,
    link: popupFieldDescription.value
  };
  addCard(obj);
  popupClose(addContent);
}

function editContent(evt) {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileDescription.textContent = popupFieldDescription.value;
  popupClose(editContent);
}

function popupEdit() {
  clearFields();
  popupHeader.textContent = 'Редактировать профиль';
  popupFieldName.value = profileName.textContent;
  popupFieldDescription.value = profileDescription.textContent;
  popupSaveButton.textContent = 'Сохранить';
  popupSaveButton.addEventListener('click', editContent);
  popupOpen();
}

function popupAdd() {
  clearFields();
  popupHeader.textContent = 'Новое место';
  popupFieldName.placeholder = 'Название';
  popupFieldDescription.placeholder = 'Ссылка на картинку';
  popupSaveButton.textContent = 'Создать';
  popupSaveButton.addEventListener('click', addContent);
  popupOpen();
}

function addCard(item) {
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.elements__name').textContent = item.name;
  htmlElement.querySelector('.elements__photo').setAttribute('src', item.link);
  const itemDelete = htmlElement.querySelector('.elements__delete');
  const itemImage = htmlElement.querySelector('.elements__photo');
  const itemLike = htmlElement.querySelector('.elements__like');
  elements.prepend(htmlElement);
  itemLike.addEventListener('click', () => itemLike.classList.toggle('elements__like_active'));
  itemDelete.addEventListener('click', (evt) => evt.target.parentNode.remove());
  itemImage.addEventListener('click', () => {
    popupPhotoImage.setAttribute('src', item.link);
    popupPhotoDescription.textContent = item.name;
    popupPhoto.classList.add('popup-photo_opened');
  });
}

function renderCards () {
  initialCards.reverse().forEach((item) => addCard(item));
}
renderCards();













