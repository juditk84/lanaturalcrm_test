<script setup>

</script>

<template>
  <button class="big-plus-button"> nova </button>
</template>

<style>
.big-plus-button {
  border-radius: 3em;
  display: grid;
  padding: 1rem;
  margin: 1rem;
  background-color: #e6df0f;
  color: #000000; 
  transition: all 0.2s ease;

}

.big-plus-button::before {
  /* content: "+"; Plus sign */
  position: flex;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-size: 36px;
}

.big-plus-button:hover {
  background-color: black;
  color: #f1f1e3 
}

.big-plus-button:active {
  box-shadow: 0 0 2px rgb(234, 174, 215);
  transform: translateY(2px); 
}
</style>