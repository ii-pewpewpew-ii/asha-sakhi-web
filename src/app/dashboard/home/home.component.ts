import { Component } from '@angular/core';
import { OpenLayersMapComponent } from '../../open-layers-map/open-layers-map.component';

@Component({
  selector: 'app-home',
  imports: [OpenLayersMapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
