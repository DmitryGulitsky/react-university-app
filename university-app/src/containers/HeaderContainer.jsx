import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { goToMainPageAction, goToStudentsPageAction, goToGroupsPageAction, goToTeachersPageAction } from "../actions/changeTableAction";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    getDataUrl: state.getDataUrl
  }
}

function mapDispatchToProps(dispatch) { // Сопоставить dispatch() со свойствами. Это функция для сопоставления событий компонента с действиями, изменяющими состояния
// как параметр принимает dispatch, который привязан к экземпляру хранилища
// возвращает объект, в качестве названий свойств которого идут названия свойств компонента, а в качестве значений - функции
  return {
    onGoToMainPage: urlPage => dispatch(goToMainPageAction(urlPage)),
    onGoToStudentsPage: urlPage => dispatch(goToStudentsPageAction(urlPage)),
    onGoToGroupsPage: urlPage => dispatch(goToGroupsPageAction(urlPage)),
    onGoToTeachersPage: urlPage => dispatch(goToTeachersPageAction(urlPage))
  }
}

// const createContainerFor = connect(mapStateToProps, mapDispatchToProps);  // принимает 2 компонента, которые описывают свойства компонента Header в формате объекта JavaScript. Результат выполнения - другая функция
// const HeaderContainer = createContainerFor(Header); //  в качестве аргумента презентационный компоненет, для которого создается контейнер. В этой константе находится компонент-контейнер, который экспортируется из файла
const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header); // упрощенный синтаксис строк выше


export default HeaderContainer;