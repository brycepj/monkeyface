export interface iInterface {
  name: any;
  declarations: iDeclaration[];
}

export interface iDeclaration {
  name: string;
  required: boolean;
  type: string;
  method: boolean;
}