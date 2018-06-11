import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
  transform(text: string, trucarEm: number): string {
    if (text.length > trucarEm) {
      return text.substr(0, trucarEm) + '... ';
    }
    return text;
  }
}
