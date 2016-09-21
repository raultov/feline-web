
import { NgModule } from '@angular/core';
import { JsonFieldsPipe } from '../pipes/json-iterator.pipe';

@NgModule({
    declarations: [
        JsonFieldsPipe
    ],
    exports: [
        JsonFieldsPipe
    ]
})
export class PipesModule {
}
