import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Row } from './row';
import { ROWS } from './mock-rows';

@Injectable()
export class RowService {

  private rowsUrl = '';
  private headers = new Headers({'Content-Type':'application/json'});

  constructor(
    private http: Http
  ){}

  getRows(): Promise<Row[]>{
    return Promise.resolve(ROWS);
  }

  create(wbscode: string): Promise<Row> {
    return this.http
      .post(this.rowsUrl, JSON.stringify({wbscode: wbscode}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
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
