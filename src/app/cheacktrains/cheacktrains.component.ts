import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApirequestService } from '../serivce/apirequest.service';
import { error } from 'console';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cheacktrains',
  standalone: false,
  templateUrl: './cheacktrains.component.html',
  styleUrl: './cheacktrains.component.css'
})
export class CheacktrainsComponent {



  @ViewChild('popupContainer') popupContainer!: ElementRef;

  // ...existing code...

  ngAfterViewInit() {
    // If popup is already open on init
    if (this.isclickedadd && this.popupContainer) {
      this.popupContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Call this method when opening the popup
  openPopup() {
    this.isclickedadd = true;
    setTimeout(() => {
      if (this.popupContainer) {
        this.popupContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  }










  forCardsTickets: any;
  isIncluded: boolean = false;

  takenSeatIds: any
  userEmail!: string
  userPhone!: string

  selectedTrain: any
  selectedTrainID!: number

  isclickedwagons: boolean = false
  isclickedadd: boolean = false
  ischosed: boolean = false
  class!: string
  wagonpice!: number
  total: number = 0
  each: number = 0
  placetoseat: any
  agreed = false;

  selectedSeatIds: (string | null)[] = []; // Seat ID per ticket

  selectedSeatNumber: string | null = null;

  ticketPrices: number[] = [];


  isred: boolean = false
  isgreen: boolean = false

  vagons: any
  vagonsnumber: any

  // img/midWagon.png
  // img/firstWagon.png
  // img/lastWagon.png

  ngOnInit() {
    if (this.forCardsTickets && Array.isArray(this.forCardsTickets)) {
      this.selectedSeatNumbers = new Array(this.forCardsTickets.length).fill(null);
      this.seatnumbre = new Array(this.forCardsTickets.length).fill(null);
      this.selectedSeatIds = new Array(this.forCardsTickets.length).fill(null);
      this.names = new Array(this.forCardsTickets.length).fill('');
      this.surnames = new Array(this.forCardsTickets.length).fill('');
      this.privateNumbers = new Array(this.forCardsTickets.length).fill('');
    }



  }





  getWagonImage(name: string): string {






    if (name == "ბიზნესი") {
      return 'img/lastWagon.png'; // First wagon image
    } else if (name == "I კლასი") {
      return 'img/midWagon.png'; // Middle wagon image
    } else if (name == "II კლასი") {
      return 'img/firstWagon.png'; // Last wagon image
    }
    else {
      return 'none'
    }
  }
  // getWagonImage(name: string): string {
  //   if (name == "ბიზნესი") {
  //     return 'img/lastWagon.png'; // First wagon image
  //   } else if (name == "II კლასი") {
  //     return 'img/firstWagon.png'; // Last wagon image
  //   } else if (name == "I კლასი") {
  //     return 'img/midWagon.png'; // Middle wagon image
  //   } else {
  //     return 'none'
  //   }
  // }

  eachTicketData: any
  perosoneach: any



  seatalrcreated: any
  arryseatalrcreated: any

  isSeatTaken(seatId: string): boolean {


    return this.takenSeatIds && this.takenSeatIds.includes(seatId);
  }

  constructor(private service: ApirequestService, private router: Router, private cdr: ChangeDetectorRef) {

    this.forCardsTickets = this.service.forCardsTickets;
    this.takenSeatIds = []; // Initialize as empty array





    this.service.TicketGet().subscribe((data: any) => {
      const seatIds: string[] = [];
      data.forEach((ticket: any) => {
        if (Array.isArray(ticket.persons)) {
          ticket.persons.forEach((person: any) => {
            if (person.seat && person.seat.seatId) {
              seatIds.push(person.seat.seatId);
            }
          });
        }
      });
      this.takenSeatIds = seatIds;
      console.log('Taken seat IDs:', this.takenSeatIds);
    });

    this.selectedTrain = service.selectedTrain;

    if (!this.forCardsTickets || this.forCardsTickets.length === 0) {
      this.router.navigate(['/']);
    } else {
      console.log(this.forCardsTickets);
    }
  }


  vagon: any



  include() {
    const oneElement = document.getElementById('one') as HTMLInputElement;
    const includeElement = document.getElementById('include') as HTMLInputElement;

    if (this.isIncluded) {
      // Remove styles
      oneElement.style.backgroundColor = '';
      oneElement.style.color = '';
      includeElement.style.color = '';
      includeElement.innerHTML = 'პერსონალური ბარგი: არ შედის';
    } else {
      // Apply styles
      oneElement.style.backgroundColor = '#0058d2c2';
      oneElement.style.color = 'white';
      includeElement.style.color = 'white';
      includeElement.innerHTML = 'პერსონალური ბარგი: შედის';
    }

    // Toggle the state
    this.isIncluded = !this.isIncluded;
  }
  includea() {
    const oneElement = document.getElementById('one1') as HTMLInputElement;
    const includeElement = document.getElementById('include1') as HTMLInputElement;

    if (this.isIncluded) {
      // Remove styles
      oneElement.style.backgroundColor = '';
      oneElement.style.color = '';
      includeElement.style.color = '';
      includeElement.innerHTML = 'ხელბარგის ჩანთა: არ შედის';
    } else {
      // Apply styles
      oneElement.style.backgroundColor = '#0058d2c2';
      oneElement.style.color = 'white';
      includeElement.style.color = 'white';
      includeElement.innerHTML = 'ხელბარგის ჩანთა:  შედის';
    }

    // Toggle the state
    this.isIncluded = !this.isIncluded;
  }
  includew() {
    const oneElement = document.getElementById('one3') as HTMLInputElement;
    const includeElement = document.getElementById('include2') as HTMLInputElement;

    if (this.isIncluded) {
      oneElement.style.backgroundColor = '';
      oneElement.style.color = '';
      includeElement.style.color = '';
      includeElement.innerHTML = 'ჩაბარებული ბარგი: არ შედის';
    } else {
      oneElement.style.backgroundColor = '#0058d2c2';
      oneElement.style.color = 'white';
      includeElement.style.color = 'white';
      includeElement.innerHTML = 'ჩაბარებული ბარგი:  შედის';
    }

    this.isIncluded = !this.isIncluded;
  }

  clickedindex!: number
  seatnumbre: any[] = []

  IIIII: any

  fetchVagons(trainId: number, index: any, a: any): void {

    this.openPopup()

    this.IIIII = index

    console.log('Index:', index);
    console.log('Vagon:', a);


    this.selectedTrainID = this.selectedTrain.id;
    this.clickedindex = index;
    this.selectedTrainID = trainId;



    // Track which button (index) is currently active
    this.currentTicketIndex = a;

    this.service.getVagonsByTrainId(trainId).subscribe(
      (data) => {
        // Remove duplicate seat numbers from each vagon
        if (Array.isArray(data)) {
          this.vagons = data.map((vagon: any) => {
            if (Array.isArray(vagon.seats)) {
              vagon.seats = Array.from(new Set(vagon.seats));
            }
            return vagon;
          });
        } else {
          this.vagons = data;
        }


        // Show seat number only for the currently selected button
        // You can use this.currentTicketIndex in your template to conditionally display seat numbers
      },
      (error) => {
        console.error('Error fetching vagons:', error);
      }
    );
  }



  vagonimg(vagon: any, name: string, index: number) {

    if (!Array.isArray(this.service.vagonvagon)) {
      this.service.vagonvagon = [];
    }
    this.service.vagonvagon.push(vagon[index]);

    console.log("All selected vagons:", this.service.vagonvagon);




    console.log("indexiani vagon", vagon[index]);
    console.log("indexiani saxeli", name[index]);
    console.log(" vagon", vagon)
    console.log(" saxeli", name);

    this.vagon = vagon[index]


    if (Array.isArray(vagon)) {
      this.vagonsnumber = vagon;
    } else {
      this.vagonsnumber = Object.values(vagon);
    }
    console.log('vagonsnumber:', this.vagonsnumber);
    this.ischosed = true
    this.isclickedwagons = true

    if (name == "ბიზნესი") {
      // vagon.forEach((el: any) => {
      //   this.vagonsnumber = el
      //   console.log(this.vagonsnumber);
      // });
      this.class = name
      this.vagonsnumber = Object.values(vagon)

      console.log(vagon);


    } else if (name == "I კლასი") {
      this.class = name
      this.vagonsnumber = Object.values(vagon)

      console.log(vagon);

    } else if (name == "II კლასი") {
      this.class = name
      this.vagonsnumber = Object.values(vagon)

      console.log(vagon);

    }

  }

  get seatColumns(): any[][] {
    if (!this.vagonsnumber || this.vagonsnumber.length === 0) return [[], []];
    const half = Math.ceil(this.vagonsnumber.length / 2);
    return [
      this.vagonsnumber.slice(0, half),
      this.vagonsnumber.slice(half)
    ];
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {

    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;

  }












  closeModal() {
    this.isclickedadd = false;
    this.isclickedwagons = false;
    this.ischosed = false
  }

  selectedSeatNumbers: (string | null)[] = [];
  currentTicketIndex: any | null = null;


  fillwagon!: string
  sumtotal!: number




  tikets(index: number, price: number, wagonseatnumber: number, seatId: string) {
    // Prevent action if seat is already taken
    if (this.isSeatTaken(seatId)) {
      console.log('Seat is already taken!');
      return;
    }



    // Prevent selecting the same seat ID for different tickets
    if (this.selectedSeatIds.some((id, i) => id === seatId && i !== index)) {
      console.log("Can't select: Seat already taken by another ticket.");
      return;
    }

    // If same ticket re-clicks the same seat, just ignore
    if (this.selectedSeatIds[index] === seatId) {
      console.log("Already selected.");
      return;
    }

    // Assign new seat
    this.seatnumbre[index] = wagonseatnumber;
    this.selectedSeatIds[index] = seatId;
    this.ticketPrices[index] = price;
    this.service.tiketnumber = this.selectedSeatIds[index]


    this.total = this.ticketPrices.reduce((sum, p) => sum + (p || 0), 0);
    this.sumtotal = this.total;

    console.log('Selected seat IDs:', this.selectedSeatIds);
    console.log('Selected seat numbers:', this.seatnumbre);
    console.log("this is ticketPrices", this.ticketPrices);

    this.service.SeatId = this.selectedSeatIds

    console.log('Selected seat IDs:', this.service.SeatId);

  }














  register: any[] = [
    {
      "trainId": 0,
      "date": "2025-05-17T10:05:14.270Z",
      "email": "string",
      "phoneNumber": "string",
      "people": [
        {
          "seatId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "surname": "string",
          "idNumber": "string",
          "status": "string",
          "payoutCompleted": true
        }
      ]
    }
  ]









  names: string[] = [];
  surnames: string[] = [];
  privateNumbers: string[] = [];





  // submitTickets() {


  //   console.log("this is persons names", this.names);
  //   console.log("this is persons surnames", this.surnames);
  //   console.log("this is persons privateNumbers", this.privateNumbers);
  //   console.log("this is persons seats", this.seatnumbre);




  //   for (let i = 0; i < this.forCardsTickets.length; i++) {
  //     if (!this.names[i] || !this.surnames[i] || !this.privateNumbers[i]) {
  //       alert(`Please fill all fields for passenger ${i + 1}`);


  //       this.service.PostTickets(this.register).subscribe(
  //         response => {
  //           console.log('Ticket registered!', response);
  //         },
  //         error => {
  //           console.error('Error registering ticket:', error);
  //         }
  //       );
  //       return;
  //     }
  //   }



  //   alert("All done!");
  // }






  i!: number

  ProcessToByTickets() {



    const payload = {

      phoneNumber: this.userPhone,
      email: this.userEmail,
      GoingDate: this.service.GoingDate,
      datatikets: this.service.tiketdata,
      trainId: this.selectedTrainID,
      date: new Date().toISOString(),
      vagons: this.vagon,
      people: this.forCardsTickets.map((_: any, i: any) => ({
        seatId: this.selectedSeatIds[i],
        name: this.names[i],
        surname: this.surnames[i],
        idNumber: this.privateNumbers[i],
        status: "active",
        payoutCompleted: true,

      }))

    };

    console.log(this.userEmail);
    console.log(this.userPhone);
    this.service.nametrains = this.names
    this.service.surname = this.surnames
    this.service.nametrains = this.names


    this.service.emailtrains = this.userEmail
    this.service.phonetrains = this.userPhone



    const data = payload.date
    const date = new Date(data)

    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`


    this.service.TicektsToGo = payload

    this.service.tiketdata = formattedDate

    console.log('this is selected sit ids from site', this.selectedSeatIds);



    if (!this.userEmail && !this.userPhone) {

      (document.querySelector('.redAlert2') as HTMLElement).style.top = "2%"

      setTimeout(() => {
        (document.querySelector('.redAlert2') as HTMLElement).style.top = "-100%"
      }, 4000);

      return;

    }



    for (let i = 0; i < this.forCardsTickets.length; i++) {
      if (!this.names[i] || !this.surnames[i] || !this.privateNumbers[i] || !this.seatnumbre[i] || !this.userEmail[i] || !this.userPhone[i]) {
        (document.querySelector('.redAlert') as HTMLElement).style.top = "2%"

        setTimeout(() => {
          (document.querySelector('.redAlert') as HTMLElement).style.top = "-100%"
        }, 4000);

        this.i = i + 1

        return




      }


    }





    const paymentInfo = this.forCardsTickets.map((_: any, i: number) => ({
      sit: this.seatnumbre[i],
      price: this.ticketPrices[i],
      name: this.names[i],
      surname: this.surnames[i],
      idnumber: this.privateNumbers[i]
    }));

    this.service.PayPeopelCheack = paymentInfo

    this.service.sit = this.seatnumbre
    this.service.price = this.ticketPrices

    this.service.PayMentInformation = paymentInfo

    console.log(paymentInfo);


    setTimeout(() => {
      this.router.navigate(["/buyticket"]);
    }, 2500);

  }



  ////////////////////////////////////////////////////////////// this code must work in another place


  deleteallltiket() {
    this.service.cancelAllTickets().subscribe(
      response => {
        console.log('All tickets cancelled!', response);
        alert('All tickets cancelled!');
      },
      error => {
        console.error('Error cancelling tickets:', error);
        alert('Error cancelling tickets.');
      }
    );
  }

}



/////////////////////////////////////////////////////////////////








































// tikets(index: number, price: number, wagonseatnumber: number, checkSit: string,) {





//   // If seat is already selected by this ticket (green)
//   if (this.seatnumbre[index] === wagonseatnumber) {
//     this.takenSeatIds = checkSit
//     this.seatnumbre[index] = wagonseatnumber
//     console.log("bought");
//     this.seatnumbre[index] = wagonseatnumber;
//     this.ticketPrices[index] = price;
//     this.total = this.ticketPrices.reduce((sum, p) => sum + (p || 0), 0);
//     this.sumtotal = this.total;
//     this.selectedSeatNumbers[index] = checkSit;


//     this.ticketPrices[index] = price;
//     this.total = this.ticketPrices.reduce((sum, p) => sum + (p || 0), 0);
//     console.log("this is big price", this.total);

//     this.sumtotal = this.total


//     console.log("this is sit number", this.seatnumbre);

//     this.selectedSeatNumber = wagonseatnumber;

//     this.wagonpice = price


//     this.placetoseat = wagonseatnumber


//     this.selectedSeatNumbers[this.IIIII] = checkSit;
//     this.seatnumbre[this.IIIII] = wagonseatnumber;

//     // Optionally, update other properties if needed for the selected ticket
//     this.selectedSeatNumber = wagonseatnumber;
//     this.wagonpice = price;
//     this.total = this.each + this.wagonpice;
//     this.placetoseat = wagonseatnumber;
//     this.selectedSeatNumbers[index] = checkSit;

//     console.log('Selected seats:', this.selectedSeatNumbers);
//     console.log('Seat numbers:', this.seatnumbre);
//   } else if (this.seatnumbre.some((num, i) => num === wagonseatnumber && i !== index)) {
//     console.log("can't buy");

//     return;
//   }




// }






