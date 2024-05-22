<script setup>
    import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
    import { ref } from 'vue'

    const arrayOfDraggables = ref(['red', 'green', "pink", "cyan"])

    function handleDragStart(e) {
        e.target.style.opacity = '0.4';
        e.dataTransfer.setData("text/plain", e.target.id)
        console.log(e.target.id)
        // console.log(e.dataTransfer.getData("text/plain"))
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }

    function handleDrop(e) {
        // s'agafa l'element del droppable, es fica en el dataTransfer, es getteja en el drop event i es fa servir l'id(index) en el
        // e.target del droppable i es fa un recolocaçao de l'arrayOfDraggables.
        const indexOfItemMoved = e.dataTransfer.getData("text/plain")
        const indexOfDroppable = e.target.id
        const itemMoved = arrayOfDraggables.value.splice(indexOfItemMoved, 1)[0]
        arrayOfDraggables.value.splice(indexOfDroppable, 0, itemMoved)
    }

    function allowDrag(e) {
        e.preventDefault()
    }

    



</script>

<template>
    <LayoutAuthenticated>
        <div>hola</div>
        <div class="outline self-center grid grid-cols-4 px-96">
            <div v-for="cosa, index of arrayOfDraggables" 
                 :id="index" @dragstart="(e) => handleDragStart(e)"
                 @dragend="(e) => handleDragEnd(e)"
                 @dragover="(e) => allowDrag(e)"
                 @drop="(e) => handleDrop(e)"
                 draggable="true" 
                 :class="`outline m-1 bg-${cosa}-400`">{{ cosa }}</div>
        </div>
    </LayoutAuthenticated>
</template>