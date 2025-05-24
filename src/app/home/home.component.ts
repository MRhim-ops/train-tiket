import { Component } from '@angular/core';
import { ApirequestService } from '../serivce/apirequest.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {






  img: string = "https://aussiedlerbote.de/wp-content/uploads/2025/02/pryamoj-poezd-iz-germanii-v-london-plany-stanovyatsya-realnee.png"

  where: string = "საიდან"

  to: string = 'სად'



  PersonLength: string = "მგზავრების რაოდენობა"

  img1: string = "https://openheart.ge/wp-content/uploads/2019/03/Y5vcZbfYFXe_c471497817c3ab0ccf097914486ff0ab-1024x683.jpg"

  img2: string = "https://mbg.ge/uploads/locblogs/large/dd791631849916123edc5e7bf31ed4fe.jpg"

  img3: string = "https://cdn.georgiantravelguide.com/storage/thumbnails/dji-0407-2.jpg"


  activeIndex: number | null = null;

  FromWhere: string = ""
  ToWhere: string = ""
  people: string = ""






  AllTrains: any[] = []
  stations: any[] = []
  train: any
  peopleDivs: number[] = [];

  goingDate!: string

  today: string = new Date().toISOString().split('T')[0];
  minDate: Date = new Date();





  sent() {

    this.service.GoingDate = this.goingDate

    console.log("this is goin 2", this.service.GoingDate);
    console.log("this is goin 1", this.goingDate);


    const greenAlert = (document.querySelector('.greenAlert') as HTMLElement)
    const RedAlert = (document.querySelector('.redAlert') as HTMLElement)
    const redAlert2 = (document.querySelector('.redAlert2') as HTMLElement)
    const RedAlert3 = (document.querySelector('.redAlert3') as HTMLElement)

    console.log(this.FromWhere);
    console.log(this.ToWhere);

    this.service.fromtiket = this.FromWhere
    this.service.totiket = this.ToWhere


    if (this.FromWhere === this.ToWhere) {
      if (this.FromWhere == '' || this.ToWhere == '') {
        RedAlert3.style.top = "4%"



        setTimeout(() => {
          RedAlert3.style.top = "-200%"
        }, 4000);
        return;
      }


      RedAlert.style.top = "4%"

      setTimeout(() => {

        RedAlert.style.top = "-200%"
      }, 4000);
      return;
    }

    if (!this.goingDate) {
      RedAlert3.style.top = "4%";
      setTimeout(() => {
        RedAlert3.style.top = "-200%";
      }, 4000);
      return;

    }





    if (this.people === '') {
      RedAlert3.style.top = "4%";
      setTimeout(() => {
        RedAlert3.style.top = "-200%";
      }, 4000);
      return;
    }



    const filteredTrains = this.AllTrains.filter((train: any) => {

      return train.from === this.FromWhere && train.to === this.ToWhere;
    });

    this.service.trains = filteredTrains


    const sanitizedPeople = parseInt(this.people.replace(/\D/g, ''), 10); // Remove non-numeric characters
    this.people = sanitizedPeople.toString();

    if (sanitizedPeople > 0) {
      this.peopleDivs = Array(sanitizedPeople).fill(0).map((_, i) => i + 1); // Create an array [1, 2, ..., sanitizedPeople]
    } else {
      this.peopleDivs = []; // Clear the array if no valid number is selected
    }

    // Debugging: Check the array



    this.service.forCardsTickets = this.peopleDivs
    console.log(this.service.forCardsTickets);

    if (filteredTrains.length > 0) {
      console.log("Filtered Trains:", filteredTrains);
      greenAlert.style.top = "4%"

      setTimeout(() => {

        this.location.navigate(['/trains']);
        greenAlert.style.top = "-200%"
      }, 4000);



    } else {
      redAlert2.style.top = "4%"
      setTimeout(() => {

        redAlert2.style.top = "-200%"
      }, 4000);
    }
  }


  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }



  constructor(private service: ApirequestService, private rout: ActivatedRoute, private location: Router) {

    this.service.GoingDate = this.goingDate




    {
      this.service.getStations().subscribe((data: any) => {
        console.log(data);
        this.stations = data;
      })

      this.service.getAllTrains().subscribe((data: any) => {
        console.log(data);

        this.AllTrains = data;
        data.forEach((element: any) => {
          this.train = element;
          this.service.fromtiketdata = element.departure;
          this.service.totiketdata = element.arrive;


        })


      })
    }
  }



}
