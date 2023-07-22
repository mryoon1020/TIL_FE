<template>
<div
    v-for="(todo, index) in todos"
    :key="todo.id"
    class = "card mt-2"
  >
    <div 
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(todo.id)"
    >
      <div class="flex-grow-1">
        <input
          class="ml-2 mr-2"
          type="checkbox"
          :value="todo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        >
        <span
          :class="{todo: todo.completed}"
        >
          {{todo.subject}}
        </span>
      </div>
      <div>
      <button
        class="btn btn-danger btn-sm"
        @click.stop="openModal(todo.id)"
      >delete</button>
      </div>
    </div>
  </div>
  <Modal 
    v-if="showModal"
    @close="closeModal"
    @delete="delteTodo"
  >
  Delete todo!!
  </Modal>
</template>

<script>
import {useRouter} from 'vue-router';
import Modal from '@/components/Modal.vue';
import {ref} from 'vue';

export default {
  components: {
    Modal
  },
    // props: ['todos']
    props: {
        todos:{ //이렇게 오브젝트로 잡으면 타입설정도 가능
            type: Array, //required로 인해서 Array 대신 String 넣으면 오류뜸
            required: true //부모에서 보내는 타입이 Array므로 항상 Array가 필요(Array  빼고 다 못들어오게 함)
        }
    },
    emits: ['toggle-todo', 'delete-todo'],

    setup(props, {emit}){

      const router = useRouter();
      const showModal = ref(false);
      const todoDeleteId = ref(null);

      const toggleTodo = (index, event) => {
        emit('toggle-todo', index, event.target.checked);
        //event.target.checked 이벤트에 직접 접근했음
      };

      const openModal = (id) => {
        todoDeleteId.value = id;
        showModal.value = true;
      }

      const closeModal = (id) => {
        todoDeleteId.value = null;
        showModal.value = false;
      }

      const delteTodo = () => {
        emit('delete-todo', todoDeleteId.value);
        showModal.value = false;
        todoDeleteId.value = null;
      };

      const moveToPage = (todoId) => {
        console.log(todoId);
        // router.push('/todos/'+todoId); //이 방법도 사용 가능
        router.push({
          name: 'Todo',
          params: {
            id: todoId
          } 
        });
      }

      return {
        toggleTodo,
        delteTodo,
        moveToPage,
        showModal,
        openModal,
        closeModal
      }
    }
}
</script>

<style>

</style>