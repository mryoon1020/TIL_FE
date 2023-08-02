<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" :to="{name: 'Home'}">TO-DO</router-link>

  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <router-link class="nav-link" :to="{name: 'Todos'}">Todos <span class="sr-only">(current)</span></router-link>
    </li>
  </ul>
</nav>
<div class="container">
  <router-view />
</div>
<!-- <transition name="slide"> -->
<!-- <Toast
  :message = "toastMessage"
  :type = "toastAlertType"
/> props를 받지 않게됨(80강, 10:15)-->
  <Toast />
<!-- </transition> -->
</template>

<script>
import Toast from '@/components/Toast.vue';
// import {useToast} from '@/composables/toast';

export default {
  components: {
    Toast,
  },

  // setup(){//인프런 강의 80강 10:04 현재 사용하는 부분이 없기에 모두 삭제해야하나 추후 공부를위해 주석처리함

  //     const {
  //       // showToast,
  //       //같은 컴포넌트에서 불러와서 쓰지만 타 컴포넌트에서 사용되는 
  //       //동일한 컴포넌트는 다른 스테이트임
  //       //따라서 TodoForm.vue에서 사용되는 showToast가 변경 되어도
  //       //App.vue에서 사용되는 showToast에는 영향이 가지 않음
  //       // toastMessage,
  //       // toastAlertType,
  //       triggerToast
  //   } = useToast();

  //   // console.log(showToast.value);
  //   return {
  //       // showToast,
  //       // toastMessage,
  //       // toastAlertType,
  //       triggerToast
  //   }

  // }

}
</script>

<style>

</style>
<!--
<style scoped>
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
-->