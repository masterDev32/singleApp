import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleCallService {

  constructor() { }

  save(url, content) {
    if (url) {
      return from(fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content ? content : {})
        }).then(response => response.json())
      );
    }
  }

  getData(url): Observable<[]> {
    if (url) {
      return from(fetch(url).then(response => response.json()));
    }
  }
}
