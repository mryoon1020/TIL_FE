import { createStore } from 'vuex';

export default createStore({
    state: {
        toastAlertType: '',
        toastMessage: '',
        showToast: false,
        timeout: null
    },
    mutations: {
        UPDATE_TOAST_MESSAGE (state, payload){
            state.toastMessage = payload;
        },
        UPDATE_TOAST_ALERT_TYPE (state, payload){
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS (state, payload){
            state.showToast = payload;
        },
        UPDATE_TOAST_TIMEOUT (state, payload){
            state.timeout = payload;
        }
    },
    actions: {
        triggerToast ({commit}, message, type = 'success') {//context 안에서 commit만 뺴서 사용가능
            // toastMessage.value = message;
            commit('UPDATE_TOAST_MESSAGE', message)
            //commit의 첫번째 인자에  mutation이름을 넣음
            // message는 UPDATE_TOAST_MESSAGE에서 payload로 들어가게됨
            // toastAlertType.value = type;
            commit('UPDATE_TOAST_ALERT_TYPE', type)
            // showToast.value = true;
            commit('UPDATE_TOAST_STATUS', true)
            timeout.value = setTimeout(()=>{
            // toastMessage.value = '';
            commit('UPDATE_TOAST_MESSAGE', '')
            // toastAlertType.value = '';
            commit('UPDATE_TOAST_ALERT_TYPE', '')
            // showToast.value = false;
            commit('UPDATE_TOAST_STATUS', false)
            }, 5000)
        }
    }
});