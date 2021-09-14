<template>
    <div>
        <div class="content">
            <div class="circle">
                <div class="item">
                    <circle-progress :rate="state.progress"></circle-progress>
                </div>
            </div>
        </div>
       
    </div>
</template>


<script lang="ts">
import { defineComponent,reactive } from 'vue'
import CircleProgress from '../components/CircleProgress.vue'
export default defineComponent({
    components: {
        CircleProgress
    },
    setup() {
        const state = reactive({
            progress: .3,
            percent:0,
            a:'',
            b:''
        })




        function progressBar (){
            state.percent+=5
            if(state.percent<=50){
                state.a = 'rotate(' + (state.percent * 3.6) + 'deg)'
            }else{
                state.a = 'rotate(0deg)'
            }
        }

        // setInterval(()=>{
        //     state.progress +=0.01
        // },1000)





        

        return {
            state
        }
    },
})
</script>

<style scoped lang="scss">

.content {
    margin: 0 auto;
    display: block;
    width: 1.28rem;
    .circle {
      margin: 20px 0;
      width: 1.28rem;
      .item {
      display: block;
      width: 1.28rem;
      height: 1.28rem;
    }
    }
}
</style>