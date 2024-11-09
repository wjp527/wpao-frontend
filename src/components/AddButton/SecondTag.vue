<template>
  <div class="SecondTag">
    <div tabindex="0" class="plusButton">
      <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
        <g mask="url(#mask0_21_345)">
          <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup name="SecondTag">
</script>

<style lang="less" scoped>
/* 使用固定的缩小尺寸值 */
.plusButton {
  /* Config start */
  --plus_sideLength: 1.5rem; /* 直接设置缩小后的具体尺寸 */
  --plus_topRightTriangleSideLength: 0.7rem; /* 调整后的三角形尺寸 */
  /* Config end */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  width: var(--plus_sideLength);
  height: var(--plus_sideLength);
  background-color: #000000;
  overflow: hidden;
}

.plusButton::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-width: 0 var(--plus_topRightTriangleSideLength) var(--plus_topRightTriangleSideLength) 0;
  border-style: solid;
  border-color: transparent white transparent transparent;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
}

.plusButton:hover {
  cursor: pointer;
}

.plusButton:hover::before {
  --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
}

.plusButton:focus-visible::before {
  --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
}

.plusButton > .plusIcon {
  fill: white;
  width: calc(var(--plus_sideLength) * 0.7);
  height: calc(var(--plus_sideLength) * 0.7);
  z-index: 1;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
}

.plusButton:hover > .plusIcon {
  fill: black;
  transform: rotate(180deg);
}

.plusButton:focus-visible > .plusIcon {
  fill: black;
  transform: rotate(180deg);
}
</style>
