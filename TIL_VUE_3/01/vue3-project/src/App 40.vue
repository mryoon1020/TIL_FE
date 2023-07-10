<template>

<div class="container">

<h2>To-Do List</h2>
<input
  type="text" 
  v-model="searchText"
  placeholder="Search"
  @keyup.enter="searchTodo"
>
<hr />
  <TodoSimpleFoam @add-todo="addTodo"/>
  <div style="color: red">{{error}}</div>

  <div v-if="!todos.length">
    <h3>표시할 데이터가 없습니다</h3>
  </div>
  <TodoList 
    :todos="todos" 
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
import {computed, ref, watch} from 'vue';
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
    const searchText = ref('');

    const numberOfPages = computed (() => {
      //computed 사용으로 numberOfTodos(이함수안에서 사용되는 reactive statement임) 가 변경 될 때마다 재연산해줌
      return Math.ceil(numberOfTodos.value/limit);
    })

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try{
        const res = await axios.get(
        `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
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
          await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed
          });
          
          getTodos(1);

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
          getTodos(1);
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

    let timeout = null;
    const searchTodo = ()=>{
      clearTimeout(timeout);
      getTodos(1)
    };

    watch(searchText, () => {
      clearTimeout(timeout);//기존 이벤트가 걸려있는 것을 취소함, 이거 없으면 2초마다 이벤트가 발생하게되어 타임아웃설정한 의미가 없어짐
      //이거 없으면 new 친다고 가정할때, 2초후 n 전송, 2초후 ne 전송, 2초후 new 전송됨

      setTimeout(()=>{
          getTodos(1);//1이 들어가는 이유는 항상 첫페이지를 띄우기 위함임
      }, 2000)// 2000 = 2초, 2초후에 getTodos()실행
      
    })

    return {
      addTodo,
      todos,
      todoStyle,
      delteTodo,
      toggleTodo,
      searchText,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,

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