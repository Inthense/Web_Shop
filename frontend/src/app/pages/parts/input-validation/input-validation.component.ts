import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'Darf nicht leer sein',
  email: 'Die E-Mail ist nicht richtig eingegeben',
  minLength: 'Eingabe zu kurz.',
  doNotMatch: 'Passwörter stimmen nicht überein'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMessages: string[] = [];

  checkValidation() {
    const errors = this.control.errors;
    if(!errors) {
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATOR_MESSAGES[key]);
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

}
