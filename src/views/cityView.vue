<template>
    
<div>
  
  <Suspense>
    <template #default><asyncCityData/></template>
    <template #fallback>
      <CityViewSkelton/>
    </template>
  </Suspense>
</div>
    
</template>

<script setup>
import asyncCityData from '../components/asyncCityData.vue'
import CityViewSkelton from '../components/cityViewSkelton.vue'

</script>

