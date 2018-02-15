import { Component } from '@angular/core';
import { sampleProducts } from './products';

@Component({
  moduleId: module.id,
  selector: 'sd-kendo',
  templateUrl: 'kendo.component.html'
})
export class KendoComponent {
  public gridData: any[] = sampleProducts;
}
