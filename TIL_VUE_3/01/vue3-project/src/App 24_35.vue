<template>

<div class="container">

<h2>To-Do List</h2>
<input
  type="text" 
  v-model="searchText"
  placeholder="Search"
>
<hr />
  <TodoSimpleFoam @add-todo="addTodo"/>
  <div style="color: red">{{error}}</div>

  <div v-if="!filteredTodos.length">
    <h3>표시할 데이터가 없습니다</h3>
  </div>
  <TodoList 
    :todos="filteredTodos" 
    @toggle-todo="toggleTodo"
    @delete-todo ="delteTodo"
    />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
          v-if="currentPage !== 1"
          class="page-item"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">
            Previous
          </a>
        </li>
        <li 
        v-for="page in numberOfPages"
        :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{page}}</a>
        </li>
        <li 
          v-if="numberOfPages !== currentPage"
          class="page-item"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
</div>
</template>

<script>
import {computed, ref, watchEffect} from 'vue';
import TodoSimpleFoam from './components/TodoSimpleFoam.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components:{
    TodoSimpleFoam,
    TodoList
  },
  setup() {

    const todos = ref([]); //얘는 app.vue에서 관리해줘야함, TodoList로 옮길수 없음(자식에서 가져와서 부모에 넣고있음)
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    watchEffect(() => {
      console.log(currentPage.value);
      console.log(numberOfTodos.value);

    });

    const numberOfPages = computed (() => {
      //computed 사용으로 numberOfTodos(이함수안에서 사용되는 reactive statement임) 가 변경 될 때마다 재연산해줌
      return Math.ceil(numberOfTodos.value/limit);
    })

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try{
        const res = await axios.get(
        `http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data;
      }catch (err) {
        console.log(err);
        error.value = 'something went wrong.';
      }
    };

    getTodos()

    const todoStyle = {
      textDecoration: 'line-through', color: 'gray'
    };
    const addTodo = async (todo)=> {
      //데이터베이스에 todo 저장
      error.value = '';
      
      try{
          const res = await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed
          });
        todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        error.value = 'something went wrong.';
      }
    };

    const delteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
      await axios.delete('http://localhost:3000/todos/'+id)
      todos.value.splice(index, 1);
      } catch(err){
        console.log(err);
        error.value = 'something went wrong.';
      }
      
    };

    const toggleTodo = async (index) => {
      //여기서 index는 자식컴포넌트의 toggleTodo()에서 보내준 값이 들어가는 것임

      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('http://localhost:3000/todos/'+id,{
            completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      }catch(err){
        console.log(err);
        error.value = 'something went wrong.';
      }
    };

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });


    return {
      addTodo,
      todos,
      todoStyle,
      delteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos,

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