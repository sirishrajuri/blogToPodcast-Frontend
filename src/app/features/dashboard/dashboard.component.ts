import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/env';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  contentRendered:string='';
  loading:boolean;
  submitted = false;
  get f() { return this.form.controls; }
  constructor(private authService: AuthService, private router: Router,
    private formBuilder: FormBuilder,private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      keywords: ['', Validators.required],
      number: ['', Validators.required]
  });
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  onSubmit() {
    var formData2: any = new FormData();
    formData2.append('username', "testing");
    //formData2.append('input_string', 
    //"Allan Dib's 1-Page Marketing Plan is a simplified approach to creating a marketing plan, breaking it down into three main sections: Before, During, and After. Each section contains three sub-categories, resulting in a total of nine key elements. Here's a 1-Page Marketing Plan for your AI blog, adapted from Allan Dib's framework  Before (Prospect)");
    formData2.append('input_time', 5);
    formData2.append('input_string', this.form.value.keywords);
    this.httpClient.post(`${API_URL}/podcast_text_generation`, formData2)
              .subscribe((data:any) => {
                this.contentRendered=data;
                console.log(data);
                this.loading=false;
                //this.TestGenerateAudio(data);
                //this.resultKeywords=data;
            });
    console.log("sd");
  }
}
