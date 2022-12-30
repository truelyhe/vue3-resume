import type { IForm } from '@/components/base-ui/form/types';

export const basicConfig: IForm = {
  formItems: [
    {
      field: 'sex',
      type: 'select',
      label: '性别',
      placeholder: '请选择性别',
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ]
    },
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
    },
    // {
    //   field: 'password',
    //   type: 'password',
    //   label: '密码',
    //   placeholder: '请输入密码'
    // },
    // {
    //   field: 'date',
    //   type: 'date',
    //   label: '日期',
    //   placeholder: '请选择日期'
    // },
    // {
    //   field: 'daterange',
    //   type: 'daterange',
    //   label: '日期范围',
    //   placeholder: '请选择日期范围'
    // },
    // {
    //   field: 'sport',
    //   type: 'select',
    //   label: '运动',
    //   placeholder: '请选择运动',
    //   options: [
    //     { label: '足球', value: '33' },
    //     { label: '篮球', value: '22' },
    //     { label: '排球', value: '11' }
    //   ]
    // },
    // {
    //   field: 'cascader',
    //   type: 'cascader',
    //   label: '运动',
    //   placeholder: '请选择运动',
    //   options: [
    //     {
    //       value: 'guide',
    //       label: 'Guide',
    //       children: [
    //         {
    //           value: 'disciplines',
    //           label: 'Disciplines',
    //           children: [
    //             {
    //               value: 'consistency',
    //               label: 'Consistency'
    //             },
    //             {
    //               value: 'feedback',
    //               label: 'Feedback'
    //             },
    //             {
    //               value: 'efficiency',
    //               label: 'Efficiency'
    //             },
    //             {
    //               value: 'controllability',
    //               label: 'Controllability'
    //             }
    //           ]
    //         },
    //         {
    //           value: 'navigation',
    //           label: 'Navigation',
    //           children: [
    //             {
    //               value: 'side nav',
    //               label: 'Side Navigation'
    //             },
    //             {
    //               value: 'top nav',
    //               label: 'Top Navigation'
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
    // {
    //   type: 'datepicker',
    //   label: '运动',
    //   placeholder: '请输入运动'
    // }
  ]
};
