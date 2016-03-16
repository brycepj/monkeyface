import {iDeclaration} from '../interfaces/Models';

export class Declaration implements iDeclaration {
  public name: string;
  public required: boolean;
  public type: string;
  public method: boolean;
  
  constructor(configString:string) {
    this.name = null;
    this.required = null;
    this.type = null;
    this.method = null;
    // this._parseCfg(configString);
  }
  
  _parseCfg(configString){
    var isMethod = configString.includes('()');
    var isRequired = !configString.includes('?');
    var type = configString.includes(':') ? configString.split(':')[1] : null;

    this.required = isRequired;
    this.method = isMethod; 
    this.type = type;
    this.name = this._parseName(configString);
  };

  _parseName(configString){
    configString = this.type ? configString.split(':')[0] : configString;
    configString = !this.required ? configString.substr(1) : configString;
    configString = this.method ? configString.slice(0, -2) : configString;
    return configString;
  };

  validate(val, key){
     
		var isRequired = this.required;
		var isMethod = this.method;
		var type = this.type;

		if (isRequired && !val) {return false} 
		else if (isMethod && !check.isFunction(val)) {return false} 
		else if (type && check.discernType(val) !== type) {return false}
		
		return true; 
  };
}



  