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
const popupFieldNameEdit = popupEdit.querySelector('.popup__field_name-edit');
const popupFieldDescriptionEdit = popupEdit.querySelector('.popup__field_description-edit');
const popupSaveButtonEdit = popupEdit.querySelector('.popup__save_edit');

const popupAdd = document.querySelector('.popup_add');
const popupFieldNameAdd = popupAdd.querySelector('.popup__field_name-add');
const popupFieldDescriptionAdd = popupAdd.querySelector('.popup__field_description-add');
const popupSaveButtonAdd = popupAdd.querySelector('.popup__save_add');

const popupCloseButton = document.querySelectorAll('.popup__closed');

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoContainer = document.querySelector('.popup-photo__container');
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');
const popupPhotoCloseButton = document.querySelector('.popup-photo__closed');

/*Events*/
profileEdit.addEventListener('click', popupEditFunction);
elementAdding.addEventListener('click', popupAddFunction);

popupEdit.addEventListener('click', popupCloseSide);
popupAdd.addEventListener('click', popupCloseSide);
popupPhoto.addEventListener('click', popupCloseSide);

for (i = 0; i < popupCloseButton.length; i++) {
  popupCloseButton[i].addEventListener('click', popupClose);
}
popupPhotoCloseButton.addEventListener('click', popupClose);

/***Functions***/
function popupEditOpen() {
  popupEdit.classList.add('popup_opened');
}

function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
}

function popupClose(handler) {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup-photo_opened');
  popupSaveButtonEdit.removeEventListener('click', handler);
  popupSaveButtonAdd.removeEventListener('click', handler);
};

function popupCloseSide(event) {
  if (event.target === event.currentTarget) {
    popupClose();
  };
}

function addContent(evt) {
  evt.preventDefault();
  const obj = {
    name: popupFieldNameAdd.value,
    link: popupFieldDescriptionAdd.value
  };
  addCard(obj);
  popupClose(addContent);
}

function editContent(evt) {
  evt.preventDefault();
  profileName.textContent = popupFieldNameEdit.value;
  profileDescription.textContent = popupFieldDescriptionEdit.value;
  popupClose(editContent);
}

function popupEditFunction() {
  popupFieldNameEdit.value = profileName.textContent;
  popupFieldDescriptionEdit.value = profileDescription.textContent;
  popupSaveButtonEdit.addEventListener('click', editContent);
  popupEditOpen();
}

function popupAddFunction() {
  popupSaveButtonAdd.addEventListener('click', addContent);
  popupAddOpen();
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













