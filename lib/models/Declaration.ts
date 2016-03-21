import {iDeclaration} from '../interfaces/Models';
import check = require('../services/typeChecker');

export class Declaration implements iDeclaration {
  public name: string;
  public required: boolean;
  public type: string;
  public method: boolean;
  
  constructor(configString:string) {
    // the constructor is passed the string passed by the user (e.g. 'hello:string')
    // or the inferred string generated during Interface construction
    this.name = null;
    this.required = null;
    this.type = null;
    this.method = null;
    this.parseDeclarationString(configString);
  }
  
  private parseDeclarationString(configString){
    // does this yet support interfaces?
    var isMethod = configString.includes('()');
    var isRequired = !configString.includes('?');
    var type = configString.includes(':') ? configString.split(':')[1] : null;

    this.required = isRequired;
    this.method = isMethod; 
    this.type = type;
    this.name = this.parsePropertyKey(configString);
  };

  private parsePropertyKey(configString){
    configString = this.type ? configString.split(':')[0] : configString;
    configString = !this.required ? configString.substr(1) : configString;
    configString = this.method ? configString.slice(0, -2) : configString;
    return configString;
  };

  public validate(val){
		var isRequired = this.required;
		var isMethod = this.method;
		var type = this.type;

    // this is where all conditions must be considered
		if (isRequired && !val) {return false} 
		else if (isMethod && !check.isFunction(val)) {return false} 
		else if (type && check.discernType(val) !== type) {return false}
		
		return true; 
  };
}



  