import { defineStore } from 'pinia'
import { getData } from '@/api/baseInfo.js'
const myId = '63b513aa94e29cc2f246d4d2'

export const baseInfoStore = defineStore('baseInfo', {
  state:()=>{
    return{
      data:{}
    }
  },
  //computed 修饰一些值
  getters:{

  },
  //methods,同步or异步，提交state
  actions:{
    async getBaseInfo() {
      await getData({id:myId}).then((res:any)=>{
        this.data = res.data[0]
      })
    },
  }
})