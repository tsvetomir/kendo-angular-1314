import { Component } from '@angular/core';
import { sampleProducts } from './products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public gridData: any[] = sampleProducts;
}

