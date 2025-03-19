import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SignUpPageService } from './services/sign-up-page.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  signupForm: FormGroup;
  isSubmit: boolean = false;
  signupErrorAfterSubmit: string = '';

  constructor(
    private signUpPageService: SignUpPageService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
    this.signupForm.setValidators(this.checkIfPasswordsMatch);
    this.signupForm.updateValueAndValidity();
  }

  checkIfPasswordsMatch(formGroup: AbstractControl) {
    return formGroup.value?.password === formGroup.value?.confirmPassword
      ? null
      : { mismatch: 'Sifre se ne poklapaju' };
  }

  onSubmit(event: SubmitEvent) {
    this.isSubmit = true;
    const buttonClicked = event.submitter as HTMLButtonElement;
    this.signupErrorAfterSubmit = '';
    if (buttonClicked.className && this.signupForm.valid) {
      this.signUpPageService.signUpUser(this.signupForm.value).subscribe({
        next: () => {
          this.router.navigate(['/appointment']);
        },
        error: (err) => {
          this.signupErrorAfterSubmit = err.error;
          this.isSubmit = false;
        },
      });
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
  toggleConfirmPassword(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
}
