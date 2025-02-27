import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const authguardGuard: CanActivateFn = (route, state) => {
let router=inject(Router)
  let loginToken=window.localStorage.getItem('token')
  if(!loginToken)
  {
    router.navigate(['/login'])
    return false
  }
 return true;
};
