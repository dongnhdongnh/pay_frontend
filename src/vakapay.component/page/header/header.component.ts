import { Component, Input } from '@angular/core';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() device: any;
  mAccount: any;
  mAccountSerive: any;
  constructor(mAccountSerive: AccountService) {
    this.mAccountSerive = mAccountSerive;
    this.mAccount = mAccountSerive.mAccount;
  }

  toggleMenu() {
    this.device['isMobile'] = !this.device['isMobile'];
  }
}
