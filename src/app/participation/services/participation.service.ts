import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private url = `http://localhost:8081/api/transaccionalData`;
  private urlAttendance = `http://localhost:8081/v1/attendance`;
  private urlActivities = `http://localhost:8081/ms-soa`;

  private token = sessionStorage.getItem('access_token')

  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.token}`
    })};


  constructor(private HttpClient: HttpClient) { }

  findbyIdActivity(idActivity: any){
    return this.HttpClient.get<any>(this.url+"/Actividad/"+idActivity , this.httpOptions);
  }

  create(attendance: any){
    return this.HttpClient.post(this.urlAttendance, attendance)
  }

  listActivities(){
    return this.HttpClient.get(`${this.urlActivities}/listData/active`)
  }
  
}
