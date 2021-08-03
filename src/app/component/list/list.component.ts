import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventListener } from 'ngx-bootstrap/utils/facade/browser';
import { CommonDataService } from 'src/app/service/common-data.service';

interface Books {
  items: any[],
  kind: string,
  totalItems: number
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  data: Books;
  dataPerPage = [];

  @Input() set books(content: Books) {
    this.data = content;
    this.dataPerPage = this.data.items.slice(this.data.items.length - 10, this.data.items.length);
  }; 
  @Output() next = new EventEmitter();
 
  constructor(public commonData: CommonDataService) { }

  pageChanged(event): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.next.emit({
      startIndex: startItem,
      maxResults: endItem
    });
  }

  getAuthors(authors: string[]): string {
    return authors.reduce((acc, current) => `${acc}, ${current}`)
  }
}
