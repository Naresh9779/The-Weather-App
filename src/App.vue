<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';

</script>

<template>
  
  <div class= "flex  flex-col  min-h-svh bg-weatherPrimary">
   <NavigationBar/>
 
  
   <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
    
  </div>
</template>
<style>
.page-enter-active
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from
.page-leave-from {
  opacity: 0;
}

</style>



