<script setup>
import NoteBox from '@/components/NoteBox.vue'
import AddCommentButton from '@/components/AddCommentButton.vue'
import CardBoxModal from './CardBoxModal.vue';
import AddComment from './AddComment.vue';
import { ref, computed } from 'vue';
import { useMyFetch } from '@/helper/useMyFetch';
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
  commentableId: {
    type: String,
    require: false,
  },
  commentableType: {
    type: String,
    require: false,
  }
})
const loading = ref(false)
const isModalActive = ref(false)
const userStore = useUserStore()
const notes = ref(null)
// const commentableId = computed(() => props.notes?.[0].commentableId || null)
// const commentableType = computed(() => props.notes?.[0].commentableType || null)
const parentId = ref(null)
async function updateComments(){
  try {
    // something to fetch comments from any backend route with commtId i commtType
    // vue use and make it reload upon changing url 
    // openForm changes url 
    // submit as emit (crida userStore.addComment)
    // const response = await 
    loading.value = true;
    const data = await userStore.getComments(props.commentableType, props.commentableId)
    notes.value = data?.notes
    
  } catch (error) {
    alert(`${error.message}`)
  } finally {
    loading.value = false;
  }
}
async function openForm(e) {
   try {
    parentId.value = await e.target.id || null
    isModalActive.value = true
   } catch (err) {
    alert(err.message)
  //  } finally {
    
   }
}

async function submit(data) {
    try {
      const response = await userStore.addComment(props.commentableType, "note", {...data, parentId : parentId, commentableId: props.commentableId})
      if (response.ok) isModalActive.value = true
    } catch (err) {
      alert(err.message)
    } finally {
      updateComments()
    }
}

</script>

<template>
    <button @click="updateComments">CLIK</button>
   <CardBoxModal v-model="isModalActive" title="Afegeix una nova nota">
        <!-- <AddComment :commentableId=props.notes?.[0].commentableId :commentableType=props.notes?.[0].commentableType :parentId="parentId"/> -->
        <AddComment @submit="submit" />
      </CardBoxModal>

    <div class="comment-container"> 
       <h2 class="text-xl font-semibold mb-4">Notes</h2>

    <AddCommentButton @click="(e) => openForm(e)">
        </AddCommentButton>
         
    <NoteBox v-for="note in notes" 
          :note="note"
          @reply="openForm"
        /> 
       
</div>
    

        
 
</template>

<style>
/* General styles */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

/* Comment container */
.comment-container {
  display: grid;
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid #000000;
  border-radius: 1em; /* Rounded corners */
  background-color: #f9f9f9; /* Light background */
}

/* Comment text */
.comment-text {
  margin-bottom: 10px;
  font-size: 14px;
}

/* Username */
.username {
  font-weight: bold;
  color: #000;
}

/* Date */
.date {
  font-size: 12px;
  color: #777;
}


</style>