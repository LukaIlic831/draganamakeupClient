import { Component, HostListener, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SignInPageService } from './services/sign-in-page.service';

@Component({
  selector: 'app-sign-in-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent {
  signinForm: FormGroup;
  signinErrorAfterSubmit: string = '';
  hidePassword = signal(true);
  isSubmit: boolean = false;

  constructor(
    private router: Router,
    private signInPageService: SignInPageService
  ) {
    this.signinForm = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(event: SubmitEvent) {
    this.isSubmit = true;
    const buttonClicked = event.submitter as HTMLButtonElement;
    this.signinErrorAfterSubmit = '';
    if (buttonClicked.className && this.signinForm.valid) {
      this.signInPageService.signInUser(this.signinForm.value).subscribe({
        next: () => {
          this.router.navigate(['/appointment']);
        },
        error: (err) => {
          this.isSubmit = false;
          this.signinErrorAfterSubmit = err.error;
        },
      });
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
}
