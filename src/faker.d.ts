export interface IFakerOption {
  name: string
  methodName: string
}

export interface IFakerOptionGroup {
  name: string
  children: Array<IFakerOption>
}

export type IFakerOptions = Array<IFakerOptionGroup>

export interface IPluginMessage {
  type: string
  data?: object
}
