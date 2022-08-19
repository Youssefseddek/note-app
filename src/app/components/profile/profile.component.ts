import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { single } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { NotesService } from 'src/app/Services/notes.service';


declare var $:any



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isload:boolean=false


  AllNotes:any

  userName:string=''
  

  
  token=localStorage.getItem('TOKEN')

  constructor(private _NotesService:NotesService ,private _AuthService:AuthService ,private _Router:Router ) {
    this.getAllData()
    this.userName= this._AuthService.userData.value.first_name
    console.log(this.userName);
    
   }



   data:object={
    token:this.token,
    userID:this._AuthService.userData._value._id
   }
// ----------------------add note-----------------------------------
   AddNote:FormGroup=new FormGroup({
    title:new FormControl(null,Validators.required),
    desc:new FormControl(null,Validators.required)
   })

  

   addData(formdata:FormGroup){
    console.log(formdata.value);
    console.log();

    let addObj={
      title:formdata.value.title,
      desc:formdata.value.desc,
      token:this.token,
      citizenID:this._AuthService.userData._value._id
     
    }

    

    
    this._NotesService.addNote(addObj).subscribe((res)=>{
      console.log(res)
      $('#addNote').modal('hide')
      this.AddNote.reset()
      
      
      

      this.getAllData()
    })
    
   }

   // ----------------------------------------------------------------------




   // -------------------------------- get Data --------------------------------------
   notFoundMessage:string=''
   notFound:boolean=false
   getAllData(){
    
    this._NotesService.getAllNotes(this.data).subscribe((res)=>{
      console.log(res)
   

      if (res.message=='success') {
        this.AllNotes=res.Notes
        this.isload=true
        this.notFound=false
        
      }
      else if (res.message=='no notes found') {
        this.AllNotes=res.Notes
        this.isload=true
        this.notFoundMessage='no notes found'
        this.notFound=true
        
      }
      else{
        localStorage.clear()
        this._Router.navigate(['/signin'])

      }

      
      
      
    })
    
   }
  // ----------------------------------------------------------------------


  //  -------------------------------------- delete note ---------------

  NOTE_ID:string=''
  getId(id: any){
    this.NOTE_ID=id
    console.log(id)
  }

deleteNote(){
    let data ={
      NoteID:this.NOTE_ID,
      token:this.token
    }

    this._NotesService.deleteNote(data).subscribe((res)=>{
      console.log(res)
      this.getAllData()
     
    })


  }


  // ------------------------------------------------------------------


  // ----------------------- Edite Note -------------------------------

  EditeNote:FormGroup=new FormGroup({
    title:new FormControl(null,Validators.required),
    desc:new FormControl(null,Validators.required)
   })




  
  setValue(){
    for (let index = 0; index < this.AllNotes.length; index++) {
      if (this.AllNotes[index]._id == this.NOTE_ID) {

        console.log(this.AllNotes[index])
        this.EditeNote.controls['title'].setValue(this.AllNotes[index].title)
        this.EditeNote.controls['desc'].setValue(this.AllNotes[index].desc)



        
      }
      
    }
  }



  editeNote(data:any){

    let editeobj={
      title:data.value.title,
      desc:data.value.desc,
      token:this.token,
      NoteID:this.NOTE_ID,

     
    }

    this._NotesService.updateNote(editeobj).subscribe((res)=>{
      console.log(res)
      if(res.message=='updated') {
        this.getAllData()
      }
    }
 
    )
  }



  // -------------------------------------------------------------------













  ngOnInit(): void {

    // this._NotesService.getAllNotes(this.data).subscribe((res)=>{
    //   console.log(res)
    //   this.AllNotes=res.Notes

    
      
      
    // })
    

  }

}


