import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /** Variable declarations */
  form: FormGroup;

  /** Service injection */
  constructor(private formBuilder: FormBuilder) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.form = this.formBuilder.group( {
      'firstName' : new FormControl(null, Validators.required),
      'lastName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'conf_pass' : new FormControl(null, Validators.required)
    }, {validator: this.confirmPassword});
  }

  /** Custom confirm password validator */
  confirmPassword = (control: AbstractControl): {[key: string]: boolean} => {

    const pass = control.get('password');
    const cnfPass = control.get('conf_pass');

    if (!pass || !cnfPass) {
      return null;
    }

    if (pass.value === cnfPass.value){
      return null
    } else{
      control.get('conf_pass').setErrors( { confirmPassword: true } );
      return { confirmPassword: true };
    }
  }

  /** Function call on submit */
  onSignUp() {
    console.log(this.form);
  }

}
