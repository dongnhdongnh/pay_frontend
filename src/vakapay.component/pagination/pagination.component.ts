import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() service: any = { pages: [] };

  changePage(page) {
    if (page === this.service.page && this.service.isLoading) return;
    this.service.offset = (page - 1) * this.service.limit;
    this.service.refresh();
  }

}