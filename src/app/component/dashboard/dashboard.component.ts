import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { CommonDataService } from 'src/app/service/common-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  searchObs$ = new Subject<string>();
  destroy = new Subject();
  data: string[];
  query: string;
  isLoading = false;
  error = false;

  constructor(public service: CommonDataService) { }

  ngOnInit(): void {
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  initSearch(): void {
    this.searchObs$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.search(query)),
    ).subscribe()
  }

  private search(query: string, startIndex = 0, maxResults = 10): Observable<string[]> {
    if(query.length > 3) {
      this.isLoading = true;
      this.error = false;
      this.query = query;
      this.service.search(this.query, startIndex, maxResults).pipe(
        takeUntil(this.destroy),
        catchError(() => {
          this.error = true;
          this.isLoading = false;
          return of(null)
      }))
      .subscribe((response) => {
        response.error ? this.error = true : this.data = response;
        this.isLoading = false;
      });
    }
    return of(null)
  }

  nextPage(event): void {
    const { startIndex, maxResults } = event;
    this.search(this.query, startIndex, maxResults);
  }
}
