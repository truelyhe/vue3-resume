<script setup lang="ts">
  import { reactive } from 'vue' // 引入reactive函数
  import {resumeInfoStore} from '@/stores/resume'
  import {basicConfig,jobConfig} from './config/config'
  import { updateData } from '@/api/baseInfo.js'
  import { updateJobData,addJobData } from '@/api/job.js'
  import pageForm from '@/components/page-form'
  import { ElMessage } from 'element-plus';
  const myId = '63b513aa94e29cc2f246d4d2'
  const ResumeStore = resumeInfoStore()
  // defineProps<{
  //   msg: string
  // }>()
  let data =  reactive({
    isShow:false,
    tabList:[
      {value:1,label:'基本信息',icon:'icon-shetuanhuodong',api:updateData,dataKey:'baseInfo'},
      {value:2,label:'求职岗位',icon:'icon-yingpinzhiwei',api:updateJobData,dataKey:'jobInfo'},
      {value:3,label:'教育背景',icon:'icon-xueli'},
      {value:4,label:'工作经验',icon:'icon-gongzuojingyan'},
      {value:5,label:'项目经验',icon:'icon-shixijingli'},
      {value:6,label:'技能特长',icon:'icon-zuopinzhanshi'},
      {value:7,label:'自我评价',icon:'icon-ziwopingjia'}
    ],
    currentTab:1,
    formConfig:'basicConfig',
    formData:null
  })
  const changeShowFn = () =>{
    data.isShow = !data.isShow
    clickTabFn(data.currentTab)
  }

  const clickTabFn = (value) =>{
    data.currentTab = value
    const dataKey = data.tabList.find(e=>e.value==data.currentTab).dataKey
    data.formData = ResumeStore.resumeInfo[dataKey][0]
  }

  const handleSubmit = (datas) =>{
    const currentApi = data.tabList.find(e=>e.value==data.currentTab).api
    //addJobData({...datas,resumeId:myId}).then((res:any)=>{})
    datas._id?delete datas._id:''
    currentApi(myId,datas).then((res:any)=>{
      if(res.code==200){
        ElMessage.success(res.msg)
        ResumeStore.getAllInfo()
      }
    })
  }
</script>

<template>
  <div :class="['edit_wrapper',{'edit_show':data.isShow}]">
    <svg :class="['icon btn_icon',data.isShow?'icon-zhankai-':'icon-shouqi-']" aria-hidden="true" @click="changeShowFn">
      <use :xlink:href="'#'+(data.isShow?'icon-zhankai-':'icon-shouqi-')"></use>
    </svg>
    <div class="edit_box">
      <div class="edit_content_all">
        <div class="edit_l">
          <ul class="edit_tab">
            <li :class="{active:data.currentTab === item.value}" v-for="item in data.tabList" @click="clickTabFn(item.value)">
              <el-popover
                placement="left"
                :width="100"
                trigger="hover"
                :content="item.label" v-if="!data.isShow"
              >
                <template #reference>
                  <svg :class="['icon tab_icon']" aria-hidden="true" v-if="!data.isShow" @click="changeShowFn">
                    <use :xlink:href="'#'+item.icon"></use>
                  </svg>
                </template>
              </el-popover>
              <b>{{ item.label }}</b>
            </li>
          </ul>
          <div class="edit_b">
            <pageForm :bakFormData="data.formData" :formConfig="data.currentTab==2?jobConfig:basicConfig" @handleSubmit="handleSubmit"></pageForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit_wrapper{
  position: fixed;
  right:0;
  top:0;
  height: 100%;
  width:500px;
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
  transition: all .3s ease-out 0s;
  transform: translateX(calc(100% - 55px));
  -webkit-transform: translateX(calc(100% - 55px));
  .btn_icon{
    background-color: #fff;
    fill: #1467cc;
    width: 30px;
    height: 30px;
    padding:25px 30px 25px 16px;
    border-radius: 50%;
    position: fixed;
    top:50%;
    right:495px;
    z-index: 1;
    margin-top: -40px;
    cursor: pointer;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    transition: all .3s ease-out 0s;
    transform: translateX(calc(100% - 55px));
    -webkit-transform: translateX(calc(100% - 55px));
    &:hover{
      right:500px;
    }
  }
  &.edit_show{
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
}
.edit_box{
  min-height: 1150px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}
.edit_content_all{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;  
  height: 100%;
  z-index: 2;
  background: #fff;
}
.edit_l{
  display: flex;
  height: 100%;
}
.edit_tab{
  padding: 0;
  margin: 0;
  li{
    padding: 0 20px 0 10px;
    list-style: none;
    height: 8%;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-right: 2px solid #ddd;
    &:hover,&.active{
      color: #1467cc;
      .tab_icon{
        fill: #1467cc;
      }
    }
    &.active{
      border-right: 2px solid $primary-color;
    }
    .tab_icon{
      width: 35px;
      height: 35px;
    }
    b{
      margin-left:10px;
      white-space: pre-line;
      width:33px;
    }
  }
}
.edit_b{
  flex:1
}
</style>
