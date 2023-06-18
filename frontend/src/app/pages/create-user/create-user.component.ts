import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterfaceUserRegister } from 'src/app/interfaces/InterfaceUserRegister';
import { UserService } from 'src/app/services/user.service';
import { PasswordMatchValidator } from 'src/app/validators/passwordMatchValidator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private activatedRoute:ActivatedRoute, private router:Router) {}

    ngOnInit():void {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.minLength(4)]]
      },{
        validators: PasswordMatchValidator('password','confirmWPassword')
      });
      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    }

    get fc() {
      return this.registerForm.controls;
    }

    submit() {
      this.isSubmitted = true;
      if(this,this.registerForm.invalid)
      return;
      const fv = this.registerForm.value;
      const user:InterfaceUserRegister = {
        name: fv.name,
        email: fv.email,
        password: fv.password,
        confirmPassword: fv.confirmPassword,
        address: fv.address
      };
      this.userService.createUser(user).subscribe(_ => {
      })
      this.router.navigate(['/admin-page']);
    }

}
