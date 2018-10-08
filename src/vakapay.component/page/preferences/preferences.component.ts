import { Component, OnInit } from '@angular/core';
import { Currency } from 'model/currency/Currency';
import { TimeZone } from 'model/timezone/TimeZone';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  listCurrency: Currency[];
  listTimeZone: Currency[];
  selectedCurrencyKey: string;
  selectedTimeZoneKey: string;

  constructor() { }

  ngOnInit() {
    this.listCurrency = Currency.getListCurrency();
    this.listTimeZone = TimeZone.getListTimeZone();
  }

}
