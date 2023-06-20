import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duracion'
})
export class DuracionPipe implements PipeTransform {

    transform(value: number|undefined): string {
        if(value){
            const minutes: number = Math.floor(value / 60);
            return (value - minutes * 60).toString().padStart(2, '0');
        }
        return '';
     }

}