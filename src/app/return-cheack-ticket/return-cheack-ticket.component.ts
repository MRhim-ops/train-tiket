import { Component, OnInit } from '@angular/core';
import { ApirequestService } from '../serivce/apirequest.service';
import { jsPDF } from 'jspdf'
import { Router } from '@angular/router';


@Component({
  selector: 'app-return-cheack-ticket',
  standalone: false,
  templateUrl: './return-cheack-ticket.component.html',
  styleUrl: './return-cheack-ticket.component.css'
})
export class ReturnCheackTicketComponent{

  ticketNumber: string = '';
  foundTicket: any; // <-- add this

  isFound = false
  issuccess = false
  isred = false

  constructor(private service: ApirequestService, private router: Router) { }


  ticketNotFound = false;




  searchTicket() {
    this.foundTicket = null;
    this.ticketNotFound = false;
    this.isFound = false;
    const redAlert = (document.querySelector('.redAlert') as HTMLElement)

    this.service.GetTicketById(this.ticketNumber).subscribe(
      (data: any) => {
        if (data) {
          this.foundTicket = data;
          this.isFound = true;
          this.ticketNotFound = false;

        } else {
          this.foundTicket = null;
          this.isFound = false;
          this.ticketNotFound = true;



        }
      },
      (error) => {
        this.foundTicket = null;
        this.isFound = false;
        this.ticketNotFound = true;
        redAlert.style.top = "2%"

        setTimeout(() => {
          redAlert.style.top = "-120%"
        }, 2000);
      }
    );
  }

  get totalPrice(): number {
    if (!this.foundTicket?.persons) return 0;
    return this.foundTicket.persons.reduce((sum: number, person: any) => {
      return sum + (person.seat?.price || 0);
    }, 0);
  }

  DeleteCard(id: any) {
    this.service.deltetiketid(id).subscribe({
      next: (response) => {
        console.log('Deleted successfully', response);
        this.issuccess = true;

        (document.querySelector(".greenAlert") as HTMLElement).style.top = "2%";

        setTimeout(() => {
          (document.querySelector(".greenAlert") as HTMLElement).style.top = "-200%";
          this.router.navigate(["/"]);
        }, 3500);
      },
      error: (err) => {
        console.error('Error deleting ticket:', err);
      }
    });
  }

  generatePDF() {
    const doc = new jsPDF();
    doc.setFont('NotoSansGeorgian-VariableFont_wdth,wght', 'normal');

    // Header
    doc.setFontSize(18);
    doc.text('Trains Railway', 10, 15);

    // Ticket info
    doc.setFontSize(12);
    doc.text(`ბილეთის ნომერი: ${this.foundTicket.id || ''}`, 10, 30);
    doc.text(`შეძენის თარიღი: ${this.foundTicket.date || ''}`, 10, 38);

    // Trip info
    doc.text(`გამგზავრება: ${this.foundTicket.train.from || ''} ${this.foundTicket.train.departure || ''}`, 10, 48);
    doc.text(`ჩასვლა: ${this.foundTicket.train.to || ''} ${this.foundTicket.train.arrive || ''}`, 10, 56);

    // Contact info
    doc.text(`იმეილი: ${this.foundTicket.email || ''}`, 10, 66);
    doc.text(`ტელეფონი ნომერი: ${this.foundTicket.phone || ''}`, 10, 74);

    // Table header
    let y = 84;
    doc.setFontSize(13);
    doc.text('--- მგზავრები ---', 10, y);

    y += 8;
    doc.setFontSize(11);
    doc.text('სახელი', 10, y);
    doc.text('გვარი', 40, y);
    doc.text('პირადი ნომერი', 70, y);
    doc.text('ადგილი', 110, y);
    doc.text('ვაგონი N', 140, y);
    doc.text('ფასი', 170, y);

    // Table rows
    y += 7;
    this.foundTicket.persons.forEach((person: any) => {
      doc.text(`${person.name || ''}`, 10, y);
      doc.text(`${person.surname || ''}`, 40, y);
      doc.text(`${person.idNumber || ''}`, 70, y);
      doc.text(`${person.seat?.number || ''}`, 110, y);
      doc.text(`${person.seat?.vagonId || ''}`, 140, y);
      doc.text(`${person.seat?.price || ''}₾`, 170, y);
      y += 7;
    });

    // Payment info
    y += 5;
    doc.setFontSize(12);
    doc.text('Payment info:', 10, y);
    y += 7;
    doc.text('Credit Card - ************', 10, y);

    y += 10;
    doc.setFontSize(14);
    doc.text(`სულ გადახდილია: ${this.totalPrice}₾`, 10, y);

    // Warning
    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(229, 57, 53);
    doc.text('ბილეთის დაბრუნება შესაძლებელია მხოლოდ იმ შემთხვევაში თუ გამგზავრებამდე დარჩენილია მინიმუმ 1 საათი.', 10, y);
    y += 6;
    doc.text('გადახდის დაბრუნება ან ბილეთის შეცვლა შესაძლებელია მხოლოდ სალაროში წარდგენით.', 10, y);

    doc.save('ticket.pdf');
  }
}
