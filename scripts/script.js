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

const popupEdit = document.querySelector('.popup_edit');
const popupFieldNameEdit = popupEdit.querySelector('.popup__field_name-input-edit');
const popupFieldDescriptionEdit = popupEdit.querySelector('.popup__field_description-input-edit');
const popupSaveButtonEdit = popupEdit.querySelector('.popup__save_edit');

const popupAdd = document.querySelector('.popup_add');
const popupFieldNameAdd = popupAdd.querySelector('.popup__field_name-input-add');
const popupFieldDescriptionAdd = popupAdd.querySelector('.popup__field_description-input-add');
const popupSaveButtonAdd = popupAdd.querySelector('.popup__save_add');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__closed');
const popupSaveButtons = document.querySelectorAll('.popup__save');

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');

/*Events*/
profileEdit.addEventListener('click', popupEditFunction);
elementAdding.addEventListener('click', popupAddFunction);

popupSaveButtonEdit.addEventListener('click', editContent);
popupSaveButtonAdd.addEventListener('click', addContent);

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', popupClose);
});

popups.forEach((popup) => {
  popup.addEventListener('click', popupCloseSide);
});

/***Functions***/
function openModal(popup) {
  popup.classList.add('popup_opened');
  enableValidation();
}

function closeModal(popup) {
  popup.classList.remove('popup_opened');
  const popupFields = popup.querySelectorAll('.popup__field');
  const popupErrors = popup.querySelectorAll('.popup-error');
  popupFields.forEach((item) => {
    item.value='';
  });
  popupErrors.forEach((item) => {
    item.classList.remove('popup-error_visible');
  });
}

function popupClose() {
  popups.forEach((popup) => {
    closeModal(popup);
  });
};

function popupCloseSide(event) {
  if (event.target === event.currentTarget) {
    popupClose();
  };
};

document.addEventListener('keyup', (evt) => {
  evt.preventDefault();
  if(evt.key === "Escape") {
    popupClose();
  };
});

function popupEditFunction() {
  popupFieldNameEdit.value = profileName.textContent;
  popupFieldDescriptionEdit.value = profileDescription.textContent;
  openModal(popupEdit);
}

function editContent(evt) {
  evt.preventDefault();
  profileName.textContent = popupFieldNameEdit.value;
  profileDescription.textContent = popupFieldDescriptionEdit.value;
  popupClose();
}

function popupAddFunction() {
  openModal(popupAdd);
}

function addContent(evt) {
  evt.preventDefault();
  const obj = {
    name: popupFieldNameAdd.value,
    link: popupFieldDescriptionAdd.value
  };
  addCard(obj);
  popupClose();
  popupFieldNameAdd.value = '';
  popupFieldDescriptionAdd.value = '';
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
    openModal(popupPhoto);
  });
}

function renderCards () {
  initialCards.reverse().forEach((item) => addCard(item));
}
renderCards();













