import { Component, OnInit } from '@angular/core';

import { Row } from './row';
import { RowService } from './row.service';

@Component({
  //moduleId: module.id,
  selector: 'my-rows',
  templateUrl: 'rows.component.html',
  styleUrls: ['rows.component.css']
})
export class RowsComponent implements OnInit {
  rows: Row[];
  selectedRow: Row;

  constructor(private rowService: RowService){}

  getRows(): void {
    this.rowService
      .getRows()
      .then(rows => this.rows = rows);
  }

  ngOnInit(): void {
    this.getRows();
  }

}
