import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglefileComponent } from './singlefile/singlefile.component';


@NgModule({
  declarations: [SinglefileComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    SinglefileComponent
  ]
})
export class UploaderModule { }
