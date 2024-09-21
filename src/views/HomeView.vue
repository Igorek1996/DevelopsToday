<template>
    <div class="wrapper">
        <div class="content">
            <CountrySearch @search="handleSearch"></CountrySearch>

            <h1 class="content__title">List of countries</h1>
            <div class="content__info">
                <ul>
                    <li v-for="country in filteredCountries" :key="country.countryCode">
                        <router-link :to="{ name: 'Country', params: { id: country.countryCode } }"
                            class="content__info-link">
                            {{ country.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <CountryWidget></CountryWidget>
    </div>
</template>

<script setup>
import CountrySearch from '@/components/CountrySearch.vue';
import CountryWidget from '@/components/CountryWidget.vue';

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const countries = ref([]);

const searchQuery = ref('');

onMounted(async () => {
    try {
        const { data } = await axios.get(`${apiUrl}AvailableCountries`)
        countries.value = data;
    }

    catch (e) {
        console.log(e);
    }
})

const handleSearch = (query) => {
    searchQuery.value = query;
};

const filteredCountries = computed(() => {
    return countries.value.filter(country =>
        country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>

<style>
.wrapper {
    display: flex;
    align-items: flex-start;
    gap: 50px;
}

.content {
    flex: 0 1 100%;
    width: 100%;
}

.content__title {
    font-size: 28px;
    color: #292d32;
    margin-bottom: 20px;
}

.content__info {
    margin-top: 10px;
}


.content__info-link {
    display: block;
    color: inherit;
    font-weight: 500;
    padding: 12px;
    border-bottom: 1px solid #eeeeee;
    transition: background-color 0.3s;
}

.content__info-link:hover {
    background-color: #f5f5f5;
}

@media screen and (max-width: 767px) {
    .wrapper {
        flex-direction: column;
    }
}
</style>