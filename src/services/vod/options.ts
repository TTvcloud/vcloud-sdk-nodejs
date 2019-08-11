export type Option = {
  isHttps: boolean
  format: string
  sigKey: string
  tpl: string
  w, h: number
  //TODO:
  // kv: url.Values
}

export interface OptionFun {
  (opt: Option): any
}
