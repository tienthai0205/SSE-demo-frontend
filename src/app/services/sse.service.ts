import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor(private _zone: NgZone) { }

  getServerSentEvent(url: string): Observable<any> {
    return new Observable((observer: any) => {
      const eventSource = this.getEventSource(url);
      eventSource.onopen = event => {
        console.log("Event on open ", event);
      }
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };

    });
  }
  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

}
