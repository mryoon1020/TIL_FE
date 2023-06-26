  <!--
<template>

  <div class="name">
    {{greeting('welcome')}}
  </div>
  <button 
  class="btn btn-primary"
  v-on:click="consoleLog"
  >
  Clcik
  </button>


</template>
  -->

<template>
  <div v-bind:class="nameClass">
    {{name}}
  </div>
  <input  v-bind:type="text" v-bind:value="name">
  <button
  class = "btn btn-primary"
  v-on:click="updateName"
  >
  Click
  </button>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const name = ref('Mr.Kim');
    const type = ref('number');
    const nameClass = ref('name');
        // const name = 'welcome (name variavtion)';
        // const greeting = (name) => {
        //   return 'hello, ' + name;
        // }

        // const consoleLog = () => {
        //   console.log('hello world!!');
        // }

        //let name = "Mr.Yoon"
        const updateName = ()=> {
        //name = 'Mr.Park';
        name.value = "Mr.Park";
        type.value ='text';
        nameClass.value = 'name';
            console.log(name)
        };

    return {
      name,
      //greeting,
      // consoleLog,
      updateName,
      type,
      nameClass
      

      

    };

  },
}
</script>

<style>

.name{
  color: red;
}

</style>