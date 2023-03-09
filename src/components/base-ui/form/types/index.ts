
import type { CSSProperties } from 'vue'
// ddaterange' | 'date' 日期选择器;
type IFormType =
  | 'input'
  | 'select'
  | 'cascader'
  | 'radio'
  | 'radio-group'
  | 'option'
  | 'upload'
  | 'date-picker'
  | 'editor';

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
    class?: string,
  },
  uploadAttrs?: {
    action: string,
    header?: string,
    multiple?: boolean,
    accept?:string,
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    limit?:number,
    'show-file-list'?: boolean,
  }
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  itemLayout?: any;
}
