import React from 'react';
import { connect } from 'react-redux';

import Table from '../components/Table';

import { addItem, deleteItem, editItem } from "../actions/editStudentsTableAction";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    data: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddItem: (firstName, lastName) => {
      console.log('Add button clicked');
      dispatch(addItem(firstName, lastName))
    },
    onDeleteItem: id => {
      console.log('Delete button clicked');
      dispatch(deleteItem(id))
    },
    onEditItem: (id, firstName, lastName) => {
      console.log('Edit button clicked');
      dispatch(editItem(id, firstName, lastName))
    }
  }
}

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table); // упрощенный синтаксис строк выше


export default TableContainer;