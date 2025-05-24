import { Component } from '@angular/core';
import { jsPDF } from 'jspdf'
import { ApirequestService } from '../serivce/apirequest.service';
import '../../assets/fonts/NotoSansGeorgian-VariableFont_wdth,wght-normal.js';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickettrain',
  standalone: false,
  templateUrl: './tickettrain.component.html',
  styleUrl: './tickettrain.component.css'
})
export class TickettrainComponent {

  tiketnumber!: string
  tiketdata!: string
  totiket!: string
  totiketdata!: string
  fromtiket!: string
  fromtiketdata!: string
  emailtiket!: string
  phonetiket!: string
  datatikets!: string
  nametrains: string[] = []
  surname: string[] = []
  idnumber: string[] = []
  sit!: string
  nullalways: number = 0
  totoal!: number
  totoaltotal!: number
  peopleList: any[] = [];

  GoingDate: any

  foundedUser: any

  BySitId: any


  tiketnumberfind: any

  vagonvagon: any




  constructor(private service: ApirequestService, private router: Router) {
    console.log("this is vagon numbers", this.service.vagonvagon);
    this.vagonvagon = this.service.vagonvagon

    this.tiketnumberfind = this.service.Tiketnumber.split(':')[1]?.trim();

    this.BySitId = this.service.SeatId
    // this.tiketname = this.service.TicektsToGo.people.name
    // this.tiketsurname = this.service.TicektsToGo.people.surname
    // this.idnumber = this.service.TicektsToGo.people.idNumber

    // console.log(this.service.TicektsToGo.people.name);
    // console.log(this.service.TicektsToGo.people.surname);
    // console.log(this.service.TicektsToGo.people.idNumber);
    this.foundedUser = this.service.FoundedUser

    if (!this.service.GoingDate) {
      this.router.navigate(['/']);
      return;
    }

    this.GoingDate = this.service.GoingDate

    console.log("this is new day", this.service.GoingDate);


    this.nametrains = this.service.nametrains
    this.surname = this.service.surname
    this.idnumber = this.service.idnumber

    this.emailtiket = this.service.emailtrains
    this.phonetiket = this.service.phonetrains
    this.tiketnumber = this.service.tiketnumber
    this.totiketdata = this.service.totiketdata
    this.fromtiketdata = this.service.fromtiketdata
    this.datatikets = this.service.tiketdata

    this.peopleList = this.service.PayPeopelCheack;
    console.log(this.service.sit[0]);
    console.log(this.service.price[0]);
    this.sit = this.service.sit[0]

    this.totoal = this.service.totoal

    this.fromtiket = this.service.fromtiket
    this.totiket = this.service.totiket







    this.service.TicketGet().subscribe((data: any) => {
      data.filter((ticket: any) => {
        ticket.persons.some((person: any) => {
          if (this.BySitId.includes(person.seat.seatid)) {
            console.log("exist");

          } else {
            console.log("!exist");

          }
        })
      })
    })

  }












 generatePDF() {
  const doc = new jsPDF();
  doc.setFont('NotoSansGeorgian-VariableFont_wdth,wght', 'normal');

  doc.setFontSize(18);
  doc.text('Trains Railway', 105, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`ბილეთის ნომერი: ${this.tiketnumberfind || ''}`, 10, 30);
  doc.text(`შეძენის თარიღი: ${this.datatikets || ''}`, 10, 36);
  doc.text(`გამგზავრების თარიღი: ${this.GoingDate || ''}`, 10, 42);

  doc.text(`გამგზავრება: ${this.fromtiket || ''} ${this.fromtiketdata || ''}`, 10, 50);
  doc.text(`ჩასვლა: ${this.totiket || ''} ${this.totiketdata || ''}`, 10, 56);

  doc.text(`იმეილი: ${this.emailtiket || ''}`, 10, 66);
  doc.text(`ტელეფონი ნომერი: ${this.phonetiket || ''}`, 10, 72);

  let y = 84;
  doc.setFontSize(13);
  doc.text('--- მგზავრები ---', 105, y, { align: 'center' });

  y += 8;
  doc.setFontSize(11);
  doc.text('სახელი', 20, y);
  doc.text('გვარი', 50, y);
  doc.text('პირადი ნომერი', 80, y);
  doc.text('ადგილი', 120, y);
  doc.text('ვაგონი N', 160, y);

  y += 6;
  this.peopleList.forEach((person, idx) => {
    doc.text(`${person.name || ''}`, 20, y);
    doc.text(`${person.surname || ''}`, 50, y);
    doc.text(`${person.idnumber || ''}`, 80, y);
    doc.text(`${person.sit || ''}`, 120, y);
    doc.text(`${this.vagonvagon?.[idx]?.vagonId || ''}`, 160, y);
    y += 6;
  });

  y += 10;
  doc.setFontSize(12);
  doc.text('გადახდის ინფორმაცია:', 10, y);
  y += 7;
  doc.text('ბარათი - ************', 10, y);

  y += 10;
  doc.setFontSize(14);
  doc.text(`სულ გადახდილია: ${this.totoal || 0}₾`, 10, y);

  y += 15;
  doc.setFontSize(10);
  doc.setTextColor(229, 57, 53);
  doc.text('ბილეთის დაბრუნება შესაძლებელია მხოლოდ იმ შემთხვევაში თუ გამგზავრებამდე დარჩენილია მინიმუმ 1 საათი.', 10, y, { maxWidth: 190 });
  y += 6;
  doc.text('გადახდის დაბრუნება ან ბილეთის შეცვლა შესაძლებელია მხოლოდ სალაროში წარდგენით.', 10, y, { maxWidth: 190 });

  doc.save('ticket.pdf');
}















}



