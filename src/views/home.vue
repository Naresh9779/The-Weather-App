<template>
   <main class="container  text-white">
       <div class="mb-8 pt-4 relative">
         <input class="py-2 border-b px-3 w-full bg-transparent focus:outline-none focus:border-weatherSecondary focus:shadow-[0px_1px_0_0,#00202e]" 
         v-model="searchQuery"
         @input="fetchData"
         placeholder="Search City Or State">
         <ul v-if="queryResult" class="absolute bg-weatherSecondary w-full shadow-md text-white py-2 px-1 top-[66px]" >
          <p v-if="searchError">Something Went Wrong Try Again</p>
          <p v-if="!searchError&&queryResult.length==0">No Result Found</p>
         <template v-else>
             <li class="py-2 cursor-pointer" v-for="item in queryResult" :key="item.id" @click="previewCity(item)">{{ item.properties.full_address }}</li>
         </template>
       </ul>
       </div>
       <div class=" flex flex-col gap-4">
        <Suspense>
            <cityList/>
            <template #fallback>
               <CityCardSkelton/>
            </template>
        </Suspense>
       </div>
   </main>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios'
import {useRouter} from 'vue-router'
import cityList from'../components/cityList.vue';
import CityCardSkelton from '../components/cityCardSkelton.vue';
const searchQuery = ref('');
const queryTimeOut = ref(null);
const queryResult = ref(null);
const searchError = ref(false);

const router=useRouter();
const previewCity=(item) =>{
    const [city ,state,country]=item.properties.full_address.split(',');
    // console.log(item);
    router.push({
        name:'cityView',
        params:{state:state.replaceAll(" ",""),city:city.replaceAll(" ","")},
        query:{
            lat:item.geometry.coordinates[1],
            lon:item.geometry.coordinates[0],
            preview:true

        }
    })
 
}

const fetchData= ()=>{
    clearInterval(queryTimeOut.value);
    queryTimeOut.value=setTimeout(async () => {
        
       if(searchQuery.value!="")
       { try{const response=await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&access_token=pk.eyJ1IjoibmFyZXNoOTciLCJhIjoiY2x5cmg4cHN4MDc5dDJqcXZyNHdlZ3h5ZiJ9.V6mkkfQBZ1o6-V95lX7hiA&&types=place`)
  
    queryResult.value=response.data.features;
   }catch{
     searchError.value=true;
     

   }

        return;}
        queryResult.value=null;

        
    }, 300);
    
}

</script>

