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
<Toast
  v-if="showToast"
  :message = "toastMessage"
  :type = "toastAlertType"
/>
</template>

<script>
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/toast';

export default {
  components: {
    Toast,
  },

  setup(){
      const {
        showToast,
        //같은 컴포넌트에서 불러와서 쓰지만 타 컴포넌트에서 사용되는 
        //동일한 컴포넌트는 다른 스테이트임
        //따라서 TodoForm.vue에서 사용되는 showToast가 변경 되어도
        //App.vue에서 사용되는 showToast에는 영향이 가지 않음
        toastMessage,
        toastAlertType,
        triggerToast
    } = useToast()

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }

  }

}
</script>

<style>
</style>