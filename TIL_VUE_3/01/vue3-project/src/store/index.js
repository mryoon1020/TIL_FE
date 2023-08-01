import { createStore } from 'vuex';
import modules from './modules';

export default createStore({
    
    /** modules:  {
        
        toast: {
            namespaced: true, //요렇게 namespaced를 true로 놔야 폴더처럼 사용가능
        state: {
            toastAlertType: '',
            toastMessage: '',
            showToast: false,
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
            }
    
        },
        actions: {
            triggerToast ({commit}, message, type = 'success') {
                
                commit('UPDATE_TOAST_MESSAGE', message)
                commit('UPDATE_TOAST_ALERT_TYPE', type)
                commit('UPDATE_TOAST_STATUS', true)
    
                setTimeout(() => {
    
                commit('UPDATE_TOAST_MESSAGE', '')
                commit('UPDATE_TOAST_ALERT_TYPE', '')
                commit('UPDATE_TOAST_STATUS', false)
                }, 5000)
    
            }
        },
        getters: { //vuex에서 사용하는 computed라고 생각하면 됨(거의 똑같음, reactive함)
            toastMessageWithSmile (state){
                return state.toastMessage + ' ^_^';
            }
        },
    }
    
    }
    */
    // modules : modules;
    modules //이름이 같으면 : modules 생략가능
});