import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/env';
import { LoginFormComponent } from '../auth/components/login-form/login-form.component';
import { LoginPageComponent } from '../auth/pages/login-page/login-page.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  //contentRendered:string="[Podcast Intro Music] Sarah: Welcome back to another episode of Marketing Made Simple, the podcast where we break down complex marketing strategies into simple and actionable steps. I'm your host, Sarah, and today we have a very special guest joining us. Please give a warm welcome to our marketing expert, Allan Dib! Allan: Thank you, Sarah! I'm thrilled to be here and share my insights on marketing techniques. Sarah: We're delighted to have you, Allan. Now, in today's episode, we're going to dive deep into your 1-Page Marketing Plan and explore how it can be applied to different industries. But before we get into that, let's quickly summarize the main sections of your plan. Allan: Absolutely. The 1-Page Marketing Plan is all about simplifying the marketing process by breaking it down into three key sections: Before, During, and After. Each section consists of three sub-categories, resulting in a total of nine key elements. Sarah: Fantastic! So, let's focus on the Before section. This is where we establish how to attract new prospects. Earlier, our listener requested an example of how to apply your framework to an AI blog. Could you share an adapted version of the plan for that specific niche? Allan: Of course! Let's dive into the Before section for an AI blog's marketing plan. Sarah: Great! So, what are the first three sub-categories under the Before section for an AI blog? Allan: The first sub-category is Market Research. It's essential to dive deep into your target audience, understand their pain points, and identify key trends in the AI field. This information will shape your entire marketing strategy. Sarah: So, understanding the market's demand for AI-related content is crucial. What's the next sub-category? Allan: The second sub-category is Message. Here, you define your Unique Selling Proposition (USP) for your AI blog. What makes your content stand out from competitors? Emphasize the value you offer and the problems you solve. Sarah: That makes sense. A compelling message is crucial to capture the attention of potential readers. And what's the final sub-category under the Before section? Allan: The last sub-category is Channel. Determine the most effective channels to reach your target audience. It could be through social media platforms, industry forums, or collaborating with influential AI professionals. Select the channels that align with your target audience's preferences. Sarah: Excellent! Now, let's wrap up this episode by briefly discussing the remaining sections of your 1-Page Marketing Plan. Allan: After covering the Before section, you will move on to the During section, which focuses on converting prospects into paying customers. And lastly, the After section concentrates on delivering a remarkable customer experience and nurturing relationships for future growth. Sarah: Perfect! It's incredible how your 1-Page Marketing Plan simplifies the entire marketing process. Our listener who requested an AI blog example will surely find this information valuable. Thank you, Allan, for joining us today! Allan: Thank you, Sarah. It was my pleasure to be part of this insightful conversation. [Podcast Outro Music]";
  contentRendered:string;
  loading:boolean;
  submitted = false;
  articleAudioGenerated:boolean=false;

  audioSource = '';

  get f() { return this.form.controls; }


  constructor(private authService: AuthService, private router: Router,
    private formBuilder: FormBuilder,private httpClient: HttpClient) {}

  ngOnInit(): void {
    //this.formatTranscript(this.contentRendered);
    this.form = this.formBuilder.group({
      keywords: ['', Validators.required],
      number: ['', [Validators.required,Validators.pattern('^[0-9]*$')]]
  });
  this.loading=false;
  }


  

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  history(){
    this.router.navigate(['/history']);
  }

  get isSearchDisabled(): boolean {
    return !(this.f.keywords.value && this.f.number.valid);
  }

  onSubmit() {
    console.log("Generate Podcast Entered");
    this.submitted=true;
    this.loading=true;
    var formData: any = new FormData();
    formData.append('username', this.authService.getUsername());
    //formData2.append('input_string', 
    //"Allan Dib's 1-Page Marketing Plan is a simplified approach to creating a marketing plan, breaking it down into three main sections: Before, During, and After. Each section contains three sub-categories, resulting in a total of nine key elements. Here's a 1-Page Marketing Plan for your AI blog, adapted from Allan Dib's framework  Before (Prospect)");
    formData.append('input_time', this.form.value.number);
    formData.append('input_string', this.form.value.keywords);

    this.httpClient.post(`${API_URL}/podcast_text_generation`, formData)
              .subscribe((data:any) => {
                this.loading=false;
                // //this.formatTranscript(data.podcast_text);
                // this.contentRendered=data.podcast_text;
                // console.log(data);
                // this.loading=false;
                // this.generateAudio(data);
            });
  }

  formattedTranscript: any[] = [];

  // formatTranscript(podcast_text: string) {
  //   // Removing intro and outro music from transcript
  //   const cleanTranscript = podcast_text.replace(/\[Podcast (Intro|Outro) Music\]/g, '').trim();

  //   // Splitting by speaker
  //   const segments = cleanTranscript.split(/(Sarah:|Allan:)/).filter(Boolean);

  //   for (let i = 0; i < segments.length; i += 2) {
  //     this.formattedTranscript.push({
  //       speaker: segments[i].trim(),
  //       dialogue: segments[i + 1].trim()
  //     });
  //   }
  // }
}
