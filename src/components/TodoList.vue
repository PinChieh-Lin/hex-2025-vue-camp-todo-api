<template>
    <div class="todoList_list">
        <ul class="todoList_tab">
            <li><a href="#" @click.prevent="filterStatus = 'all'" :class="{ active: filterStatus === 'all' }">全部</a></li>
            <!-- :class="{active : filterStatus ===  'all'}" 代表當filterStatus等於'all'時，這個<li>會有active這個class -->
            <li><a href="#" @click.prevent="filterStatus = 'imcomplete'"
                    :class="{ active: filterStatus === 'imcomplete' }">待完成</a></li>
            <li><a href="#" @click.prevent="filterStatus = 'completed'"
                    :class="{ active: filterStatus === 'completed' }">已完成</a></li>
        </ul>
        <!--{{ filterStatus }}  測試filterStatus有沒有改變 -->
        <div class="todoList_items">
            <ul class="todoList_item">
                <!-- <TodoItem v-for="todo in todos" -->
                <!-- todos改成filteredTodos 原因是todos是所有待辦事項完整清單。
filteredTodos則是根據目前篩選狀態（全部、待完成、已完成）動態產生的清單-->
                <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo"
                    @remove-todo="emit('remove-todo', $event)">
                </TodoItem>
                <!-- @remove-todo="emit('remove-todo', $event)" 代表監聽子元件TodoItem發出的remove-todo事件，並執行父元件TodoList的remove-todo事件，是emmit傳入子層 $event代表事件的物件或是子原件傳出的資料-->
            </ul>
            <div class="todoList_statistics">
              <p v-if="incompleteTodos > 0">{{ incompleteTodos }} 個未完成項目</p>
                <p v-else>目前尚無待辦事項</p>
            </div>
        </div>
        <!-- {{ todos }} 測試props有沒有接收到 -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import { computed } from 'vue'

const props = defineProps({
    todos: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['remove-todo'])

const filterStatus = ref('all')
const filteredTodos = computed(() => {
    switch (filterStatus.value) {
        case 'imcomplete':
            return props.todos.filter(t => !t.status)
        // t.status 代表取出todos陣列中的每一個物件的status屬性
        // t => !t.status 代表篩選出status為false的項目
        case 'completed':
            return props.todos.filter(t => t.status)
        default:
            return props.todos
    }

    // if...else寫法
    // if (filterStatus.value === 'all') {
    //     return props.todos
    // } else if (filterStatus.value === 'imcomplete') {
    //     return props.todos.filter(t => !t.status)
    // } else if (filterStatus.value === 'completed') {
    //     return props.todos.filter(t => t.status)
    // }
    // return props.todos
})

const incompleteTodos = computed(() => {
    return props.todos.filter(t => !t.status).length
})
// length 代表回傳陣列的長度
</script>