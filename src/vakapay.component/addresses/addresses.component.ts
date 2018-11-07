import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';   // Using Material Paginator
import { WalletService } from 'services/wallet/wallet.service';
import { AddressToolsService } from 'services/tools/address-tools.service';
import { Wallet } from 'model/tools/Wallet';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Address } from 'model/tools/Address';
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
  walletService: WalletService;
  listWallet: any[];
  networkName: "Bitcoin";
  filter: string;
  displayedColumns: string[] =  [ 'address', 'label', 'whenFormat', 'id'];
  constructor(
    public serviceAddress: AddressToolsService,
    public ngxSmartModalService: NgxSmartModalService,
    breakpointObserver: BreakpointObserver,
    walletService: WalletService
    ) {
    this.networkName = "Bitcoin";
    this.serviceAddress.getList(this.networkName);
    breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        [ 'address', 'label', 'whenFormat', 'id'] :
        [ 'address', 'label', 'whenFormat', 'id'];
    });
    
    this.walletService = walletService;
   }

  ngOnInit() {
    this.getUserData();
    this.serviceAddress.infoAddress = new Address;
  }

  async getUserData() {
    try {
      
      var result = await this.walletService.getAllWallet();
      var dataWallet = JSON.parse(result.message);
      
      this.listWallet = dataWallet.map(x => new Wallet(x['Currency'], x['Currency'] + ' wallet (' + x['Balance'] + ')', false));
     
    } catch (error) {
      console.log(error);
    }

  }
  // onClick function of 'Create New Address' button
  public async onClickCreateNewWallet() {
    try {
      // tslint:disable-next-line:prefer-const
      
      var dataPost = {
        networkName: this.networkName || ''
      };
      await this.walletService.createWalletAddress(dataPost);
      this.serviceAddress.getList(this.networkName);

    } catch (error) {
      console.log(error);
    }
  }

  public onClickFilter(){
    this.serviceAddress.getList(this.networkName, this.filter);
  }

  public onChangeWallet(event){
    this.networkName = event.key;
    this.serviceAddress.getList(this.networkName);
  }

  public async onClickDetail(id){
    var dataPost = {
      networkName: this.networkName || '',
      id: id
    };
    await this.serviceAddress.getAddressInfo(dataPost);
    
    this.onShowModal();
  }

  onShowModal() {
    
    this.ngxSmartModalService.getModal('modalEdit').open();//refresh list of api key    
  }

  onCloseModal() {
    this.ngxSmartModalService.getModal('modalEdit').close();
    this.serviceAddress.infoAddress = new Address;
  }

  cancel() {
    this.onCloseModal();
    this.serviceAddress.infoAddress = new Address;
  }

  async onUpdate() {
    var dataPost = {
      networkName: this.networkName || '',
      id: this.serviceAddress.infoAddress.id,
      label: this.serviceAddress.infoAddress.label
    };
    
    await this.serviceAddress.updateAddress(dataPost);
    
    if(!this.serviceAddress.isError){
      this.serviceAddress.getList(this.networkName);
      this.cancel();
    }
  }
}
