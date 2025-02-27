import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { catchError,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {
endpoint:string='https://qkart-frontend-d6ll.onrender.com/api/v1'

constructor(private http:HttpClient) { }
  
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.endpoint}/products`);
  }

// LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password  user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  loginUser(body:object):Observable<{success:boolean,message?:string,token?:any,balance?:any,username?:any}>
  {
    let url=this.endpoint+"/auth/login";
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<{success:boolean,message?:string,token?:any,balance?:any,username?:any}>(url,body,{headers}).pipe(
      catchError(this.handleError)
    )
  }


  registerUser(body:object):Observable<object>{
    let url=this.endpoint+"/auth/register"
    const headers = { 'Content-Type': 'application/json' };
    //return this.http.post(url,body)
    return this.http.post<{ success: boolean; message?: string }>(url, body,{headers}).pipe(
      catchError(this.handleError) // Handling errors using catchError
    );
  }

  fetchCart()
  {
    let url = this.endpoint + "/cart";
  let token = window.localStorage.getItem('token');

  console.log(token);
  if (!token) {
    return throwError(() => new Error("No authentication token found"));
  }
  if (token) {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get<object[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  return throwError(() => new Error("No authentication token found."));
  }
 
  getAddresses():any
  {
    let url = this.endpoint + "/user/addresses";
    let token = window.localStorage.getItem('token');

    //console.log(token);
    if (!token) {
      return throwError(() => new Error("No authentication token found"));
    }
    if (token) {
      const headers = { 'Authorization': `Bearer ${token}` };
  
      return this.http.get<object[]>(url, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  }



  addNewAddress(newAddress:string):any{
    let url = this.endpoint+"/user/addresses";
    let token = window.localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error("No authentication token found"));
    }
   
    const headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
     };
     let body={address:newAddress};
     return this.http.post(url,body,{headers}).pipe(
      catchError(this.handleError)
    )
  }

  deleteSelectedAddress(addressId: string) {
    let url = `${this.endpoint}/user/addresses/${addressId}`;
    let token = window.localStorage.getItem('token');
  
    if (!token) {
      return throwError(() => new Error("No authentication token found"));
    }
  
    const headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    return this.http.delete(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

 performCheckoutPost(addressId:string)
 {
  let url = this.endpoint+"/cart/checkout";
  let token = window.localStorage.getItem('token');
  if (!token) {
    return throwError(() => new Error("No authentication token found"));
  }
 
  const headers = { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
   };
   let body={'addressId':addressId};
   return this.http.post(url,body,{headers}).pipe(
    catchError(this.handleError)
  )
 }

  private handleError(error: HttpErrorResponse) {
    if (error.status >= 400) {
      return throwError(() => new Error(error.error.message || 'Bad Request'));
    } else {
      return throwError(() => new Error('Something went wrong. Check that the backend is running, reachable and returns valid JSON.'));
    }
  }
}
