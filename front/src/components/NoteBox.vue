<script setup>
import { mdiBookEdit } from '@mdi/js';


defineProps({
  note: {
    type: Object,
    default: null
  }
})

// const emit = defineEmits(['reply', 'edit'])

async function reply(e) {
  console.log(e)
}
// async function edit(e) {
  
// }
</script>

<template>

    <div class="comment-box">
      <div class="comment-text">
        <span> {{ note.text }} </span>
          <h3> {{ note }} </h3>
          <button class="reply-button" :id="note.id" @click="(e) => $emit('reply', e)"> respondre </button> {{ " " }}
          <button class="edit-button" :id="note.id" @click="(e) => edit(e)"> editar</button>
      </div> 
    </div>

    <br />

</template>

<style>
.comment-box {
  display: flex;
  -ms-flex-item-align: center;
  margin-bottom: 20px;
  padding:0.5rem;
  margin: 0.5rem;
  border: 2px solid #000000;
  border-radius: 1em; /* Rounded corners */
  background-color: #f9f9f9; /* Light background */
}


/* Comment text */
.comment-text {
  margin-bottom: 10px;
  font-size: 1em;
}
.reply-button .edit-button {
  font-size:0.6em;
}

</style>

  

