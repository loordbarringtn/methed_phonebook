(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
  
  const {
    createRow,
  } = require('./createElements');
  
const {
    setStorage,
    removeStorage,
  } = require('./serviceStorage');

const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add("is-visible");
    }

    const closeModal = () => {
      formOverlay.classList.remove("is-visible");
    }

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener("click", e => {
      const target = e.target;
      if (target === formOverlay ||
        target.classList.contains('close')) {
          closeModal();
      }
    });
    
    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(
        del => {del.classList.toggle('is-visible');
    });
    })

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')){
      console.log(target.closest('.contact').querySelector('td:nth-child(4)').textContent);
      const phoneNumber2Delete = target.closest('.contact').querySelector('td:nth-child(4)').textContent;
      target.closest('.contact').remove();
      removeStorage('contact', phoneNumber2Delete);
    }
  }); 
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e=> {
      e.preventDefault(); 
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      setStorage('contact', newContact);
      form.reset();
      closeModal();
    });
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      contact.addEventListener("mouseenter", () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener("mouseleave", () => {
        logo.textContent = text;
      });
    });
  };

  module.exports = {
    modalControl,
    deleteControl,
    formControl,
    hoverRow,
  };
},{"./createElements":2,"./serviceStorage":4}],2:[function(require,module,exports){
'use strict';

const createContainer = () => {
    const container = document.createElement("div");
    container.classList.add("container");
    return container;
  };

  const createHeader = () => {
    const header = document.createElement("header");
    header.classList.add("header");
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement("h1");
    h1.classList.add("logo");
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement("main");
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-wrapper");
    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement("button");
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    const thead = document.createElement("thead");
    thead.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
        <th>Редактировать</th>
        </tr>`
    );

    const tbody = document.createElement("tbody");
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement("div");
    overlay.classList.add("form-overlay");
    const form = document.createElement("form");
    form.classList.add("form");
    form.insertAdjacentHTML(
      "beforeend",
      `<button class="close" type="button"></button>
        <h2 class=form-title">Добавить контакт</h2>
        <div class="form-group">
          <label class="form-label" for="name">Имя:</label>
          <input class="form-input" name="name" id="name" type="text" required>
        </div>  
        <div class="form-group">
          <label class="form-label" for="surname">Фамилия:</label>
          <input class="form-input" name="surname" id="surname" type="text" required>
        </div>  
        <div class="form-group">
          <label class="form-label" for="phone">Телефон:</label>
          <input class="form-input" name="phone" id="phone" type="number" required>
        </div>
        `
    );

    const buttonGroup = createButtonsGroup([
      {
        className: "btn btn-primary mr-3 js-add",
        type: "submit",
        text: "Добавить",
      },
      {
        className: "btn btn-danger",
        type: "reset",
        text: "Отмена",
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = (title) => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.textContent = `Все права защищены \u00A9${title}`;

    return footer;
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement("tr");
    tr.classList.add('contact');
    const tdDel = document.createElement("td");
    tdDel.classList.add("delete");
    const buttonDel = document.createElement("button");
    buttonDel.classList.add("del-icon");
    tdDel.append(buttonDel);
    const tdName = document.createElement("td");
    tdName.textContent = firstName;
    const tdSurname = document.createElement("td");
    tdSurname.textContent = surname;
    const tdPhone = document.createElement("td");
    const phoneLink = document.createElement("a");
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    const tdEdit = document.createElement("td");
    const btn = createButtonsGroup([
      {
        className: "btn btn-secondary",
        type: "button",
        text: "Редактировать"
      }
    ]);
    tdEdit.append(...btn.btns);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  module.exports = {
    createContainer,
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
  };
},{}],3:[function(require,module,exports){

'use strict';

  const {
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
  } = require('./createElements');
    
const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter(title);
    const buttonGroup = createButtonsGroup([
      {
        className: "btn btn-primary",
        type: "button",
        text: "Добавить",
      },
      {
        className: "btn btn-danger",
        type: "button",
        text: "Удалить",
      },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();
    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form: form,
    };
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };
  
  module.exports = {
    renderPhoneBook,
    renderContacts,
  };
},{"./createElements":2}],4:[function(require,module,exports){
'use strict';

const getStorage = key => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  
  const setStorage = (key, object) => {
    const data = getStorage(key);
    data.push(object);
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  const removeStorage = (key, phoneNumber) => {
    const data = getStorage(key);
    const dataFiltered = data.filter(item => item.phone != phoneNumber);
    localStorage.setItem(key, JSON.stringify(dataFiltered));
  };

  module.exports = {
    getStorage,
    setStorage,
    removeStorage,
  };
},{}],5:[function(require,module,exports){
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


},{"./modules/control":1,"./modules/render":3,"./modules/serviceStorage":4}]},{},[5]);
