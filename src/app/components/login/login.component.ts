import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApidataService } from 'src/app/services/apidata.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck {
  authButtons:boolean=true
  isLoading:boolean=false
  message!:any;
  variant!:string;
  user:{username:string,password:string}={username:'',password:''};
  constructor(private router:Router,private apidataservice:ApidataService)
  {

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
redirectToHome()
{
  this.router.navigate(['/'])

}
  // isDataInValid()
  // {
  // if(this.user.password.length<6)
  // {
  //   return true
  // }
  // return false
  // }


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



  handleSubmit(form:NgForm)
  {
  
  //e.preventDefault()
  if(this.message)
  {
    this.message=null;
    this.variant='';
  }
  if(this.user.username.length==0)
  {
    this.message="username can't be empty"
    this.variant="warning";
    return;
  }
  if(this.user.password.length<6)
  {
    this.message="password must contains atleast six character"
    this.variant="warning"
    return
  }

  let body={username:this.user.username,password:this.user.password}
  console.log(body)
  this.isLoading=true;
  this.apidataservice.loginUser(body).subscribe(
    (res)=>{

      console.log(res)
       this.message="Logged in successfully";
     //let {token,username,balance}=res;
       this.variant="success"
       this.isLoading=false;
      this.persistLogin(res?.token,res?.username,res?.balance);
      setTimeout(()=>{
      this.router.navigate(['/'])
      },1000)
    },
   (error)=>{
   this.message=String(error).slice(6);
  this.variant='danger'
   this.isLoading=false;
   })
  
  }


   persistLogin (token:any, username:string, balance:any) {
    //let userData={token,username,balance}
    //localStorage.setItem("userDetails",JSON.stringify(userData))
    localStorage.setItem('username',username);
    localStorage.setItem('token',token)
    localStorage.setItem('balance',balance)
  }
}
