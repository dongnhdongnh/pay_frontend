import { Component, OnInit, Input } from '@angular/core';
import { Currency } from 'model/currency/Currency';
import { TimeZone } from 'model/timezone/TimeZone';
import { Account } from 'model/account/Account';
import { Utility } from 'utility/Utility';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  @Input() mAccount: Account;

  listCurrency: Currency[];
  listTimeZone: TimeZone[];

  selectedCurrencyKey: string;
  selectedTimeZoneKey: string;

  //status
  isChange = false;
  isLoading = false;
  isValid = false;

  //message
  messageErrorCurrency: string = '';
  messageErrorTimeZone: string = '';

  //service
  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.listCurrency = Currency.getListCurrency();
    this.listTimeZone = TimeZone.getListTimeZone();
    this.accountService = accountService;
  }

  ngOnInit() {
  }

  validate() {
    var currencyKey = this.mAccount.currencyKey || '';
    var timezoneKey = this.mAccount.timezoneKey || '';

    let isCurrency = currencyKey != null && Boolean(
      this.listCurrency.find(x => x.key === currencyKey)
    );

    let isTimezone = timezoneKey != null && Boolean(
      this.listTimeZone.find(x => x.key === timezoneKey)
    );

    this.isValid = isCurrency && isTimezone;

    if (isCurrency === false) {
      this.messageErrorCurrency = 'Currency is invalid.';
      return;
    }

    this.messageErrorCurrency = '';

    if (isTimezone === false) {
      this.messageErrorTimeZone = 'Timezone is invalid.';
      return;
    }

    this.messageErrorTimeZone = '';
  }

  async onUpdate() {
    try {
      if (this.isChange === false) return;
      this.isLoading = true;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        currencyKey: this.mAccount.currencyKey || '',
        timezoneKey: this.mAccount.timezoneKey || ''
      };

      //send ajax
      let result = await this.accountService.updatePreference(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();

      return;
    } catch (error) {
      this.isLoading = false;
    }
  }

  onReset() {
    this.isValid = false;
    this.isLoading = false;
    this.isChange = false;
  }

  onChangeCurrency(event) {
    this.isChange = true;
    this.validate();
  }

  onChangeTimezone(event) {
    this.isChange = true;
    this.validate();
  }

}
