import { defineStore } from 'pinia'

export const resumeStore = defineStore('test', {
  state:()=>{
    return{
      current:1,
      name:'abc双'
    }
  },
  //computed 修饰一些值
  getters:{

  },
  //methods,同步or异步，提交state
  actions:{
    setCurrent () {
      this.current++
    }
  }
})