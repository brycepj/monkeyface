export interface iInterface {
  name: any;
  declarations: iDeclaration[];
  validate: () => boolean;
}

export interface iDeclaration {
  name: string;
  required: boolean;
  type: string;
  method: boolean;
  validate: (any) => boolean;
}