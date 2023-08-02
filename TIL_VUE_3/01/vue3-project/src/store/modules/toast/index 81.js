export default {
    namespaced: true, //요렇게 namespaced를 true로 놔야 폴더처럼 사용가능
state: {
    toasts: [],
    // toastAlertType: '',
    // toastMessage: '',
    // showToast: false,
},
mutations: {
    // UPDATE_TOAST_MESSAGE (state, payload){
    //     state.toastMessage = payload;
    // },
    // UPDATE_TOAST_ALERT_TYPE (state, payload){
    //     state.toastAlertType = payload;
    // },
    // UPDATE_TOAST_STATUS (state, payload){
    //     state.showToast = payload;
    // },
    ADD_TOAST (state, payload) {
        state.toasts.push(payload);
        //여기서 paload는 하기 두개만 보냄
        // toastAlertType: '',
        // toastMessage: '',
    },
    REMOVE_TOAST (state) {
        state.toasts.shift();
    }

},
actions: {
    triggerToast ({commit}, message, type = 'success') {
        
        // commit('UPDATE_TOAST_MESSAGE', message)
        // commit('UPDATE_TOAST_ALERT_TYPE', type)
        // commit('UPDATE_TOAST_STATUS', true)

        commit('ADD_TOAST', {
            id: Date.now(),
            message,
            type
        });

        setTimeout(() => {

        // commit('UPDATE_TOAST_MESSAGE', '')
        // commit('UPDATE_TOAST_ALERT_TYPE', '')
        // commit('UPDATE_TOAST_STATUS', false)
        commit('REMOVE_TOAST');
        }, 10000)

    }
},
getters: { //vuex에서 사용하는 computed라고 생각하면 됨(거의 똑같음, reactive함)
    toastMessageWithSmile (state){
        return state.toastMessage + ' ^_^';
    }
},
}