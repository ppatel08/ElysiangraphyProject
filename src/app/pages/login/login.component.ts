import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { NotificationService } from 'src/app/service/notification.service';
import { LoginService } from 'src/app/api/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMsg: any;
  isPasswordVisible = false;
  passwordType = "password";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private notificationService: NotificationService) {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['admin/dashboard']);
    }
  }

  get f() { return this.loginForm.controls; }

  submitForm = () => {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.notificationService.error('Please enter username and password');
      return;
    }
    let formData = this.loginForm.value;
    this.loginService.login(formData).subscribe(data => {
      if (data.result) {
        this.sharedService.setLoggedInUserData(data.result);
        localStorage.setItem('access_token',data.result)
        this.router.navigate(['admin/dashboard']);
      }else{
        this.notificationService.error('Something went wrong');
      }
    });
  }


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordType = this.isPasswordVisible ? 'text' : 'password';
  }
}
