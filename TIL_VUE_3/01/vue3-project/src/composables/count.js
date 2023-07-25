import { reactive } from 'vue'

export const useCount = () => {
    const state = reactive({
        conunt: 0
    });

    return state;
}




