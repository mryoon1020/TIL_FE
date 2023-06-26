<template>

  <input  type="text" 
    v-model="name"
  >

  <button
  class = "btn btn-primary"
  v-on:click="onSubmit"
  >
  Click
  </button>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const name = ref('Mr.Kim');

    const onSubmit = ()=> {

      console.log(name.value)

        };

    // const updateName = (e) => {
    //     // console.log(e.target.value);
    //     name.value = e.target.value;
    // }

    return {
      name,
      onSubmit,
      // updateName

    };

  },
}
</script>

<style>

.name{
  color: red;
}

</style>