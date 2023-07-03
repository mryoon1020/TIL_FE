<template>
<div
    v-for="(todo, index) in todos"
    :key="todo.id"
    class = "card mt-2"
  >
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
      <input
        class="form-check-input" 
        type="checkbox"
        :value="todo.completed"
        @change="toggleTodo(index)"
      >
      <label
        class="form-check-label"
        :class="{todo: todo.completed}"
      >{{todo.subject}}</label>
      </div>
      <div>
      <button
        class="btn btn-danger btn-sm"
        @click="delteTodo(index)"
      >delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    // props: ['todos']
    props: {
        todos:{ //이렇게 오브젝트로 잡으면 타입설정도 가능
            type: Array, //required로 인해서 Array 대신 String 넣으면 오류뜸
            required: true //부모에서 보내는 타입이 Array므로 항상 Array가 필요(Array  빼고 다 못들어오게 함)
        }
    },
    emits: ['toggle-todo', 'delete-todo'],
    setup(props, {emit}){
      const toggleTodo = (index) => {
        emit('toggle-todo', index);
      };

      const delteTodo = (index) => {
        emit('delete-todo', index);
      };


      return {
        toggleTodo,
        delteTodo,
      }
    }
}
</script>

<style>

</style>