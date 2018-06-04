<template>
 
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">
          <img :src="slide" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    
</template>

<script>
  export default {
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          autoplay: 1000,
          setWrapperSize :true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          observeParents:true
        }
      }
    }
  }
</script>
<style scoped>
   img{width: 100%}
</style>