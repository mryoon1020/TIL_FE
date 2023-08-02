import {computed} from 'vue';
import {useStore} from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);
    // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
    // //대괄호 속 ''안에  module로 설정한 이름 + / + getters 함수 명 으로 처리해야함
    // const toastAlertType = computed(() => store.state.toast.toastAlertType);
    // //state.모듈명.state 명
    // const showToast = computed(() => store.state.toast.showToast);

    const triggerToast = (message, type = 'success') => {
        store.dispatch('toast/triggerToast', message, type);
    };

    return {
        // showToast,
        // toastMessage,
        // toastAlertType,
        toasts,
        triggerToast
    }

}