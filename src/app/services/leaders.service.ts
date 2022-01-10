import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  constructor() { }

  getleaders():Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getleader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((dish) => dish.featured)[0]);
  }
}
