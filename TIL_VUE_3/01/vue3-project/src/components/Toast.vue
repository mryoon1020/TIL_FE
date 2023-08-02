<template>
<div class="toast-box">
    <transition-group name="slide">
    <div 
        v-for="toast in toasts"
        :key="toast.id"
        class="alert" 
        :class="`alert-${toast.type}`"
        role="alert">
        {{ toast.message }}
    </div>
    </transition-group>
</div>

</template>

<script>
import {useToast} from '@/composables/toast';

export default {
    // props: {
    //     message: {
    //         type: String,
    //         required: true
    //     },
    //     type: {
    //         type: String,
    //         default: 'success'
    //     }
    // },
    setup() {
        const { toasts } = useToast();

        return {
            toasts
        }
    },
}
</script>

<style scoped>
    .toast-box{
        position: fixed;
        top: 10px;
        right: 10px;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to{
        opacity: 0;/**투명해짐*/
        transform: translateY(-30px);/**위에서 내려옴 (translate는 왼쪽에서 나옴)*/
    }

    .slide-enter-to,
    .slide-leave-from{
        opacity: 1;/**진해짐 */
        transform: translateY(0px);/**위로 들어감 (translate는 왼쪽으로 들어감)*/
    }
</style>