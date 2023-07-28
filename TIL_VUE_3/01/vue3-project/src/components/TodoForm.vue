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
                <!-- <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control"
                    >
                    <div 
                        v-if="subjectError"
                        class="text-red"
                    >
                        {{subjectError}}
                    </div>
                </div> -->
                <Input 
                    :label="Subject"
                    v-model:subject="todo.subject"
                    :error="sunjectError"
                />
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
            >
                {{editing ? 'Update' : 'Create'}}
            </button>
            <button 
                class="btn btn-outline-dark ml-2"
                @click="moveToTodoListPage"
            >Cancel</button>
    </form>
    <transition name='fade'>
        <!-- v-if 대신 v-show도 사용가능 -->
        <Toast
            v-if = "showToast" 
        :message = "toastMessage"
            :type = "toastAlertType"
        />
    </transition>
</template>

<script>
import axios from '@/axios';//axios.js에 있는 http base url을 사용하기 위함
import {useRoute, useRouter} from 'vue-router'
import {ref, computed, onUpdated} from 'vue'
import _ from 'lodash'//lodash는 _로 사용한다고함
import Toast from '@/components/Toast.vue'
import {useToast} from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
    components: {
        Toast,
        Input
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
    onUpdated(() => {
        console.log(todo.value.subject);
    });

        const subjectError =ref('');
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

                const res = await axios.get(`todos/${todoId}`);
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
            subjectError.value = '';
            if(!todo.value.subject){
                subjectError.value = 'Subject is required!';
                return;
            }
            try{
                let res;
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body,
                };

                if(props.editing){
                    res = await axios.put(`todos/${todoId}`, data);
                    originalTodo.value = {...res.data};//저장후에 save 버튼을 다시 disable로 만들기 위함
                } else{
                    res = await axios.post('todos', data);
                    todo.value.subject = '';
                    todo.value.body = '';
                }

                
                const msg = 'Successfully ' + (props.editing ? 'Updated!!' : 'Created!!');
                triggerToast(msg);

                if(!props.editing){
                    router.push({
                        name: 'Todos'
                    })
                }

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
            toastAlertType,
            subjectError,
        }
    }
}
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to{
        opacity: 0;/**투명해짐*/
        transform: translateY(-30px);/**위에서 내려옴 (translate는 왼쪽에서 나옴)*/
    }

    .fade-enter-to,
    .fade-leave-from{
        opacity: 1;/**진해짐 */
        transform: translateY(0px);/**위로 들어감 (translate는 왼쪽으로 들어감)*/
    }
</style>