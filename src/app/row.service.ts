import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Row } from './row';
import { Subject } from 'rxjs/Subject';
//import { ROWS } from './mock-rows';

@Injectable()
export class RowService {

  private rowsUrl = 'app/rows';
  private headers = new Headers({'Content-Type':'application/json'});

  // Observable sources
  private addNewRowSource = new Subject<Array<any>>()
  private addNewRowWbscodeSource = new Subject<string>();
  private addNewRowDescriptionSource = new Subject<string>();
  private addNewRowPvSource = new Subject<number>();
  private addNewRowProgressSource = new Subject<number>();

  //Observable streams
  newRowAdded$ = this.addNewRowSource.asObservable();
  /*
  wbscodeAdded$ = this.addNewRowWbscodeSource.asObservable();
  descriptionAdded$ = this.addNewRowDescriptionSource.asObservable();
  pvAdded$ = this.addNewRowPvSource.asObservable();
  progressAdded$ = this.addNewRowProgressSource.asObservable();
  */

  constructor(
    private http: Http
  ){}

  getRows(): Promise<Row[]>{
    console.log("Service Start Rows");
    return this.http.get('app/rows-mock.json')
      .toPromise()
      .then(res => res.json().data as Row[])
      .catch(this.handleError);
  }

  getProgress(): Promise<Row[]>{
    console.log("Service Start Progress");
    return this.http.get('app/progress-mock.json')
      .toPromise()
      .then(res => res.json().data as Row[])
      .catch(this.handleError);
  }

  getActualCosts(): Promise<Row[]>{
    console.log("Service Start Costs");
    return this.http.get('app/costs-mock.json')
      .toPromise()
      .then(res => res.json().data as Row[])
      .catch(this.handleError);
  }

  /*updateRow(row: Row): Promise<Row> {
    const url = `${this.rowsUrl}/${row.id}`;
    return this.http.post(url, JSON.stringify({row: row}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Row)
      .catch(this.handleError);

  }*/

  addNewRow(newRow:Array<any>):void {
    //console.log("RowService - addnewrowmethod" + wbscode + "-" + description);
    this.addNewRowSource.next(newRow);
    /*
    this.addNewRowWbscodeSource.next(wbscode);
    this.addNewRowDescriptionSource.next(description);
    this.addNewRowPvSource.next(pv);
    this.addNewRowProgressSource.next(progress);
    */
  }


  create(wbscode: string): Promise<Row> {
    return this.http
      .post(this.rowsUrl, JSON.stringify({wbscode: wbscode, enabled: true}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  disable(id: number): Promise<Row> {
    const url = `${this.rowsUrl}/${id}`;
    console.log(url);
    return this.http.put(url, JSON.stringify({id: id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  enable(id: number): Promise<Row> {
    const url = `${this.rowsUrl}/${id}`;
    console.log(url);
    return this.http.put(url, JSON.stringify({id: id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /*
  delete(id: number): Promise<void> {
    const url = `${this.rowsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  */

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); //for demo purposes only
    return Promise.reject(error.message || error);
  }
}
