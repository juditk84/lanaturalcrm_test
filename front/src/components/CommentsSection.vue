<script setup>
import NoteBox from '@/components/NoteBox.vue'
import AddCommentButton from '@/components/AddCommentButton.vue'

const props = defineProps({
  notes : {
    type: Object, 
    required: false
  }})


</script>

<template>
   

    <!-- this is tailwind. so horrendously unnecessary, I know -->
    <div class="comment-container"> 
        <div class="container mx-auto px-4 py-8">
            <div class="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Comments</h2>
                    <div class="flex flex-col gap-4">
                </div>
            </div>
        </div>

    <AddCommentButton @click="isModalActive=true">
        </AddCommentButton>
         
    <NoteBox v-for="note in props.notes" 
          :title="note.title"
          :label="note.text"
          :children="0"
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