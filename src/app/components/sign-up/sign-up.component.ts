import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';




declare var $:any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  isClicked:boolean=false

  messageSuccess:string=''
  isSuccess:boolean=false

  messageError:string=''
  isError:boolean=false






  signupForm:FormGroup=new FormGroup({
    first_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    last_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    age:new FormControl(null,[Validators.required,Validators.min(10),Validators.max(70)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])

  })
 


  submitForm(formdata:FormGroup){
    console.log(formdata)
    this.isClicked=true
    

    this._AuthService.signUp(formdata.value).subscribe(
      (response)=>{
        if (response.message=="success") {
          this.signupForm.reset()

          this.isClicked=false

          this.messageSuccess=response.message
          this.isSuccess=true
          
          this.isError=false
          
        }
        else{
          this.isClicked=false

          this.messageError=response.errors.email.message
          this.isError=true

          this.isSuccess=false


        }
        console.log(response)
      }
    )
    


  }


  constructor(private _AuthService:AuthService) { 
    
  }






  ngOnInit(): void {
    $('#signUp').particleground();
  }

}
