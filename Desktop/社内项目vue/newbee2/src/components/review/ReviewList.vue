<template>
  <p class="g-label-brand g-reviewList_label">ピックアップレビュー</p>
  <div v-for="(review, index) in reviews" :key="index">
    <review-com :review="review"></review-com>
    <p
      style="border-top: 1px dashed #cccccc; height: 1px; overflow: hidden"
    ></p>
  </div>

  <!-- <p class="g-align-tc">
    <a
      @click="changeShowed = !changeShowed"
      class="g-link displaymorereview"
      href="#p-reviewMore"
      role="button"
      aria-expanded="false"
      aria-controls="p-reviewMore"
      data-label="閉じる"
      data-accordion='{"scroll":false}'
    >
      <i class="g-i g-i-arrow-d"></i
      ><span
        >レビューをもっと見る（3/<span id="js-reviews-more">{{
          reviewCount
        }}</span
        >）</span
      ></a
    >
  </p> -->

  <div v-show="changeShowed" v-for="(review, index) in reviews2" :key="index">
    <review-com :review="review"></review-com>
    <p
      style="border-top: 1px dashed #cccccc; height: 1px; overflow: hidden"
    ></p>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ReviewCom from "./ReviewCom.vue";
const store = useStore();
const route = useRoute();
const goodsId = route.params.goodsId;

//初始化 0--2个展示
onMounted(() => {
  store.dispatch("setReviews", { goodsId: goodsId, offset: 0 });
  store.dispatch("setReviews", { goodsId: goodsId, offset: 3 });
});
let reviews = computed(() => store.getters.getReviews.reviewList);
let reviewCount = computed(() => store.getters.getReviews.reviewCount);

//初始化 3-。。。的数据
let changeShowed = false;
if (reviewCount.value > 3) {
  if (changeShowed) {
    onMounted(() => {
      store.dispatch("setReviews", { goodsId: goodsId, offset: 3 });
    });
    const reviews2 = computed(() => store.getters.getReviews2.reviewList);
  }
}

computed: {
  console.log("revivalist里的reviewcount数据是", reviewCount);
  console.log("revivalist里的review2数据是", reviews2);
  console.log("revivalist里的review数据是", reviews);
}
</script>

<style scoped>
.g-i {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  font-family: "icon";
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  line-height: 1;
  letter-spacing: 0;
  text-transform: none;
  pointer-events: none;
  speak: none;
  -webkit-font-smoothing: antialiased;
}
a {
  text-decoration: none;
  color: #333;
}
.g-link,
.g-sm-link {
  display: inline-flex;
  align-items: center;
}
.g-align-tc,
.g-sm-align-tc {
  text-align: center !important;
}
.g-reviewList_item p {
  word-break: break-all;
}
.g-reviewList_label {
  margin-bottom: 15px;
}

.g-label-brand {
  color: #009e96;
  border: 1px solid #009e96;
}
.g-label-brand,
.g-label-price,
.g-label-maker,
.g-label-required {
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1;
  display: inline-block;
  padding: 3px 5px;
  vertical-align: middle;
  white-space: nowrap;
  background-color: #fff;
}
</style>
