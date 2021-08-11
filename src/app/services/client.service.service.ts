import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, tap } from 'rxjs/internal/operators';
import { Observable, throwError, of } from 'rxjs';
import { client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private REST_API_SERVER = "https://tennis-test-backend.herokuapp.com/clients/";


  constructor(private httpClient: HttpClient) { }


  public sendGetRequest(){
    let headersReq = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    });
  
    return this.httpClient.get(this.REST_API_SERVER, { headers: headersReq }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  public sendPostRequest(client: client){
    return this.httpClient.post(this.REST_API_SERVER, client).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  public sendPutRequest(client: client){
    return this.httpClient.put(this.REST_API_SERVER + client.id, client).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here
        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  public sendDeleteRequest(id: string){
    return this.httpClient.delete(this.REST_API_SERVER + id).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    )
  }



}
