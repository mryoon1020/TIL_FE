import {computed} from 'vue';
import {useStore} from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);

    const triggerToast = (message, type = 'success') => {
        store.dispatch('toast/triggerToast', { message, type });
        //여기서 { message, type } 는 { message: message, : type }와 같은 것임
    };

    return {
        toasts,
        triggerToast
    }

}