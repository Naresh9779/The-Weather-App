<template>
    <div class="flex py-6 px-4 bg-weatherSecondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class=" text-2xl">{{city.city }}</h2>
            <h3>{{ city.state }}</h3>
        </div>
       <div class="flex flex-col gap-2">
         <p class="text-2xl self-end">Temp : {{ Math.round(convertToCelsius(city.weather.main.temp)) }}&deg</p>
         <div class="flex gap-2">
             <span class="text-xs">MAX: {{ Math.round(convertToCelsius(city.weather.main.temp_max)) }}&deg</span>
             <span class="text-xs">MIN: {{ Math.round(convertToCelsius(city.weather.main.temp_min)) }}&deg</span>

         </div>
       </div>
    </div>
</template>

<script setup>

const convertToCelsius = (f) => {
  return (f - 30)/2;
};
defineProps({
   city:{ type:Object,
    default:()=>{}
   },

})

</script>

