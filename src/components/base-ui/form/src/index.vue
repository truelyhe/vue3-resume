<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :model="formData" :label-width="props.labelWidth" ref="formRef">
      <template v-for="item in props.formItems" :key="item.label">
        <el-form-item :label="item.label" :prop="item.field" :rules="item.rules">
          <component
            v-if="item.type !== 'upload'"
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
          <el-upload
            v-else
              v-bind="{...item.attrs,...item.uploadAttrs}"
              :on-success="(res,file)=>uploadSuccess(res,file,item.field)">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <slot name="uploadArea"></slot>
              <slot name="uploadTip"></slot>
          </el-upload>
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
import type { FormInstance,UploadProps } from 'element-plus'

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

const imageUrl = ref('')

const uploadSuccess = (
  response,
  uploadFile,
  field
) => {
  imageUrl.value = process.env.fileBaseUrl+response.data//URL.createObjectURL(uploadFile.raw!)
  formData.value[field!] = imageUrl.value
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

// defineExpose({
//   submitForm
// })
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

:deep(.avatar-uploader){
  .avatar {
    width: 118px;
    height: 118px;
    display: block;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  } 
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 118px;
    height: 118px;
    text-align: center;
  }
}
</style>
