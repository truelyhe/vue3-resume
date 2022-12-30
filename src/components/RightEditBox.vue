<script setup lang="ts">
import { reactive } from 'vue' // 引入reactive函数
import {resumeStore} from '@/stores/index'
const Test = resumeStore()
// defineProps<{
//   msg: string
// }>()
let data =  reactive({
  isShow:false,
  tabList:[
    {value:1,label:'基本\n信息',icon:'icon-shetuanhuodong'},
    {value:2,label:'求职\n岗位',icon:'icon-yingpinzhiwei'},
    {value:3,label:'教育\n背景',icon:'icon-xueli'},
    {value:4,label:'工作\n经验',icon:'icon-gongzuojingyan'},
    {value:5,label:'项目\n经验',icon:'icon-shixijingli'},
    {value:6,label:'技能\n特长',icon:'icon-zuopinzhanshi'},
    {value:7,label:'自我\n评价',icon:'icon-ziwopingjia'}
  ],
  currentTab:1
})
const changeShowFn = () =>{
  data.isShow = !data.isShow
}

const change =()=>{
  Test.setCurrent()
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
            <li :class="{active:data.currentTab === item.value}" v-for="item in data.tabList" @click="data.currentTab = item.value">
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
          <div class="edit_b"></div>
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
  width:450px;
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
    right:445px;
    z-index: 1;
    margin-top: -40px;
    cursor: pointer;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    transition: all .3s ease-out 0s;
    transform: translateX(calc(100% - 55px));
    -webkit-transform: translateX(calc(100% - 55px));
    &:hover{
      right:450px;
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
    }
  }
}
</style>
