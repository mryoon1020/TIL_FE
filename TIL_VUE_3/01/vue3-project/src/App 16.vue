<template>

<div>
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
    <div v-if="hasError">
      <h3 style="color: red">this field cannot be empty</h3>
    </div>
  </form>
  <div
    v-if="!todos.length"
  ><h3>추가된 Todo가 없습니다</h3></div>
  <div
    v-for="(todo, index) in todos"
    :key="todo.id"
  >
    <div>

      <input 
        type="checkbox"
        v-model="todo.completed"
      >
      <label
        :style="todo.completed ? todoStyle : {}"
      >style 바인딩으로 처리되는 부분 : &nbsp; {{todo.subject}}</label>

    </div>
    <div>

      <input 
        type="checkbox"
        v-model="todo.completed"
      >
      <label
        :class="{todo: todo.completed}"
      >class 바인딩으로 처리되는 부분 : &nbsp; {{todo.subject}}</label>

    </div>
    <div>
      <button 
        @click="delteTodo(index)"
      >delete</button>
    </div>
  </div>
</div>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {

    const toggle = ref(false);
    const todo = ref('');
    const todos= ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through', color: 'gray'
    }

    const onSubmit = ()=> {
      if(todo.value === ''){
        hasError.value = true;
      }else{

      console.log(todo.value)
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
        completed: false,
      });
      hasError.value = false;
      todo.value = '';
      }
      
    }

    const onToggle = () => {
      toggle.value = !toggle.value;
    }

    const delteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    return {
      todo,
      onSubmit,
      todos,
      toggle,
      onToggle,
      hasError,
      todoStyle,
      delteTodo,

    };

  },
}
</script>

<style>

.todo{
  color: red;
  text-decoration: line-through;
}

</style>