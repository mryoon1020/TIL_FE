<template>
      <div v-if="loading">
        Loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control"
                    >
                </div>
            </div>
            <div v-if="editing" class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button 
                            type="button"
                            class="btn"
                            :class="todo.completed ? 'btn-success':'btn-danger'"
                            @click="toggleTodoStatus"
                        >
                        {{todo.completed ? 'Completed' : 'Incomplete'}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows="10">
                    </textarea>
                </div>
            </div>
        </div>
        
            <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="!todoUpdated"
            >Save</button>
            <button 
                class="btn btn-outline-dark ml-2"
                @click="moveToTodoListPage"
            >Cancel</button>
    </form>
    <Toast 
        v-if = "showToast" 
        :message = "toastMessage"
        :type = "toastAlertType"
    />
</template>

<script>
import axios from 'axios';
import {useRoute, useRouter} from 'vue-router'
import {ref, computed} from 'vue'
import _ from 'lodash'//lodash는 _로 사용한다고함
import Toast from '@/components/Toast.vue'
import {useToast} from '@/composables/toast';

export default {
    components: {
        Toast
    },
    props: {
        editing: {
            /**
            editing에 props 설정이유
                같은 양식을 사용하기 위해 component로 뺐지만
                todo정보를 db에서 읽어오기 위한 로직이 존재
                하지만 create에서는 form에 대한 정보를 받아올 필요가없기 때문에
                create에서 불필요한 자원소모를 없에기 위함
        */
            type: Boolean,
            default: false,
        }
    },
    setup(props){

        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            computed: false,
            body: '',
        });
        const originalTodo = ref(null);
        const loading = ref(false);
        const todoId = route.params.id;

    const {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    } = useToast();

        const getTodo = async () => {
                loading.value = true;
            try{

                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = {...res.data};
                originalTodo.value = {...res.data};
                loading.value = false;

            } catch (error){

                loading.value = false;
                console.log(error);
                triggerToast('Something went wrong!!', 'danger');

            }
        };

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)//변경사항이 없을시 save버튼을 disable로 만들기 위함
        });

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            })
        };

        const onSave = async () => {
            try{
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                });
                
                originalTodo.value = {...res.data};//저장후에 save 버튼을 다시 disable로 만들기 위함
                triggerToast('Successfully saved!');
            } catch (error){
                console.log(error);
                triggerToast('Somthing went wrong!!', 'danger');
            }
        };

        if(props.editing){
            getTodo();
        }
        
        return{
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType
        }
    }
}
</script>

<style>

</style>