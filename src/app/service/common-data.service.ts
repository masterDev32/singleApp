import { Injectable } from '@angular/core';
import { HandleCallService } from './handle-call.service';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  config = environment;

  constructor(public service: HandleCallService) {}

  search(query: string, startIndex = 0, maxResults = 10): Observable<string[]> {
    return this.service.getData(`${this.config.endpoint}/?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`);
  }
}
