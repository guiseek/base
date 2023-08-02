import {
  inject,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthFacade } from '@base/client/auth';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'admin-store',
  templateUrl: './store.container.html',
  styleUrls: ['./store.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreContainer implements OnInit {
  #breakpointObserver = inject(BreakpointObserver);

  isHandset$ = this.#breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  authFacade = inject(AuthFacade);

  ngOnInit(): void {
    this.authFacade.loadUser();
  }
}
