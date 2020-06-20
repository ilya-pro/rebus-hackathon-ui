import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT} from "./mutation-types";
import {API_BASE_URL} from '../utils/axios-helper';

Vue.use(Vuex)

export default new Vuex.Store({
  // реактивное состояние
  state: {
    // статус аутентификации
    status: '',

    // токен аутентификации инициализируем из LS, если есть
    token: localStorage.getItem('user-token') || ''
  },
  /*
    фиксация и отслеживание изменений state
    мутации - ТОЛЬКО синхронные изменения
   */
  mutations: {
    [AUTH_REQUEST]: (state) => {
      console.log('m   AUTH_REQUEST');
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
  },
  // обновляет state через вызов mutations
  actions: {
    // запрос подключения
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      console.log('A   AUTH_REQUEST', commit, dispatch, user);
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST);
        // TODO real method name
        //axios({url: API_BASE_URL + 'users/login/', data: user, method: 'POST' })
        axios.post(API_BASE_URL + 'users/login/', user)
            .then(resp => {
              console.log('TH');
              const token = resp.data.token;
              localStorage.setItem('user-token', token); // store the token in localstorage
              commit(AUTH_SUCCESS, token);
              // you have your token, now log in your user :)
              //TODO
              //dispatch(USER_REQUEST)
              resolve(resp);
            })
            .catch(err => {
              console.log('CATCH');
              commit(AUTH_ERROR, err);
              // if the request fails, remove any possible user token if possible
              localStorage.removeItem('user-token');
              reject(err);
            })
      })
    },
    // выход
    [AUTH_LOGOUT]: ({commit/*, dispatch*/}) => {
      return new Promise((resolve/*, reject*/) => {
        console.log('AUTH_LOGOUT done');
        commit(AUTH_LOGOUT);
        // удаляем пользовательский токен из localstorage
        localStorage.removeItem('user-token');
        resolve();
      })
    }
  },
  // вычислимые свойства состояния
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {
  }
})
