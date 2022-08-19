import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';




declare var $:any

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService:AuthService ,private _Router:Router) {
    if (this._AuthService.userData.getValue() !=null) {
      this._Router.navigate(['/profile'])

    }

   }


  isClicked:boolean=false

  messageSuccess:string=''
  isSuccess:boolean=false

  messageError:string=''
  isError:boolean=false









  signinFrom:FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
    // ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)


  })

  submitSigninForm(formdata:FormGroup){
    console.log(formdata)

    this.isClicked=true


    this._AuthService.signIn(formdata.value).subscribe(
      (response)=>{
        console.log(response)

          if (response.message=='success') {

            localStorage.setItem('TOKEN',response.token)

            this._AuthService.saveUserData()

            this._Router.navigate(['/profile'])


            this.isClicked=false

            this.messageSuccess=response.message
            this.isSuccess=true

            this.isError=false
          }
          else {
            this.isClicked=false

            this.messageError=response.message
            this.isError=true


            this.isSuccess=false


          }


      }
    )
  }


  ngOnInit(): void {
    $('#signIn').particleground();

  }

}
