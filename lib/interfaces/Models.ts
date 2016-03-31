export interface iInterface {
  name: any;
  declarations: iDeclaration[];
  validate: () => boolean;
  key?: any;
}

export interface iDeclaration {
  key: string;
  required: boolean;
  type: string;
  method: boolean;
  validate: (any) => boolean;
}