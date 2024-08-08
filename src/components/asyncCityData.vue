<template>
  <div class="flex flex-1 flex-col items-center " v-if="weatherData">
    <div v-if="route.query.preview" class="text-white w-full p-4 bg-weatherSecondary text-center">
      <p>
        You are Currently Viewing This City. Press "+" icon to start Tracking the City
      </p>
    </div>
    <!-- header -->
    <div class="flex flex-col text-white items-center py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ new Date(weatherData.currentTime).toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "long"
        }) }}
        {{ new Date(weatherData.currentTime).toLocaleTimeString("en-US", {
          timeStyle: "short"
        }) }}
      </p >
      <p class=" text-8xl mb-8">
       {{Math.round (convertToCelsius(weatherData.current.temp)) }}&deg 

      </p>
      
      <p class=" text-center">
        Feels like {{ Math.round(convertToCelsius(weatherData.current.feels_like)) }}&deg
      </p>
      <p class=" capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
       <img class=" w-[150]px h-auto" :src="` http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`">
      
    </div>
     <!-- hourly -->
    <hr class=" border-white border-opacity-10 border w-full "/>
       <!-- hourly Weather -->
    <div class=" max-w-screen-md w-full py-12">
        <div class=" mx-8 text-white">
           <h2 class=" mb-4"> Hourly</h2>
            <div class=" flex  gap-10 overflow-x-scroll hide-scrollbar">
               <div  v-for="hours in weatherData.hourly " :key="hours.dt" class=" flex flex-col gap-4 items-center">
                <p class=" whitespace-nowrap  text-md">
                  {{ new Date(hours.currentTime).toLocaleTimeString("en-US", {
                      hour:"numeric"
                  }) }}
                </p>
                <img class="w-[50px] h-[50px] object-cover" :src="` http://openweathermap.org/img/wn/${hours.weather[0].icon}@2x.png`">
                <p class="text-l">{{Math.round( convertToCelsius(hours.temp)) }}&deg</p>
               </div>

            </div>

        </div>

    </div>
    <hr class=" border-white border-opacity-10 border w-full "/>

   <!-- Weekly Weather -->
   <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>Max: {{ convertToCelsius(Math.round(day.temp.max)) }}&deg</p>
            <p> Min: {{ convertToCelsius(Math.round(day.temp.min) )}}&deg</p>
          </div>
        </div>
      </div>
    </div>


   <div class=" flex items-center gap-2 text-white  hover:text-red-600 py-12 cursor-pointer  duration-150" @click="removeCity">
    <i class="fa-solid fa-trash"></i>
    <p>Remove City</p>

   </div>


   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();


const convertToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

const getWeatherData = async () => {
  try {
    // Fetch weather data
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lon}&appid=72d9773548a3b0be99eb9522ea192538`);
    const data = response.data;

    // Current Date and Time calculation
    const localOffset = new Date().getTimezoneOffset() * 60000; // corrected from 6000 to 60000
    const utc = data.current.dt * 1000 + localOffset;
    data.currentTime = utc + 1000 * data.timezone_offset;

    // Hourly Weather Offset calculation
    data.hourly.forEach(hour => {
      const utcHour = hour.dt * 1000 + localOffset;
      hour.currentTime = utcHour + 1000 * data.timezone_offset;
    });
  
    return response.data ;
   
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Fetch weather data when the component is mounted
const weatherData = await getWeatherData();

const router=useRouter();
const removeCity = () => {
 const savedCities= JSON.parse(localStorage.getItem("savedCity"));
 const updatedCity=savedCities.filter((city) => city.id!=route.query.id);
 localStorage.setItem("savedCity", JSON.stringify(updatedCity));
 router.push({
  name:'home'
 })

};
</script>

