<script setup>
    import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
    import { computed, ref } from 'vue'
    import calendarAPIprovisional from '@/calendarAPIprovisional.js'
    const arrayOfDraggables = ref(['red', 'green', "pink", "cyan"])
    
    function handleDragStart(e) {
        e.target.style.opacity = '0.4';
        e.dataTransfer.setData("text/plain", e.target.id)
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }

    function handleDrop(e) {
        // storing these for readability:
        const indexOfItemMoved = e.dataTransfer.getData("text/plain")
        const indexOfDroppable = e.target.id

        // splice() returns an array, since it's always gonna be 1 object moved, I grab the [0] index in the array.
        const itemMoved = arrayOfDraggables.value.splice(indexOfItemMoved, 1)[0] 

        // delete and add operation:
        arrayOfDraggables.value.splice(indexOfDroppable, 0, itemMoved)
    }

    function allowDrag(e) {
        e.preventDefault()
    }




    const today = ref(new Date())
    const todayDay = today.value.getDate()
    const todayMonth = today.value.getMonth()

    // volem un display que tingui
    // |                                        year                           |                                        year                            |
    // |month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month|month
    //  days  days  days  days  etc
</script>

<template>
<div class="grid grid-cols-12 max-w-none overflow-auto">
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
</div>
        
        <div class="outline self-center grid grid-cols-4">
            <div v-for="cosa, index of arrayOfDraggables" 
                 :id="index" @dragstart="(e) => handleDragStart(e)"
                 @dragend=  "(e) => handleDragEnd(e)"
                 @dragover= "(e) => allowDrag(e)"
                 @drop=     "(e) => handleDrop(e)"
                 draggable="true" 
                 :class="`outline m-1 bg-${cosa}-400`">{{ cosa }}</div>
        </div>

</template>