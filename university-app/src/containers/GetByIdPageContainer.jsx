import {connect} from 'react-redux';

import GetByIdPage from '../components/pages/getByIdPage/GetByIdPage';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    getById: state.getById
  };
}

const GetByIdPageContainer = connect(mapStateToProps, null)(GetByIdPage);

export default GetByIdPageContainer;