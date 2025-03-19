import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GetUserService } from '../../services/get-user.service';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';

export const userGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const getUserService = inject(GetUserService);
  const router = inject(Router);

  return forkJoin({
    user: getUserService.getUser().pipe(catchError(() => of(null))),
    admin: getUserService.getAdmin().pipe(catchError(() => of(null)))
  }).pipe(
    map(({ user, admin }) => {
      if (admin) {
        router.navigate(['/admin']);
        return false;
      } else if (!user) {
        router.navigate(['/sign-in']);
        return false;
      }
      return true;
    })
  );
};
