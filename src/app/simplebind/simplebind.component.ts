import {Component} from '@angular/core';

@Component({
    selector: 'as-simplebind',
    templateUrl: 'app/simplebind/simplebind.html'
})
export class SimplebindComponent {
    private myname: string;

    constructor() {
        this.myname = 'Simple';
    }
}
