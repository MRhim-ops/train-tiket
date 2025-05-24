import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApirequestService } from '../serivce/apirequest.service';

@Component({
  selector: 'app-trains',
  standalone: false,
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.css'
})
export class TrainsComponent {
  
  AllTrains: any[] = [];
  

  constructor(private service: ApirequestService, private router: Router) {
    if (!this.service.trains || this.service.trains.length === 0) {
      this.router.navigate(['/']);
    } else {
      this.AllTrains = this.service.trains;
      console.log(this.AllTrains);
    }
  }

   selectTrain(train: any): void {
    this.service.selectedTrain = train

   
    
    
  }

 
}