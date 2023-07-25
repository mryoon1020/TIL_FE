<template>
    <div class="form-group">
        <label>{{label}}</label>
        <input 
            :value="subject"
            @input="onInput"
            type="text" 
            class="form-control"
        >
        <div 
            v-if="error"
            class="text-red"
        >
            {{error}}
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        }
    },
    setup(){
        // const context = useContext(); //설명을 위해 추가된 부분 그냥 같은거다라는 의미로 작성한것임, 요줄은 작성하면 안되는 줄임
        //context가 파라미터로 받는 props, { emit } 와 같음 따라서 하기 코드와 같이사용가능
        // const { emit } = useContext();//이렇게 하면 setUp함수의 파라미터를 지울수 있음
        const { emit } = getCurrentInstance();//useContext는 사장되었으므로 현재는 getCurrentInstance를 사용해야 같은 기능을 구현할수 있음
        const onInput = (e) => {
            console.log(e.target.value);
            emit('update:subject', e.target.value);
        };

        return {
            onInput,
        }
    }

}

</script>

<style scoped>

    .text-red{
        color: red;
    }
</style>