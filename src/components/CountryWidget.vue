<template>
    <div class="widget">
        <h2 class="widget__title">Upcoming Holidays for Random Countries</h2>
        <div v-if="holidays.length" class="widget__info">
            <ul>
                <li v-for="(holiday, index) in holidays" :key="index">
                    <router-link :to="{ name: 'Country', params: { id: holiday.code } }" class="widget__info-link">
                        <div class="widget__info-text widget__info-country">
                            {{ holiday.country }}
                        </div>
                        <div class="widget__info-text widget__info-holiday">
                            {{ holiday.name }}
                        </div>
                        <div class="widget__info-text widget__info-date">
                            {{ holiday.date }}
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div v-else class="widget__message">
            Loading holidays...
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const holidays = ref([]);
const apiUrl = import.meta.env.VITE_API_URL;

async function getRandomCountries() {
    try {
        const { data } = await axios.get(`${apiUrl}AvailableCountries`);
        const countries = data;

        const randomCountries = [];

        while (randomCountries.length < 3) {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const country = countries[randomIndex];
            if (!randomCountries.includes(country)) {
                randomCountries.push(country);
            }
        }

        const holidayPromises = randomCountries.map(async (country) => {
            const holidayResponse = await axios.get(`${apiUrl}NextPublicHolidays/${country.countryCode}`);
            const nextHoliday = holidayResponse.data[0];

            return {
                country: country.name,
                name: nextHoliday.name,
                date: nextHoliday.date,
                code: country.countryCode
            };
        });

        holidays.value = await Promise.all(holidayPromises);
        console.log(holidayPromises);

    } catch (error) {
        console.error('Error fetching holidays:', error);
    }
};

onMounted(() => {
    getRandomCountries();
});
</script>

<style>
.widget {
    position: sticky;
    top: 20px;
    min-width: 300px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.widget__title {
    font-size: 24px;
    color: #292d32;
    margin-bottom: 15px;
}

.widget__info {
    margin-top: 10px;
}

.widget__info-link {
    display: block;
    padding: 10px;
    color: inherit;
    transition: background-color 0.3s;
}

.widget__info-link:hover {
    background-color: #f5f5f5;

}

.widget__info-text {
    margin-bottom: 5px;
}

.widget__info-country {
    font-weight: bold;
}

.widget__message {
    color: #757575;
    font-style: italic;
}

@media screen and (max-width: 767px) {
    .widget {
        width: 100%;
        order: -1;
        position: static;
    }
}
</style>