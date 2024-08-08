<template>
    <header class="top-0 sticky bg-weatherPrimary shadow-lg">
        <nav class="container flex  flex-col items-center sm:flex-row   py-6 gap-4 text-white ">
            <RouterLink :to="{name:'home'}">
                <div class="flex items-center gap-3 ">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">The Local Weather App</p>
                </div>
            </RouterLink>
            <div class="flex gap-6 flex-1 justify-end">
                <i @click="toogle"  class="fa-solid fa-circle-info text-2xl hover:text-weatherSecondary duration-150 cursor-pointer"></i>
            
            
                <i v-if="route.query.preview" class="fa-solid fa-plus  text-2xl hover:text-weatherSecondary duration-150 cursor-pointer"
                @click="addCity"></i>            </div>

                <baseModel :modelActive="modelActive" @close-modal="toogle" class="text-black">
                    <p>
                        🌦️ Weather App: A comprehensive and user-friendly weather application
                         designed to provide real-time weather updates, forecasts, and essential weather-related information.
                        Whether you're planning your day or preparing for a trip,
                        our app ensures you're always informed about the weatherconditions.
                    </p>
                </baseModel>
            
        </nav>

    </header>
</template>

<script setup>
import { RouterLink,useRoute,useRouter } from 'vue-router';
import {ref} from 'vue'
import baseModel from './baseModel.vue';
import {uid} from 'uid';

const modelActive=ref(null);
const savedCity=ref([]);
const route=useRoute();
const router=useRouter();
const addCity=()=>{
    if(localStorage.getItem('savedCity'))

{
savedCity.value=(JSON.parse(localStorage.getItem('savedCity')));
}

const newCity= {
    id:uid(),
    state:route.params.state,
    city:route.params.city,
    coord:{

        lat:route.query.lat,
        lon:route.query.lon

    }

}

savedCity.value.push(newCity);
localStorage.setItem('savedCity', JSON.stringify(savedCity.value));

let query=Object.assign({},route.query)
delete query.preview;
query.id=newCity.id;
router.replace({query})


}

const toogle=()=>{
    modelActive.value=!modelActive.value;
}
</script>

