<template>
    Todo Simple Form
      <form 
    @submit.prevent="onSubmit"
  >
    <div class="d-flex">
        <div class="flex-grow-1 mr-2">
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
    </div>
    <div v-if="hasError" style="color: red">
        <h4>this field cannot be empty</h4>
    </div>
</form>
</template>

<script>
import {ref} from 'vue';
export default {
    setup(props, {emit}){
        const todo = ref('');
        const hasError = ref(false);
        const onSubmit = ()=> {
      if(todo.value === ''){
        hasError.value = true;
      }else{
        emit('add-todo', {
        id: Date.now(),
        subject: todo.value,
        completed: false,
        });
      hasError.value = false;
      todo.value = '';
      }
      
    }

        return {
            todo,
            hasError,
            onSubmit,
        }
    }

}
</script>

<style>

</style>