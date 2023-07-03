<template>

<div class="container">

<h4>count: {{count}}</h4>
<h4>double count computed: {{doubleCountComputed}}</h4>
<h4>double count method: {{doubleCountMethod()}}</h4>
<h4>double count computed: {{doubleCountComputed}}</h4>
<h4>double count method: {{doubleCountMethod()}}</h4>

<button @click="count++">Add One</button>

<h2>To-Do List</h2>
  <TodoSimpleFoam @add-todo="addTodo"/>

  <div v-if="!todos.length">
    <h3>추가된 Todo가 없습니다</h3>
  </div>
  <TodoList 
    :todos="todos" 
    @toggle-todo="toggleTodo"
    @delete-todo ="delteTodo"
    />
</div>
</template>

<script>
import {ref, computed} from 'vue';
import TodoSimpleFoam from './components/TodoSimpleFoam.vue';
import TodoList from './components/TodoList.vue';

export default {
  components:{
    TodoSimpleFoam,
    TodoList
  },
  setup() {

    const todos= ref([]); //얘는 app.vue에서 관리해줘야함, TodoList로 옮길수 없음(자식에서 가져와서 부모에 넣고있음)
    
    const todoStyle = {
      textDecoration: 'line-through', color: 'gray'
    };

    const addTodo = (todo)=> {
      todos.value.push(todo)
    };

    const delteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const toggleTodo = (index) => {
      //여기서 index는 자식컴포넌트의 toggleTodo()에서 보내준 값이 들어가는 것임
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    };

    const count = ref(1);
    const doubleCountComputed = computed(() => {
      console.log('computed')
      return count.value *2;
    });

    const doubleCountMethod = () => {
      console.log('method')
      return count.value *2;
    }

    return {
      addTodo,
      todos,
      todoStyle,
      delteTodo,
      toggleTodo,
      count,
      doubleCountComputed,
      doubleCountMethod,

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