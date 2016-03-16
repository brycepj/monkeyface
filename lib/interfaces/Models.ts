export interface iInterface {
  name: string;
  declarations: iDeclaration[];
}

export interface iDeclaration {
  name: string;
  required: boolean;
  type: string;
  method: boolean;
}