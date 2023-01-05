
import type { CSSProperties } from 'vue'
// ddaterange' | 'date' 日期选择器;
type IFormType =
  | 'input'
  | 'select'
  | 'cascader'
  | 'radio'
  | 'radio-group'
  | 'option'
  | 'date-picker';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  options?: any[];
  attrs?: {
    // css样式
    style?: CSSProperties,
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
    type?: string,
  },
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  itemLayout?: any;
}
