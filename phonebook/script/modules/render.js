
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