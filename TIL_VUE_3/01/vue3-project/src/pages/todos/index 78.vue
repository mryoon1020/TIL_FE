<template>
<div>
  <div 
    class="d-flex justify-content-between mb-3">
    
    <h2>To-Do List</h2>
    <button 
      class="btn btn-primary"
      @click="moveToCreatePage"
    >
      Create Todo
    </button>
  </div>

<input
  class="form-control"
  type="text" 
  v-model="searchText"
  placeholder="Search"
  @keyup.enter="searchTodo"
>
<hr />

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
<Toast 
  v-if = "showToast" 
  :message = "toastMessage"
  :type = "toastAlertType"
    />
</template>

<script>
import {computed, ref, watch} from 'vue';
import TodoSimpleFoam from '@/components/TodoSimpleFoam.vue';
import TodoList from '@/components/TodoList.vue';
import axios from '@/axios';
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/toast';
import {useRouter} from 'vue-router';

export default {
  components:{
    TodoList,
    Toast
  },
  setup() {

    const router = useRouter();
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

    const {
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast
    } = useToast();

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try{
        const res = await axios.get(
        `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data;
      }catch (err) {
        console.log(err);
        error.value = 'something went wrong.';
        triggerToast('Somthing went wrong!!', 'danger');
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
          await axios.post('todos', {
            subject: todo.subject,
            completed: todo.completed
          });
          
          getTodos(1);

        } catch (err) {
        console.log(err);
        error.value = 'something went wrong.';
        triggerToast('Somthing went wrong!!', 'danger');
      }
    };

    const delteTodo = async (id) => {
      
      error.value = '';

      try{
          await axios.delete('todos/'+id)
          getTodos(1);
        } catch(err){
        console.log(err);
        error.value = 'something went wrong.';
        triggerToast('Somthing went wrong!!', 'danger');
      }
      
    };

    const toggleTodo = async (index, checked) => {
      //여기서 index는 자식컴포넌트의 toggleTodo()에서 보내준 값이 들어가는 것임
      //checked 는 TodoList에서 보내준 이벤트 결과값

      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('todos/'+id,{
            // completed: !todos.value[index].completed // 이렇게 써도 되지만 정확하진 않음, 다른쪽에서 클릭해서 바뀔수 있음
            completed: checked//좀더 정확한 event 결과를 가져오기 위해 checked를 받아옴
        });
        // todos.value[index].completed = !todos.value[index].completed;
        todos.value[index].completed = checked;//좀더 정확한 event 결과를 가져오기 위해 checked를 받아옴
      }catch(err){
        console.log(err);
        error.value = 'something went wrong.';
        triggerToast('Somthing went wrong!!', 'danger');
      }
    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',

      })
    }

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
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
      moveToCreatePage,

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