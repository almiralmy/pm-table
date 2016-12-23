import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let rows = [
      {id: 1, wbscode:'A1' , description: 'Row A1', pv:2, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 2, wbscode:'A2' , description: 'Row A1', pv:2, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 3, wbscode:'A3' , description: 'Row A3', pv:1, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 4, wbscode:'B1' , description: 'Row B1', pv:5, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 5, wbscode:'B2' , description: 'Row B2', pv:2, enabled:false, progress:0, ev:0, ac:0, cv:0},
      {id: 6, wbscode:'B3' , description: 'Row B3', pv:3, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 7, wbscode:'C1' , description: 'Row C1', pv:4, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 8, wbscode:'D1' , description: 'Row D1', pv:6, enabled:false, progress:0, ev:0, ac:0, cv:0},
      {id: 9, wbscode:'D2' , description: 'Row D2', pv:8, enabled:true, progress:0, ev:0, ac:0, cv:0},
      {id: 10, wbscode:'D3' , description: 'Row D3', pv:4, enabled:true, progress:0, ev:0, ac:0, cv:0}
    ];
    return {rows};
  }
}
