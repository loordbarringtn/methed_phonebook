"use strict";

const {
  modalControl,
  deleteControl,
  formControl,
  hoverRow,
} = require('./modules/control');

const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render');

const {
  getStorage,
} = require('./modules/serviceStorage');

{  
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const { list,
            logo, 
            btnAdd, 
            formOverlay, 
            form,
            btnDel 
          } = renderPhoneBook(app, title);

    // const allRows = renderContacts(list, data);
    const localStorageRows = renderContacts(list, getStorage('contact'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
     
    // hoverRow(allRows, logo);
    hoverRow(localStorageRows, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);  
  };

  window.phoneBookInit = init;
 }

