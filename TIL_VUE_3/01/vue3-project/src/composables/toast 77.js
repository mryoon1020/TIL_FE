import {computed, onUnmounted} from 'vue';
import {useStore} from 'vuex';

export const useToast = () => {
    const store = useStore();
    const showToast = computed(() => store.state.showToast);
    // computed로 감싸지 않으면 값의 변경을 vuex가 감지하지 못함, vuex홈페이지 사용
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const timeout = computed(() => store.state.timeout);
    const triggerToast = (message, type = 'success') => {
        // toastMessage.value = message;
        // toastAlertType.value = type;
        // showToast.value = true;
        // timeout.value = setTimeout(()=>{
        // toastMessage.value = '';
        // toastAlertType.value = '';
        // showToast.value = false;
        // }, 5000)
        store.dispatch('triggerToast', message, type);
        //dispatch(actoion 함수 명, 받는 인자1, 받는 인자 2)
    };

    //하기부분은 App.vue에서만 toast를 사용할것이므로 필요없음
    // onUnmounted(() => {
    //     console.log('unmounted');
    //     clearTimeout(timeout.value); 
    // })

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }

}