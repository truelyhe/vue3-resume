<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :model="formData" :label-width="props.labelWidth" ref="formRef">
      <template v-for="item in props.formItems" :key="item.label">
        <el-form-item :label="item.label" :prop="item.field" :rules="item.rules">
          <component
            :is="`el-${item.type}`"
            :placeholder="item.placeholder"
            v-bind="item.attrs"
            v-model="formData[item.field!]"
          >
            <template v-if="item.options">
              <component
                v-for="(opt, i) in item.options"
                :key="i"
                :is="`el-${opt.type}`"
                :label="opt.label"
                :value="opt.value"
              ></component>
            </template>
          </component>
        </el-form-item>
      </template>
    </el-form>
    <div class="footer">
      <slot name="footer" :formRef="formRef"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFormItem } from '../types';
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { FormInstance } from 'element-plus'
const emits = defineEmits(['update:modelValue']);
const formRef = ref<FormInstance>()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as () => IFormItem[],
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '80px'
  },
});
// 赋值

const formData = ref({ ...props.modelValue });
// const formData = computed(() => ({ ...props.modelValue }));
// 重置还有问题:产生递归
// 监听更新值更新到pageSearch页面
// watch(
//   () => props.modelValue,
//   (newValue) => {
//     formData.value = newValue;
//   }
// );

const submitForm = async () => {
  
}

// 进行深度监听
watch(
  formData,
  (newValue) => {
    emits('update:modelValue', newValue);
  },
  {
    deep: true
  }
);

defineExpose({
  submitForm
})
</script>

<style scoped lang="scss">
.el-select,
:deep(.el-cascader),:deep(.el-input) {
  width: 100%;
}
.header {
  text-align: center;
}
.my-form{
  padding:20px 25px 20px 0;
}
</style>
