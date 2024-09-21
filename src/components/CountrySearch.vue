<template>
    <div class="search">
        <input v-model="searchQuery" type="text" placeholder="Search by country name..." @input="onSearch" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

const emit = defineEmits(['search']);
const onSearch = () => {
    emit('search', searchQuery.value);
};
</script>

<style>
.search {
    position: sticky;
    top: 0;
    padding: 20px 0;
    margin-top: -20px;
    background: #fff;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #292d32;
    background-color: #f9fbff;
    transition: border-color 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

input[type="text"]:focus {
    border-color: #5932ea;
    outline: none;
    box-shadow: 0 0 5px rgba(89, 50, 234, 0.5);
}
</style>