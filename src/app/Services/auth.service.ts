import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string='https://routeegypt.herokuapp.com/'

  userData:any=new BehaviorSubject(null)




  constructor(private _HttpClient:HttpClient ,private _Router:Router ) {

    if (localStorage.getItem('TOKEN') !=null) {

        this.saveUserData()
    }

   }

  signUp(data:any):Observable<any>{

    return this._HttpClient.post(`${this.baseUrl}signup`,data)

  }
  signIn(data:any):Observable<any>{

    return this._HttpClient.post(`${this.baseUrl}signin`,data)

  }
  signOut(data:any):Observable<any>{

    return this._HttpClient.post(`${this.baseUrl}signOut`,data)

  }






  saveUserData(){

    let encodedData=JSON.stringify(localStorage.getItem('TOKEN'))
    let decodeData=jwtDecode(encodedData)
    this.userData.next(decodeData)
    console.log(this.userData)

  }


  // isLoggedIn(){
  //   return  !!localStorage.getItem('TOKEN')
  // }




  logout(){
    localStorage.removeItem("TOKEN")
    this.userData.next(null)
    this._Router.navigate(['/signin'])
  }


}
