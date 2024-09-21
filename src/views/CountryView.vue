<template>
    <div class="content">
        <h1 class="content__title">{{ currentCountryInfo.officialName }} Holidays</h1>
        <div class="holidays">
            <ul>
                <li v-for="(holiday, index) in holidays" :key="index">
                    <div class="holidays__info">
                        <div class="holidays__text widget__country">
                            {{ holiday.date }}
                        </div>
                        <div class="holidays__text widget__holiday">
                            {{ holiday.name }}
                        </div>
                        <div class="holidays__text widget__date">
                            {{ holiday.types.join(' ') }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="buttons">
            <button v-for="year in years" :key="year" @click="getHolidaysPerYear(year)"
                :class="{ active: year == currentYear }">
                {{ year }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const apiUrl = import.meta.env.VITE_API_URL;

const countryId = route.params.id;

const holidays = ref([]);
const currentCountryInfo = ref([]);
const currentYear = ref(new Date().getFullYear());

onMounted(async () => {
    try {
        const { data } = await axios.get(`${apiUrl}CountryInfo/${countryId}`)
        currentCountryInfo.value = data;
        await getHolidaysPerYear(currentYear.value)
    }
    catch (e) {
        console.log(e);
    }
})

async function getHolidaysPerYear(year) {

    try {
        const { data } = await axios.get(`${apiUrl}PublicHolidays/${year}/${countryId}`)
        holidays.value = data;
        currentYear.value = year;
    }
    catch (e) {
        console.log(e);
    }
}

const years = computed(() => {
    return Array.from({ length: 11 }, (_, i) => 2020 + i);
})

</script>

<style>
.holidays {
    margin-top: 20px;
}

.holidays__info {
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
}

.holidays__text {
    margin-bottom: 5px;
}

.widget__country {
    font-weight: bold;
    color: #292d32;
}

.widget__holiday {
    font-style: italic;
    color: #5932ea;
}

.widget__date {
    color: #757575;
    font-size: 14px;
}

.buttons {
    margin-top: 15px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #5932ea;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    margin-right: 10px;
}

button:hover {
    background-color: #4826b4;
}

button.active {
    background-color: #16c098;
}
</style>
