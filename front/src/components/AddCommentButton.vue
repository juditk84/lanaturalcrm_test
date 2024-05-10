<script setup>

</script>

<template>

<button class="big-plus-button"> + </button>
</template>

<style>
.big-plus-button {
  /* Making the button round */
  border-radius: 4em; /* Fully rounded */
  /* border: 2fr solid black; Border size and style */
  padding: 1rem; /* Padding to make the button larger */
  background-color: #efefd3; /* Background color */
  color: #000000; /* Text color */
  font-size: 2em; /* Font size for the plus sign */
  cursor: pointer; /* Cursor style */
  transition: all 0.2s ease; /* Smooth transition for hover effects */
  align-self:flex-end;
}

.big-plus-button::before {
  content: "+"; /* Plus sign */
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%); /* Centering the plus sign */
  font-size: 36px; /* Larger font size for the plus sign */
}

.big-plus-button:hover {
  background-color: #d6c505;
  color: #f1f1e3 /* Lighter shade on hover */
}

.big-plus-button:active {
  box-shadow: 0 0 2px rgb(234, 174, 215); /* Shadow effect on click */
  transform: translateY(2px); /* Slight downward movement on click */
}
</style>