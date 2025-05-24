import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheacktrainsComponent } from './cheacktrains/cheacktrains.component';
import { ReturnCheackTicketComponent } from './return-cheack-ticket/return-cheack-ticket.component';
import { ErrorComponent } from './error/error.component';
import { TrainsComponent } from './trains/trains.component';
import { ContactusiferrorComponent } from './contactusiferror/contactusiferror.component';
import { BuyticketComponent } from './buyticket/buyticket.component';
import { TickettrainComponent } from './tickettrain/tickettrain.component';


const routes: Routes = [
  { path: "chekTrains", component: CheacktrainsComponent },
  { path: "", component: HomeComponent },
  { path: "returnticket", component: ReturnCheackTicketComponent },
  { path: "cheacktrains", component: CheacktrainsComponent },
  { path: "trains", component: TrainsComponent },
  { path: "iferrorcontactus", component: ContactusiferrorComponent },
  { path: "buyticket", component: BuyticketComponent },
  { path: "tickettrains", component: TickettrainComponent },
  {path: "checkTicket", component:ReturnCheackTicketComponent},


  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
