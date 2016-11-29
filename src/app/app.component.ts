import { Component, OnInit } from '@angular/core';
import { Row } from './row';
import { RowService } from './row.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RowService]
})
export class AppComponent implements OnInit {

  title = 'app works!';
  rows: Row[];
  selectedRow: Row;

  constructor(private rowService: RowService){}

  getRows(): void{
    this.rowService.getRows().then(rows => this.rows = rows);
  }

  ngOnInit(): void {
    this.getRows();
  }

  onSelect(row: Row): void {
    this.selectedRow = row;
  }

  fnErrorLength = function () {
   alert('This is a custom error!');
 };

}
