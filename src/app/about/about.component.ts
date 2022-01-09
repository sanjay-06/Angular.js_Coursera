import { Component, OnInit } from '@angular/core';
import { LeadersService } from '../services/leaders.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders:Leader[];

  selectedLeader: Leader;

  constructor(private LeaderService:LeadersService) { }

  ngOnInit() {

    this.leaders =this.LeaderService.getDishes();
    
  }

  onSelect(Leader:Leader){
    this.selectedLeader=Leader;
  }
}
