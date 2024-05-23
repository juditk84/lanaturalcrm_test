<script setup>
import { ref } from 'vue'
import { format } from '@formkit/tempo';

const props = defineProps({
  note: {
    type: Object,
    default: null
  }
})

// aqui s'ha de massejar més la cosa
const note = ref({
  text: props.note.text,
  createdAt: props.note.createdAt,
  id: props.note.id
})

const editting = ref(false)
const emit = defineEmits(['reply', 'update', 'destroy'])

async function reply() {
  emit('reply', {parentId : note.value.id})
}

async function update(){
  try {
    const data = {
      text: note.value.text,
      id: note.value.id
    }
    if (data.text.trim().includes('/n') && data.text.length < 4) console.log("this is empty")
    emit('update', data)
  } catch (err) {
    alert(err.message)
  } finally {
    editting.value = false;

  }
}
async function destroy(){
  try {
    const data = {
      id: note.value.id
    }
    emit('destroy', data)
  } catch (err) {
    alert(err.message)
  } finally {
    editting.value = false;
  }
}
function openEditor(e) {
  editting.value = true
}

</script>

<template>

    <div class="comment-box">
      <div class="editor" v-if="editting" form>
        <textarea v-model="note.text" @keyup.enter="update"> </textarea>
        <!-- <button @click="update"> guardar canvis </button> -->
      </div>
      
      <div v-else="" class="comment-text">
        <span class="title"> {{ note.text }} </span> <br />
        <span> {{ format(note.createdAt, "full", "ca") }}</span><br />
          <!-- <h3> {{ note }} </h3> -->
      </div>
      <button class="reply-button" v-if="!editting" :id="note.id" @click="(e) => reply(e)"> respondre </button> {{ " " }}
          <button class="edit-button" :id="note.id" @click="(e) => editting ? update(e): openEditor(e)"> {{ editting ? "guardar canvis" : "editar" }}</button>
          <button class="reply-button" :id="note.id" @click="(e) => destroy(e)" > esborrar </button>
    </div>

    <br />

</template>

<style>
.comment-box {
  display: grid;
  -ms-flex-item-align: center;
  margin-bottom: 20px;
  padding:1rem;
  margin: 1rem;
  border: 2px solid #000000;
  border-radius: 1em; /* Rounded corners */
  background-color: #f9f9f9; /* Light background */
}

/* Comment text */
.comment-text {
  margin-bottom: 10px;
  font-size: 1em;
}

.title {
  font-size:1.5em;
}

.reply-button, .edit-button {
  font-size:0.8em;
  margin: 0.8em;
  border-radius: 1em;
}
.reply-button:hover, .edit-button:hover {
  background-color: black;
  color: #f1f1e3;
}
</style>

  

