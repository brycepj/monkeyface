export interface iCreateInterfaceConfig {
  name:any;
  props: string[];
  options?:iCreateInterfaceOptions;
  key?:any;
}

export interface iCreateInterfaceOptionsPublic {
  strict?: boolean;
  noNulls?: boolean;
}

export interface iCreateInterfaceOptions extends iCreateInterfaceOptionsPublic {
  
}
