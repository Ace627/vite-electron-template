<template>
  <div class="app-content h-full flex-col flex-center">
    <div class="sport-person"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
</script>

<style lang="scss" scoped>
$image-width: 1536px;

.sport-person {
  width: calc($image-width / 6);
  height: calc($image-width / 6);
  background-image: url('../../assets/images/sport-person.png');
  animation: sport 0.32s steps(6) infinite;
}

/* 创建奔跑动画的关键帧 */
@keyframes sport {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: -$image-width;
  }
}
</style>
