<template>
  <div class="flex justify-center max-h-[100svh] pb-8">
    <div id="posts-container" class="flex flex-col w-full max-w-2xl">
      <ul v-if="data.status !== 'Forbidden'" id="list" class="overflow-y-scroll" @scroll="onScroll">

        <li v-for="job in data"
            class="bg-gray-300 rounded-md p-1 shadow-md my-9 mx-2">

          <div class="flex justify-between mx-3 font-medium text-xl mt-1">
            <h2 class="text-left p-0.5 ">{{ job.title }} <span
                class="whitespace-nowrap text-center opacity-70 italic mx-2"> {{ job.city }}</span></h2>
            <h2 class="text-center p-0.5 opacity-70"></h2>
            <p :class="{ 'bg-red-200': job.level === 'Hard','bg-yellow-200': job.level === 'Medium','bg-green-300': job.level === 'Easy' }"
               class="text-center text-xl p-0.5 rounded px-1 text-gray-500 max-h-fit">
              {{ job.level }}</p>
          </div>

          <div v-if="job.photos" class="min-w-full bg-transparent mt-2">
            <swiper :allow-touch-move="false" :modules="modules" :navigation="true"
                    :pagination="{dynamicBullets: true, clickable: false}">
              <swiper-slide v-for="photo in job.photos" class="px-0.5">
                <nuxt-img :placeholder="[350, 268, 5]" :src="photo.image"
                          class="rounded min-h-[268px] max-h-[268px] md:max-h-[468px] md:min-h-[468px] w-full select-none"
                          draggable="false"
                          style="image-orientation: from-image"/>
              </swiper-slide>
            </swiper>
          </div>

          <div class="flex justify-between mx-3 my-2 items-center">

            <p class="text-left leading-tight w-2/3 text-gray-700 font-medium">{{ job.description }}</p>
            <a  class="bg-white w-1/5 p-3 text-center cursor-pointer align-middle rounded font-bold bg-cyan-800 text-gray-400"
               @click.prevent="bid(job.id)">View</a>

          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import {getMyPosts, getPosts, getGroupPosts} from "~/services/getPosts";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Navigation, Pagination} from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useDataStore} from "~/services/dataStorage";

export default {
  name : "Post",
  props: {
    myPosts: String
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      easy                : false,
      data                : [],
      scrollCheckForIphone: 1,
    }
  },
  async created() {
    if (this.myPosts === "1")
      this.data = await getMyPosts();
    else if (this.myPosts === "2")
      this.data = await getGroupPosts(999999, this.$route.params.id)
    else
      this.data = await getPosts();

    if (this.data.status === 'Forbidden')
      navigateTo('/');
  },
  methods: {
    useDataStore,
    async refreshData() {
      if (this.myPosts === "1")
        this.data = await getMyPosts();
      else if (this.myPosts === "2")
        this.data = await getGroupPosts(999999,this.$route.params.id);
      else
        this.data = await getPosts();
    },
    async onScroll({target: {scrollTop, clientHeight, scrollHeight}}) {
      if (this.data.length > 0) {
        if (scrollTop + clientHeight <= scrollHeight) {
          this.scrollCheckForIphone = 1
        }
        if (scrollTop + clientHeight >= scrollHeight && this.scrollCheckForIphone !== 0) {
          this.scrollCheckForIphone = 0;
          if (this.myPosts === "1")
            this.data.push(...await getMyPosts(this.data[this.data.length - 1].id))
          else if (this.myPosts === "2")
            this.data.push(...await getGroupPosts(this.data[this.data.length - 1].id), this.$route.params.id)
          else
            this.data.push(...await getPosts(this.data[this.data.length - 1].id))
        }
      }
    },
    bid(id) {
      navigateTo(`/bid/${id}`)
    }
  },
}

</script>

<style>
#list::-webkit-scrollbar {
  display: none;
}

.swiper-pagination-bullet {
  background-color: #25de8f;
}

#list {
  -webkit-overflow-scrolling: touch;
}


</style>