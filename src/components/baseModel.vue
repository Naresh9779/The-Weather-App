<template>
    <Teleport to="body">
        <Transition name="model-outer">
            <div  v-show="modelActive" class=" absolute w-full  bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
             <Transition name="model-inner">
                 <div v-if="modelActive" class="bg-white p-4 self-start mt-32 max-w-screen-md">
                    <slot/>
                    <button @click="$emit('close-modal')" class="text-white mt-8 bg-weatherSecondary py-2 px-6">Close</button>
                 </div>
             </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineEmits(["close-modal"
])
defineProps({
    modelActive:{
        type:Boolean,
        default: false
    }
})

</script>

<style scoped>

.model-outer-enter-active,
.model-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.model-outer-enter-from,
.model-outer-leave-to{
    opacity: 0;
}

.model-inner-enter-active{
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;

}
.model-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.model-inner-enter-from{
    opacity: 0;
    transform: scale(0.8);
}
.model-inner-leave-to{
    transform: scale(1);
    
}

</style>