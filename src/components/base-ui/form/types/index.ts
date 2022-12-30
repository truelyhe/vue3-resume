// ddaterange' | 'date' 日期选择器;
type IFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'cascader'
  | 'daterange'
  | 'date';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string | number;
  options?: any[];
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemLayout?: any;
}
