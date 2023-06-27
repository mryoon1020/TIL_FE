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
  <!-- <div>
    <div>
      <h4>{{todos[0].subject}}</h4>
    </div>
     <div>
      <h4>{{todos[1].subject}}</h4>
    </div>
  </div> -->
  <div
    v-for="todo in todos"
    :key="todo.id"
  >
    <div>
      <h4>{{todo.subject}}</h4>
    </div>
  </div>

  <div
    v-for="i in 10"
    :key="i"
  >
    {{i}}
  </div>

</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const todo = ref('');
    const todos= ref([
      {id: 1, subject: '휴대폰사기'},
      {id: 2, subject: '케이스사기'}
    ]);

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