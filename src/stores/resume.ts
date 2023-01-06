import { defineStore } from 'pinia'
import { getData,getAllData } from '@/api/baseInfo'
import { getJobData } from '@/api/job'
const myId = '63b513aa94e29cc2f246d4d2'

export const resumeInfoStore = defineStore('baseInfo', {
  state:()=>{
    return{
      resumeInfo:{
        allInfo:{},
        baseInfo:{},
        jobInfo:{}
      }
    }
  },
  //computed 修饰一些值
  getters:{

  },
  //methods,同步or异步，提交state
  actions:{
    async getAllInfo() {
      await getAllData({id:myId}).then((res:any)=>{
        this.resumeInfo.allInfo = res.data
        this.resumeInfo.baseInfo = res.data
      })
    },
    async getBaseInfo() {
      await getData({id:myId}).then((res:any)=>{
        this.resumeInfo.baseInfo = res.data[0]
      })
    },
    async getJobInfo() {
      await getJobData({id:myId}).then((res:any)=>{
        this.resumeInfo.jobInfo = res.data[0]
      })
    },
  }
})