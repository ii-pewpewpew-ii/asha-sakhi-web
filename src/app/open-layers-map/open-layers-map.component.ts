import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { MatChipsModule } from '@angular/material/chips'
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';
import { CheckupService } from '../shared/checkup.service'; // 👈 adjust path if needed
import { SakhiApiResponse } from '../shared/shared';
import { MatCardModule } from '@angular/material/card';

interface Hospital {
  latitude: number;
  longitude: number;
  hospital_care_type: string;
  pregnancy_risk_level: string;
  hospital_name: string;
  telephone: string;
}

@Component({
  selector: 'app-openlayers-map',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule,],
  template: ` 
  <mat-card class="info-card">
    <div class="info-box">
    <h3 class="info-title">Hospital Summary</h3>

    <div class="chip-group">
      <mat-chip color="primary" selected>Hospitals: {{ hospitalCount }}</mat-chip>
      <mat-chip color="accent" selected>Clinics: {{ clinicCount }}</mat-chip>
      <mat-chip color="warn" selected>Colleges: {{ collegeCount }}</mat-chip>
      <mat-chip selected>Other: {{ otherCount }}</mat-chip>
    </div>
  </div>
  <div class="map-container-wrapper">
  <div #mapElement class="map-container"></div>
  <br>
  <div class="map-legend">
    <div><span class="legend-dot" style="background-color: red;"></span> Hospital</div>
    <div><span class="legend-dot" style="background-color: blue;"></span> Clinic</div>
    <div><span class="legend-dot" style="background-color: purple;"></span> College</div>
    <div><span class="legend-dot" style="background-color: gray;"></span> Other</div>
  </div>

  
</div>`,
  styles: [`
 .map-container-wrapper {
  position: relative;
}

.map-container {
  width: 100%;
  height: 900px;
  margin-top: 16px; /* spacing between chips and map */
}

.map-legend {
  position: absolute;
  top: 10px;
  right: 10px;
  background: black;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  color: white;
}

.legend-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

/* New styles for spacing */
.info-box {
  padding: 16px 24px 0;
}

.info-title {
  margin-bottom: 10px;
}

.info-subtitle {
  margin-top: 20px;
  margin-bottom: 10px;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 10px;
}
`]
})
export class OpenLayersMapComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  private checkupService = inject(CheckupService);

  map!: Map;
  hospitalCount = 0;
  clinicCount = 0;
  collegeCount = 0;
  otherCount = 0;
  riskLevels: { level: string, count: number }[] = [];

  ngOnInit() {
    this.checkupService.fetchHospitals().subscribe({
      next: (hospitals: SakhiApiResponse<Hospital[]>) => this.initMap(hospitals.data),
      error: (err) => console.error('Failed to load hospital data:', err)
    });
  }

  private initMap(hospitals: Hospital[]) {
    const layers = [
      new TileLayer({ source: new OSM() }),
      this.getPointsLayer(hospitals)
    ];

    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: layers,
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), // India
        zoom: 5
      }),
      controls: defaultControls()
    });
  }

  private getPointsLayer(hospitals: Hospital[]): VectorLayer {
    const features = hospitals
      .filter(h => h.latitude && h.longitude)
      .map(h => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([h.longitude, h.latitude]))
        });

        feature.setStyle(new Style({
          image: new CircleStyle({
            radius: 3,
            fill: new Fill({ color: this.getColor(h.hospital_care_type) }),
            stroke: new Stroke({ color: '#000', width: 1 })
          })
        }));

        return feature;
      });

    return new VectorLayer({
      source: new VectorSource({ features })
    });
  }

  private categorizeHospitals(hospitals: Hospital[]) {
    // Reset
    this.hospitalCount = 0;
    this.clinicCount = 0;
    this.collegeCount = 0;
    this.otherCount = 0;
    const riskMap: { [key: string]: number } = {};

    hospitals.forEach(h => {
      const care = h.hospital_care_type?.toLowerCase() || '';
      if (care.includes('hospital')) this.hospitalCount++;
      else if (care.includes('clinic')) this.clinicCount++;
      else if (care.includes('college')) this.collegeCount++;
      else this.otherCount++;

      const risk = h.pregnancy_risk_level?.toUpperCase() || 'UNKNOWN';
      riskMap[risk] = (riskMap[risk] || 0) + 1;
    });

    this.riskLevels = Object.entries(riskMap).map(([level, count]) => ({ level, count }));
  }

  private getColor(careType: string): string {
    careType = careType.toLowerCase()
    if (careType.includes('hospital')) {
      return "red";
    } else if (careType.includes('clinic')) {
      return "blue"
    } else if (careType.includes("college")) {
      return "purple"
    } else {
      return "gray"
    }
  }
}
