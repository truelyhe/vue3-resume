<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          <el-col v-bind="props.colLayout">
            <el-form-item :label="item.label">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type == 'password'"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'cascader'">
                <el-cascader
                  v-model="formData[`${item.field}`]"
                  :options="item.options"
                  :show-all-levels="false"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'date'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  type="date"
                  range-separator="至"
                  :placeholder="item.placeholder"
                  end-placeholder="End date"
                />
              </template>
              <template v-else-if="item.type === 'daterange'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  :placeholder="item.placeholder"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFormItem } from '../types';
import { defineProps, defineEmits, ref, watch } from 'vue';
const emits = defineEmits(['update:modelValue']);
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
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 12,
      md: 6,
      xs: 24
    })
  }
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
</script>

<style scoped lang="scss">
.el-select,
::v-deep.el-cascader {
  width: 100%;
}
.el-row{
  padding:20px 15px 0 0;
}
.header {
  text-align: center;
}
</style>
