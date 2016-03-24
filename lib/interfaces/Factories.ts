import { iInterface, iDeclaration } from './Models';

export interface iRegistryFactory { // is not technically a factory
  map: Object;
  add: () => iInterface;
  register: () => void;
  check: () => Boolean;
}

export interface iDeclarationFactory {
  create: (configString: string) => iDeclaration;
  validate: (val: any, type: string) => Boolean;
}

export interface iInterfaceFactory {
  create: () => iInterface;
  validate: () => Boolean;
}

export interface iBridgeFactory { // is not technically a factory
  Registry: iRegistryFactory,
  Interface: iInterfaceFactory,
  Declaration: iDeclarationFactory
}
