<template>
   <div v-for="city in savedCities" :key="city.id">
      <cityCard :city="city" @click="getCityView(city)" />
    </div> 
    <p v-if="savedCities.length===0">No Locaion Added . Try Searching ...</p>

</template>  

<script setup>
import {ref} from 'vue'
const savedCities=ref([]);
import axios from 'axios';
import cityCard from './cityCard.vue';
import {useRouter} from 'vue-router'

const getCities=async()=>{

    if(localStorage.getItem('savedCity'))
      {
        savedCities.value=(JSON.parse(localStorage.getItem('savedCity')));
      }

      const response=[];
    //   console.log(savedCities.value);

      savedCities.value.forEach((city)=> {
        // console.log(city);

    response.push ( axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=72d9773548a3b0be99eb9522ea192538&units=imperial`));

     
});
 const weatherData=await Promise.all(response);
  await new Promise((res)=>setTimeout(res,1000))

 weatherData.forEach((value,index)=> {
    savedCities.value[index].weather=value.data;
 });



}

await getCities();
const router=useRouter();
const getCityView=(city)=>{

    router.push({
        name:'cityView',
        params:{
            state:city.state,
            city:city.city
        },
        query:{
            lat:city.coord.lat,
            lon:city.coord.lon,
            id:city.id
        }
    })
  
}

</script>

