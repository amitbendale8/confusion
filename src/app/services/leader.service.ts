import { Injectable } from '@angular/core';
import { Leader }  from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';



import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor() { }


  public getLeaders(): Observable<Leader[]>{
    return Observable.of(LEADERS).delay(2000);
    
  }

  public getLeader(id: number): Observable<Leader>{
    return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]),2000)
    // })
    
  }

  public getFeaturedLeader(): Observable<Leader>{
    return Observable.of(LEADERS.filter((leader) => (leader.featured === true))[0]).delay(2000);
    
  }

}
