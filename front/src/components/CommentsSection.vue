<script setup>
import NoteBox from '@/components/NoteBox.vue'
import AddCommentButton from '@/components/AddCommentButton.vue'
import CardBoxModal from './CardBoxModal.vue';
import AddComment from './AddComment.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useMyFetch } from '@/helper/useMyFetch';
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'

// s'ha de passar commentableType que serà "worker", "task", "projects"...whatever Thing the comments are about
// i commentableId que serà l'id d'aquesta cosa
const props = defineProps({
  commentableId: {
    type: String,
    require: true,
  },
  commentableType: {
    type: String,
    require: true,
  }
})

const userStore = useUserStore()
const route = useRoute()

const loading = ref(false)
const isModalActive = ref(false)
const notes = ref(null)
const parentId = ref(null)


// this is GET /all comments
async function updateComments(){
  try {
    loading.value = true;
    const data = await userStore.getComments(props.commentableType, props.commentableId)
    notes.value = data?.notes
    return notes
  } catch (error) {
    alert(`${error.message}`)
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await updateComments()})

  watch(route, async () => await updateComments())

async function openForm(data) {
   try {
    parentId.value = data.parentId ?? null
    isModalActive.value = true
   } catch (err) {
    alert(err.message)  
   }
}

async function submit(data) {
    try {
      data = {
        ...data,
        parentId : parentId.value,
        commentableId: props.commentableId,
        commentableType: props.commentableType
      }
      const response = await userStore.addComment("note", data)
      return response
    } catch (err) {
      alert(err.message)
    } finally {
      isModalActive.value = false
      updateComments()
    }
}

// This is PATCH the one comment
async function updateComment(data) {
    try {
      let regex = /\\n/i;
      if (data.text.match(regex)) console.log("hello we match the Queenex")
      data = {
        ...data,
        commentableId: props.commentableId,
        commentableType: props.commentableType
      }
      const response = !data.text.match(regex) ? await userStore.editComment("note", data) : await userStore.deleteComment("note", data)
      // const response = await userStore.editComment("note", data)
      return response
    } catch (err) {
      alert(err.message)
    } finally {
      isModalActive.value = false
      updateComments()
    }
}

async function deleteComment(data) {
  try {
    const response = await userStore.deleteComment("note", data)
    return response
  } catch (err) {
    alert(err.message)
  } finally {
    updateComments()
  }
}
</script>

<template>
  <!-- Quant funcioni el onMounted aquest botó pot marxar, de moment es només per carregar les notes -->
    <button @click="updateComments">CLIK</button>

      <CardBoxModal v-model="isModalActive" title="Afegeix una nova nota">
        <AddComment @submit="(data) => submit(data)" />
      </CardBoxModal>

        <div class="comment-container"> 
          <h2 class="text-xl font-semibold mb-4">Notes</h2>
            <AddCommentButton @click="openForm"/>
            <NoteBox v-for="note in notes"
              :note="note"
              @reply="(parentId) => openForm(parentId)"
              @update="(data) => updateComment(data)"
              @destroy="(data) => deleteComment(data)"
            />     
        </div>
  
</template>

<style>

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.comment-container {
  display: grid;
  margin-bottom: 20px;
  margin: 1rem;
  padding: 0.5rem;
  border: 2px solid #000000;
  border-radius: 1em;
  background-color: #f9f9f9;
}

.comment-text {
  margin-bottom: 10px;
  font-size: 14px;
}

.username {
  font-weight: bold;
  color: #000;
}

.date {
  font-size: 12px;
  color: #777;
}


</style>