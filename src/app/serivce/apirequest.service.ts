import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirequestService {

  forCardsTickets: any

  trains: any[] = []

  selectedTrain: any = null;

  PayMentInformation:any

  PayPeopelCheack:any[] = [];

  TicektsToGo:any

  totoal!:number

  tiketnumber!:string
  tiketdata!:string

  SeatId:any

  fromtiketdata!:string
  totiketdata!:string
  fromtiket!:string
  totiket!:string

  nametrains:string[] = []
  surname:string[] = []
  idnumber:string[] = []

  emailtrains!:string
  phonetrains!:string

  sit:string[] = []
  price:number[] = []

  GoingDate:any
  


  FoundedUser:any


  Tiketnumber:any


  vagonvagon:any




  constructor(private Http: HttpClient) { }

  _STATIONS_URL = "https://railway.stepprojects.ge/api/stations"

  _all_trains_URL = "https://railway.stepprojects.ge/api/trains"

  _ALLVAGONS_URL = "https://railway.stepprojects.ge/api/vagons"

  _REGISTERTICKET_URL = "https://railway.stepprojects.ge/api/tickets/register"

  _CANCELALLTICKETS_URL = "https://railway.stepprojects.ge/api/tickets/cancelAll"

  _TICKETSGET_URL = "https://railway.stepprojects.ge/api/tickets"

  _CHECKTICKETSTATUS_URL = "https://railway.stepprojects.ge/api/tickets/checkstatus"

  _CONFIRMTICKET_URL = "https://railway.stepprojects.ge/api/tickets/confirm"

  _Delete_Tiket_Id = "https://railway.stepprojects.ge/api/tickets/cancel"




  deltetiketid(id:any): Observable<any>{
    return this.Http.delete(`${this._Delete_Tiket_Id}/${id}`, { responseType: 'text' })
  }



  ConfirmTicket(tikectNumber:any): Observable <any> {
    return this.Http.get<any> (`${this._CONFIRMTICKET_URL}/${tikectNumber}`)
  }

  GetTicketById(id:any): Observable <any> {
   return this.Http.get<any>(`${this._CHECKTICKETSTATUS_URL}/${id}`)
  }

  TicketGet() {
    return this.Http.get(this._TICKETSGET_URL)
  }



  cancelAllTickets(): Observable<any> {
    return this.Http.delete(this._CANCELALLTICKETS_URL, {});
  }


  PostTickets(ticketData: any) {
    return this.Http.post(this._REGISTERTICKET_URL, ticketData, { responseType: 'text' });
  }

  getAllVagons(): Observable<any[]> {
    return this.Http.get<any[]>(this._ALLVAGONS_URL);
  }

  getVagonsByTrainId(trainId: number): Observable<any[]> {
    return this.getAllVagons().pipe(
      map((vagons) => vagons.filter((vagon) => vagon.trainId === trainId))
    );
  }

  getStations() {
    return this.Http.get(this._STATIONS_URL);
  }

  getAllTrains() {
    return this.Http.get(this._all_trains_URL);
  }





}
