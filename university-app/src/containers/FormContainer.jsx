// 3 функции компонентов-контейнеров:
// Подписка на обновления состояния в хранилище. Делаестя в componentDidMount, componentWillUnmount
// Сопоставляет действия презентационного компонента с действиями обновляющими состояния
//

import React from 'react';
import { connect } from 'react-redux';  // выполняет подписку-отписку

import { changeIdAction } from '../actions/changeIdAction';
import Form from '../components/Form';

function mapDispatchToProps(dispatch) {
  return {
    onChange: idNumber => dispatch(changeIdAction(idNumber))
  };
}

const FormContainer = connect(null, mapDispatchToProps)(Form);  // mapStateToProps не требуется, так как не нужны данные из хранилища. Вместо него null. Контейнер не будет подписываться на обновления хранилища

export default FormContainer;