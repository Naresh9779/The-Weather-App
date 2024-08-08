<template>
    <div class="flex py-6 px-4 bg-weatherSecondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <animationPlaceHolder class=" max-w-[50%]"/>
            <animationPlaceHolder class=" max-w-[40%]"/>
        </div>
        <div class="flex flex-col gap-2">
            <animationPlaceHolder class=" max-w-[50px] w-full" />
            <animationPlaceHolder class=" max-w-[75px] w-full"/>
            </div>
    </div>
</template>

<script setup>
import animationPlaceHolder from './animationPlaceHolder.vue';

</script>

