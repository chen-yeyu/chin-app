import React, { Component, PropTypes } from 'react';
import Ajv from 'ajv';
import Test from './test';

export default class JsonTest extends Component {

  clickLogin(){
    var schema = {
      "type": "object",
      "title": "Sign up form",
      "properties": {
        "detail": {
          "type": "number",
          "title": "問い合わせ内容",
          "maxLength": 1000,
          "errors": {
            "required": "必須項目です.",
            "maxLength": "Message is too long. Maximum length is 1000."
          }
        }
      }
      };

    var validData = {
      detail: "hello world"
    };
    var ajv = new Ajv();
    ajv.addSchema(schema, 'mySchema');
    var valid = ajv.validate('mySchema', validData);
    if (!valid) console.log(ajv.errorsText());
    Test["myname"]("cyy");
  }

  render(){
    return(<button onClick={this.clickLogin} style={{width: 300, height:100}}>JsonTest</button>);
  }

}
