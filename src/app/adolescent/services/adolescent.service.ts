import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdolescentService {

  private token = sessionStorage.getItem('access_token')

  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.token}`
    })};

  private url = `http://localhost:8081/api/transaccionalFuncionary`;
  private urltutor = 'http://localhost:8081/api/funcionaryData'
  private urlTeen = 'http://localhost:8081/api/teenData/bulk';
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<any>(this.url+"/listData",this.httpOptions);
  }

  findAlltutor() {
    return this.http.get<any>(this.urltutor+"/listData/active",this.httpOptions);
  }

  findbyIdTutor(idTutor: any){
    return this.http.get<any>(this.url+"/listIdTutor/"+idTutor);
  }

  UpdateAdolescent(teen: any){
    return this.http.put(`${this.urlTeen}`, teen, this.httpOptions)
  }
}
