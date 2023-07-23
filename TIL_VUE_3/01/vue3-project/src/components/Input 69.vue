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
    setup(props, { emit }){
        const onInput = (e) => {
            console.log(e.target.value);
            // emit('update-subject', e.target.value);//TodoForm.vue에서 <Input />주석처리된 사용부분과 관련되어잇음
            emit('update:subject', e.target.value);//TodoForm.vue에서 <Input />v-model사용부분과 관련되어잇음
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