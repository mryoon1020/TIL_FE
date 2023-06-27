<template>

<div v-show="toggle">true</div>
<div  v-show="!toggle">false</div>
<button @click="onToggle">v-show T/F 변경</button>

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
      <input 
        type="checkbox"
        v-model="todo.completed"
      >
      <label
      
        :style="todo.completed ? todoStyle : {}"
      
      >{{todo.subject}}</label>

    </div>
    <div>

      <input 
        type="checkbox"
        v-model="todo.completed"
      >
      <label
        :class="{todo: todo.completed}"
      >style 바인딩으로 처리되는 부분 : &nbsp; {{todo.subject}}</label>

    </div>
  </div>

  <div
    v-for="i in 10"
    :key="i"
  >
    {{i}}
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
        // e.preventDefault();
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

    return {
      todo,
      onSubmit,
      todos,
      toggle,
      onToggle,
      hasError,
      todoStyle,

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