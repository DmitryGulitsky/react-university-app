import axios from 'axios';

export const REQUEST_PAGE = 'REQUEST_PAGE';
export const MAIN_PAGE = 'MAIN_PAGE';
export const STUDENTS_PAGE = 'STUDENTS_PAGE';
export const GROUPS_PAGE = 'GROUPS_PAGE';
export const TEACHERS_PAGE = 'TEACHERS_PAGE';

export function requestPage() { // запрос с сервера
  return {
    type: REQUEST_PAGE
  };
}

export function goToMainPageAction() {
  return axios('http://localhost:8080/university/students')   // action будет происходить после загрузки данных
    .then(response => response.json())
    .then(urlPage => ({
      type: MAIN_PAGE,
      urlPage
    }));
}

export function goToStudentsPageAction() {
  return fetch('http://localhost:8080/university/students')
    .then(response => response.json())
    .then(urlPage => ({
      type: STUDENTS_PAGE,
      urlPage
    }));
}

export function goToGroupsPageAction() {
  return fetch('http://localhost:8080/university/students')
    .then(response => response.json())
    .then(urlPage => ({
      type: GROUPS_PAGE,
      urlPage
    }));
}

export function goToTeachersPageAction() {
  return fetch('http://localhost:8080/university/students')
    .then(response => response.json())
    .then(urlPage => ({
      type: TEACHERS_PAGE,
      urlPage
    }));
}
