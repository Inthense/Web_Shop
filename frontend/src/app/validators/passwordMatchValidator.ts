import { AbstractControl } from "@angular/forms"

export const PasswordMatchValidator = (passwordControlName: string,
  confirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => {
      const passwordControl = form.get(passwordControlName);
      const confirmPasswordControl = form.get(confirmPasswordControlName);
      if(!passwordControl || !confirmPasswordControl)
      return;
      if(passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({doNotMatch: true});
      } else {
        const errors = confirmPasswordControl.errors;
        if(!errors)
        return;
        delete errors.doNotMatch;
        confirmPasswordControl.setErrors(errors);
      }
    }
    return validator;
  }
