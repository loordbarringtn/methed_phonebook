import storage from './modules/serviceStorage.js';
import { renderPhoneBook, renderContacts } from './modules/render.js';
import {
  modalControl,
  deleteControl,
  formControl,
  hoverRow,
} from './modules/control.js';

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);

  const { list, logo, btnAdd, formOverlay, form, btnDel } = renderPhoneBook(
    app,
    title
  );

  const localStorageRows = renderContacts(list, storage.getStorage('contact'));
  const { closeModal } = modalControl(btnAdd, formOverlay);

  hoverRow(localStorageRows, logo);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal);
};

window.phoneBookInit = init;
