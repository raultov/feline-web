import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'asJsonFields'})
export class JsonFieldsPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    if (value !== 'undefined') {
      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          keys.push({key: key, value: value[key]});
        }
      }
    }
    return keys;
  }
}
