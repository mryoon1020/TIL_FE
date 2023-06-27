<template>

<div class="container">
<h2>To-Do List</h2>
  <TodoSimpleFoam @add-todo="addTodo"/>

  <div v-if="!todos.length">
    <h3>추가된 Todo가 없습니다</h3>
  </div>
  <TodoList :todos="todos"/>
</div>
</template>

<script>
import {ref} from 'vue';
import TodoSimpleFoam from './components/TodoSimpleFoam.vue';
import TodoList from './components/TodoList.vue';

export default {
  components:{
    TodoSimpleFoam,
    TodoList
  },
  setup() {

    const toggle = ref(false);
    const todos= ref([]); //얘는 app.vue에서 관리해줘야함, TodoList로 옮길수 없음(자식에서 가져와서 부모에 넣고있음)
    const todoStyle = {
      textDecoration: 'line-through', color: 'gray'
    }

    const addTodo = (todo)=> {
      console.log(todo)
      todos.value.push(todo)
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    }

    const delteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    return {
      addTodo,
      todos,
      toggle,
      onToggle,
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