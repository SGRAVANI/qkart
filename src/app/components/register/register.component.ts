import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { ApidataService } from 'src/app/services/apidata.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements DoCheck {
 registerForm!:FormGroup;
 message:any=null;
 variant:string='';
 registerResponse!:object;
constructor(private router:Router, private formbuilder:FormBuilder,
  private apidataservice:ApidataService){
this.registerForm=formbuilder.group({
  username:['',[Validators.required,Validators.minLength(5)]],
  password:['',[Validators.required,Validators.minLength(6)]],
  cnfpassword:['',[Validators.required,Validators.minLength(6)]]
})
}
isLoading:boolean=false;
redirectToHome()
{
  this.router.navigate(['/'])
}
handleRegister()
{
  //console.log(this.registerForm.value)
 if(this.registerForm.value.password!=this.registerForm.value.cnfpassword)
 {
  // console.log("not matched")
  this.message="Passwords do not match";
  this.variant="danger";
  return;
 }
 if(this.registerForm.controls['username'].hasError('minlength')&&this.registerForm.controls['username'].touched)
 {
  this.message="minimum 5 characters required in username"
  this.variant="warning"
  return
 }
 let body={
  username:this.registerForm.get('username')?.value,
  password:this.registerForm.get('password')?.value,
  
 }
 this.isLoading=true;
 this.apidataservice.registerUser(body).subscribe((res)=>{
  //console.log(res);
  this.registerResponse=res;
  this.message="User Registered successfully"
  this.variant="success"
  this.isLoading=false;
   setTimeout(()=>{
    this.router.navigate(['/login'])
   },3000)
 },
 (error)=>{
  //console.error(error.error);
  this.message=String(error).slice(6);
  this.variant='danger';
  this.isLoading=false
 })
 //console.log(body)

}

ngDoCheck(): void {
  //console.log(this.message)
 if(this.message)
 {
  setTimeout(()=>{
   this.message=null;
   this.variant='';
  },5000)
 }
}
}
