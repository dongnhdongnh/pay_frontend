import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';   // Using Material Paginator
import { WalletService } from 'services/wallet/wallet.service';

export interface AddressElement {
  address: string;
  label: string;
  created: number;
}

// Fixed data for table testing
const ELEMENT_DATA: AddressElement[] = [
  {label: '', address: '3GiLC4weCamfEqaWFrHyoRykMXRfB4W1FP', created: 1 },
  {label: '', address: '3L1QJU93gm3h7AmcFKEBwT9a41ZHjvoMad', created: 4 },
  {label: '', address: '36LBsSdpiKezQDkMFjpWf8FK3vUR6osKph', created: 6 },
  {label: '', address: '3D47vUHiEKAM7ZN4BzkzinGDRrUVoiiF9d', created: 9 },
  {label: '', address: '38vAEPkpv3snG4XerZPxyPi1867JDNeqP8', created: 10 },
  {label: '', address: '35Vrq57YvgeUFQUu9S9T49CUCPpB73tAnp', created: 12 },
];

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  title = 'angular-mat-table';
  displayedColumns: string[] = ['address', 'label', 'created', 'detail'];
  dataSource = new MatTableDataSource<AddressElement>(ELEMENT_DATA);
  walletService: WalletService;

  constructor(walletService: WalletService) {
    this.walletService = walletService;
   }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  // onClick function of 'Create New Address' button
  public onClickCreateNewWallet() {
    try {
      const tempData = {label: '', address: '3GiLC4weCamfEqaWFrHyoRykMXRfB4W1FP', created: 1 };
      this.walletService.createWalletAddress(tempData);
    } catch (error) {
      console.log(error);
    }
  }
}
