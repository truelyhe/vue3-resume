export const columns = Object.freeze([
  {
    key:'baseInfo',
    label:'基本信息',
    data:{
      sex:1,
      name:'张三',
      birth:'2000-01',
      phone:'18919191919'
    }
  },{
    key:'job',
    label:'求职岗位',
    data:{
      jobName:'讲师',
      city:'北京',
      salary:'20k',
      time:1
    }
  },{
    key:'work',
    label:'工作经验',
    data:[{
      companyName:'字节跳动',
      jobName:'程序员',
      workTime:['2021-01','2022-10'],
      workContent:'负责公司总部的来访客户接待工作，负责引导和介绍公司的分布情况；  负责中心简单财务管理，资产管控； 负责招聘工作，确保人才梯队发展和人才储备及培养'
    }]
  }
])