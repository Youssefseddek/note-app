import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean=false

  welcomeName:any


  constructor(private _AuthService:AuthService) { }

  

  ngOnInit(): void {

    this._AuthService.userData.subscribe(
      ()=>{
        if (this._AuthService.userData.getValue() !=null) {

          this.isLogin=true          
          
        }
        else{
          this.isLogin=false
        }
      }
    )

    // this.welcomeName=this._AuthService.userData.value.first_name



  }



  calllogout(){
    this._AuthService.logout()
    
  }


  

  

}
