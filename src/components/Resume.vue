<script setup lang="ts">
  import {resumeInfoStore} from '@/stores/resume'
  import {columns} from './config'
  import { onMounted,reactive,computed } from 'vue';
  const ResumeStore = resumeInfoStore()
  let cloneColumns = reactive({list:JSON.parse(JSON.stringify(columns))})
  onMounted(async()=>{
    await ResumeStore.getAllInfo()
  })
  let columnsList = computed(() => {
    let arr = cloneColumns.list
    arr.forEach((ele,index)=>{
      for(let key in ResumeStore.resumeInfo){
        if(ele.key == key){
          if(key==='baseInfo'){
            arr[index].data = ResumeStore.resumeInfo[key]
          }else{
            arr[index].data = ResumeStore.resumeInfo?.allInfo?.[0]?.[key]
          }
        }
      }
    })
    console.log(arr,'arr')
    return arr
  })


</script>

<template>
  <div class="resume_wrapper">
    <div class="resume_box">
      <div class="resume_content_all">
        <div class="resume_l">
          <div class="photo_box"><img :src="columnsList[0]?.data[0]?.avatar" alt=""></div>
          <div class="resume_l_box"></div>
        </div>
        <div class="resume_r">
          <div v-for="item in columnsList" class="module_box">
            <div class="title">{{ item.label }}</div>
            <div class="content">
              <template v-if="item.data instanceof Array">
                <template v-for="(child,j) in item.data">
                  <div class="con_box" v-if="item.key === 'baseInfo'">
                    <span>姓名：{{ child.name }}</span>
                    <span>姓别：{{ child.sex==1?'男':'女' }}</span>
                  </div>
                  <div class="con_box" v-else-if="item.key === 'jobInfo'">
                    <span>职位：{{ child.jobName }}</span>
                  </div>
                  <span v-else>{{ child.key }}</span>
                </template>        
              </template>
              <!-- <template v-else-if="item.data instanceof Object">
                <div class="con_box" v-if="item.key === 'baseInfo'">
                  <span>姓名：{{ item.data.name }}</span>
                  <span>姓别：{{ item.data.sex==1?'男':'女' }}</span>
                </div>
                <div class="con_box" v-else>
                  <span>职位：{{ item.data.jobName }}</span>
                </div>
              </template> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume_wrapper{
  width: 800px;
  margin: 30px auto;
}
.resume_box{
  min-height: 1150px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 6px rgb(0 0 0 / 10%);
}
.resume_content_all{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.resume_l{
  width: 235px;
  background-color: rgb(51, 51, 51);
  height: 100%;
  padding:30px 25px;
  .photo_box{
    text-align: center;
    img{
      max-width: 130px;
      position: relative;
      z-index: 3;
      border: 1px solid #fff;
    }
  } 
}
.resume_r{
  flex:1;
  padding:20px;
  .title{
    font-weight: bold;
  }
  .content{
    margin:10px 0;
    font-size: 14px;
    span{
      margin-right:20px;
    }
  }
}
</style>
