<template>
  <div class="p-reviewScore p-reviewScore-sm">
    <review-total-left v-bind:reviewTotal="reviewTotal"></review-total-left>
    <div class="p-reviw-graph-area-right">
      <template v-for="(Rating, index) in reviewRating" :key="index">
        <review-total-right :Rating1="Rating"></review-total-right>
      </template>
    </div>
  </div>
  <p class="p-reviw-graph-area-foot">
    {{ reviewTotal.reviewCount }}評価 {{ reviewTotal.titleCount }}商品レビュー
  </p>
</template>

<script setup>
import ReviewTotalLeft from "./ReviewTotalLeft.vue";
import ReviewTotalRight from "./ReviewTotalRight.vue";

import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const route = useRoute();
const goodsId = route.params.goodsId;

const store = useStore();
onMounted(() => {
  store.dispatch("setReviewTotal", goodsId);
  store.dispatch("setReviewRating", goodsId);
});
let reviewTotal = computed(() => {
  console.log("数据类型是000000" + store.getters.getReviewTotal);
  return store.getters.getReviewTotal;
});
let reviewRating = computed(() => {
  console.log("数据类型是11111", store.getters.getReviewRating);
  return store.getters.getReviewRating.rating;
});
</script>

<style scoped>
.p-reviw-graph-area-right {
  box-sizing: border-box;
  display: inline-block;
  padding: 2px 2px 2px 2px;
  vertical-align: top;
  width: 100%;
}
.p-reviewScore {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-end;
}
.p-reviewScore {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-end;
}
.p-reviw-graph-area-foot {
  text-align: center;
  margin-top: -12px !important;
  margin-bottom: 12px;
}
</style>
