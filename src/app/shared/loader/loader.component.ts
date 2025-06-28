import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner' 
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit, OnDestroy{
  public isLoading: boolean = false;
  private $destroy = new Subject<void>();

  ngOnInit() {
    fromEvent<CustomEvent<{ showspinner: boolean }>>(window, 'LOADER_SPINNER_EVENT')
    .pipe(takeUntil(this.$destroy))
    .subscribe({
      next: (event: object) => {
        const d = event as {detail: {showspinner: boolean}};
        this.isLoading = d.detail.showspinner;
      }, error: (err)=>{
        console.error(err);
      }
    })
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
