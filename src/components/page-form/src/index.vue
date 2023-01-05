<template>
  <div class="page-form">
    <hForm v-bind="props.formConfig" v-model="formData">
      <template #footer="{ formRef }">
        <div class="search-btn">
          <el-button
            type="default"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" @click="handleSubmit(formRef)"
            >保存</el-button
          >
        </div>
      </template>
    </hForm>
  </div>
</template>

<script setup lang="ts">
import hForm from '@/components/base-ui/form';
// import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { ref, defineProps, defineExpose, defineEmits } from 'vue';
import type { FormInstance } from 'element-plus'

const emits = defineEmits(['handleSubmit', 'handleResetClick']);
const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  }
});
const formItems = props.formConfig.formItems ?? [];
const formOriginData: any = {};
for (const item of formItems) {
  formOriginData[item.field] = '';
}
const formData = ref(formOriginData);
const handleResetClick = () => {
  // 直接赋值导致form 组件 formData=ref({...props.modelValue}) 浅拷贝 没有依赖
  // 解决办法一: 循环formData.value[`${key}`] = formOriginData[key];赋值form.value的属性,触发 hForm组件ref 更新

  // 解决办法二:不是用 使用formData=ref({...props.modelValue})  以及 不使用循环,以及hForm对值不使用双向绑定:从而使用:model-value="modleValue[`${item.field}`]" 和 @update:modelValue='handleValueChange($event,item.field)'
  // handleValueChange(value:any,field:string){ emists('upadate:modelValue',{...props.modelValue,[field]:value}) }
  //
  for (const key in formOriginData) {
    // 解决办法一
    formData.value[`${key}`] = formOriginData[key];
    // 解决办法二
    // formData.value = formOriginData;
  }
  emits('handleResetClick');
};

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      emits('handleSubmit', formData.value)
    } else {
      return false
    }
  })
};

// 暴露方法
defineExpose({
  handleSubmit,
  handleResetClick
});
</script>

<style scoped lang="scss">
.search-btn {
  text-align: right;
  padding: 5px;
}
</style>
