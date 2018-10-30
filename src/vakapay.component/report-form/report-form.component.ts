import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report, ReportTypes, Accounts, Timeranges } from '../../app/shared/report';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  reportForm: FormGroup;
  report: Report;
  reportType = ReportTypes;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.reportForm = this.fb.group({
      type: 'Transaction history',
      account: 'BTC',
      timerange: 'today',
      email: ''
      // TODO: Add more field
    });
  }

  // TODO: Temporarily log to console, connect to backend later
  onSubmit() {
    this.report = this.reportForm.value;
    console.log(this.report);
    this.reportForm.reset();
  }
}
