import { Injectable } from '@angular/core';

export interface SpinnerEventDetail {
  showspinner: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public showSpinner(){
    this.dispatchSpinnerEvent(true)
  }

  public hideSpinner() {
    this.dispatchSpinnerEvent(false);
  }

  dispatchSpinnerEvent(show: boolean) {
    console.log("Spinner event dispatched");
    const detail: SpinnerEventDetail = { showspinner: show};
    const event = new CustomEvent('LOADER_SPINNER_EVENT', {detail});
    window.dispatchEvent(event);
  }
}
