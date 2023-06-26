<template>

<h2>To-Do List</h2>
  <form 
    @submit.prevent="onSubmit"
  >
    <div>
      <input
        type="text" 
        v-model="todo"
        placeholder="Type new to-do"
      >
    </div>
    <div>
      <button
        class = "btn btn-primary"
        type="submit"
      >
        Add
      </button>
    </div>
  </form>
  {{todos}}
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const todo = ref('');
    const todos= ref([]);

    const onSubmit = ()=> {
      // e.preventDefault();
      console.log(todo.value)
      todos.value.push({
        id: Date.now(),
        subject: todo.value
      });

        };

    return {
      todo,
      onSubmit,
      todos,

    };

  },
}
</script>

<style>

.name{
  color: red;
}

</style>