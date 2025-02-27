
import { AfterContentInit, Component, ContentChild, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute ,NavigationEnd,Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterContentInit,DoCheck {
  @ContentChild('back') back!: ElementRef;
 searchNotRequired:boolean=false;
  @Output() onChangeInput:EventEmitter<string>=new EventEmitter;
  //  @Input() authButtons!: boolean;
  isLoginPage: boolean =false;
  userName:string|null=localStorage.getItem('username');
  

  constructor(private router: Router, private activeroute:ActivatedRoute) {}
  handleChange(event:any)
  {
    this.onChangeInput.emit(event.target.value);
  }
 


  ngAfterContentInit(): void {
   // console.log("content added");
  }
  redirectToLogin()
  {
    this.router.navigate(["/login"])
  }
  redirectToRegister()
  {
    this.router.navigate(["/register"])
  }
  redirectToHome()
  {
    this.router.navigate(['/'])
  }
  ngDoCheck()
  {
    this.isLoginPage=(this.router.url=="/login"||this.router.url=="/register")
    this.searchNotRequired=this.router.url=="/thanks"
    //console.log(this.isLoginPage)
  }
  clear()
  {
    localStorage.removeItem('username');
    localStorage.removeItem('token')
    localStorage.removeItem('balance')
    window.location.reload();
  }
}
