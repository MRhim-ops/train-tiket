import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApirequestService } from '../serivce/apirequest.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-buyticket',
  standalone: false,
  templateUrl: './buyticket.component.html',
  styleUrl: './buyticket.component.css'
})
export class BuyticketComponent {
  paymentMethod: string = 'card';

  TiketsTogoOnApi: any

  BySitId: any

  tiketid: any[] = []

  email!: string
  sumtotal: any

  PayMentInformation: any

  tiketNumberLocal: any

  PaypalEmail: any

  constructor(private service: ApirequestService, private router: Router, private Location: Location) {
    this.PayMentInformation = this.service.PayMentInformation

    this.email = this.service.emailtrains
    this.BySitId = this.service.SeatId


    console.log("this is selected sit Ids: 2", this.BySitId);
    console.log("this is selected sit Ids: 2", this.service.SeatId);










    console.log("this is email 1", this.email);
    console.log("this is email 2", this.service.emailtrains);






    this.TiketsTogoOnApi = this.service.TicektsToGo


    this.sumtotal = this.PayMentInformation
      ? this.PayMentInformation.reduce((sum: number, ticket: any) => sum + (Number(ticket.price) || 0), 0)
      : 0;


    if (!this.PayMentInformation || !this.PayMentInformation.length) {
      this.router.navigate(['/']);



    }

    this.service.totoal = this.sumtotal
  }

  expDate: string = '';





  formatExpDate(event: any): void {
    let input = event.target.value;

    let val = input.replace(/\D/g, '');


    if (val.length > 4) {
      val = val.slice(0, 4);
    }

    if (val.length >= 2) {
      const month = parseInt(val.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        val = '';
      }
    }


    if (val.length > 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }

    this.expDate = val;
    event.target.value = val;
  }



  cvv: string = ""
  Name: string = ""

  cardNum: string = '';

  CardNumber(event: any): void {
    let input = event.target.value;


    let val = input.replace(/\D/g, '');

    // Limit to 16 digits
    if (val.length > 16) {
      val = val.slice(0, 16);
    }


    val = val.match(/.{1,4}/g)?.join(' ') ?? '';

    this.cardNum = val;
    event.target.value = val;
  }

  ischeaked: boolean = false
  founUser: any

  ticketNumber: any

  pay() {




    const cardNumDigits = this.cardNum.replace(/\s/g, '');

    const redAlert = (document.querySelector('.redAlert') as HTMLElement)
    const greenAlert = (document.querySelector('.greenAlert') as HTMLElement)

    console.log('cardNum:', cardNumDigits, 'expDate:', this.expDate, 'cvv:', this.cvv, 'name:', this.Name);

    if (
  (
    this.paymentMethod === 'card' &&
    cardNumDigits.length === 16 &&
    this.expDate.length === 5 &&
    (this.cvv.length === 3 || this.cvv.length === 4) &&
    this.Name.trim().length > 1
  ) 
  ||
  (
    this.paymentMethod === 'paypal' &&
    typeof this.PaypalEmail === 'string' &&
    this.PaypalEmail &&
    (this.PaypalEmail.includes("@mail.ru") || this.PaypalEmail.includes("@gmail.com"))
  )
)
     {


      // Send the POST request ONCE
      this.service.PostTickets(this.TiketsTogoOnApi).subscribe(
        response => {
          console.log('Ticket registered!!', response);

          this.service.Tiketnumber = response

          this.tiketNumberLocal = response


          const ticketId = this.tiketNumberLocal.split(':')[1]?.trim();


          this.service.ConfirmTicket(ticketId).subscribe((data: any) => {
            console.log(data);
          });
        },




        error => {
          console.error('Error registering ticket:', error);
          alert("Error registering ticket.");
        }
      );



      greenAlert.style.top = "2%"

      setTimeout(() => {
        greenAlert.style.top = "-100%"
        this.router.navigate(['/tickettrains'])
      }, 2300);



      this.service.TicketGet().subscribe((data: any) => {
        const ticketIds = data.map((ticket: any) => ticket.id);
        console.log('Ticket IDs:', ticketIds);


      });





    } else {

      redAlert.style.top = "2%"

      setTimeout(() => {
        redAlert.style.top = "-100%"

      }, 2300);







    }




  }




}
