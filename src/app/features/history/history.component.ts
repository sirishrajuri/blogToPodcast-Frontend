import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/env';
import { LoginPageComponent } from '../auth/pages/login-page/login-page.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ResponseData,ResponseDataItem } from 'src/app/core/interfaces/responsedata.interface';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  resultKeywords: {};
  responseData:ResponseData;
  articleAudioGenerated:boolean=false;
  articleVideoGenerated:boolean=false;
  contentAudio:string='';
  contentVideo:string='';
  contentRendered:string='';
  videoSource = '';
  audioSource = '';
  responseDataItem: ResponseDataItem;

  constructor(    private httpClient: HttpClient, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory(){
    var formData: any = new FormData();
    formData.append('username', this.authService.getUsername());
    this.httpClient.post(`${API_URL}/fetch_history`,formData).subscribe((data:any) => {
        console.log(data);
        this.responseData = data;
      });
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  dashboard(){
    this.router.navigate(['/']);
  }

  podcastSelected(timestampKey: string){
    console.log("Podcast selected:"+timestampKey);
    console.log(this.authService.getUsername());
    this.responseDataItem = (this.responseData[timestampKey]);
    this.audioSource='';
    this.videoSource='';
    if(this.responseDataItem.Conversation){
      console.log("Conversation is generated for the podcast selected");
      this.fetchPodCast(timestampKey);
    }else{
      this.contentRendered="Podcast generation in progress";
    }
    console.log(this.responseDataItem.Audio);
  }

  fetchPodCast(timestampKey: string){
    console.log("Fetching podcast");
    var formData: any = new FormData();
    console.log(this.authService.getUsername());
    formData.append('username', this.authService.getUsername());
    formData.append('request_time_stamp', timestampKey);
    this.httpClient.post(`${API_URL}/fetch_podcast_text_generated`,formData).subscribe((data:any) => {
      console.log("Fetched podcast successfully.")
      this.contentRendered=data.podcast_text;
      this.generateAudio(timestampKey);
    });
  }

  generateAudio(timestampKey: string) {
    console.log("Generating Audio");
    this.fetchHistory();
    this.responseDataItem = (this.responseData[timestampKey]);
    var formDatas: any = new FormData();
    formDatas.append('request_time_stamp', timestampKey);
    formDatas.append('podcast_text', "random");
    formDatas.append('username', this.authService.getUsername());
    console.log(this.responseDataItem);
    if(this.responseDataItem.Audio){
      console.log("Audio is generated for the podcast selected");
      this.fetchAudio(timestampKey,formDatas);
      this.articleAudioGenerated=true;
    }else{
      this.articleAudioGenerated=false;
      this.httpClient.post(`${API_URL}/audio_file_generation`,formDatas).subscribe((data:any) => {
        console.log(data);
      });
    }
  }

  fetchAudio(timestampKey: string,formDatas:any){
    console.log("Fetching Audio");
    this.httpClient.post(`${API_URL}/fetch_audio_file_generated`,formDatas,{ responseType: 'blob' }).subscribe((data:any) => {
      console.log("Fetched Audio successfully.")
      this.audioSource=URL.createObjectURL(data);
      this.generateVideo(timestampKey,formDatas);
    });
  }

  generateVideo(timestampKey: string,formDatas:any) {
    console.log("Generating Video");
    this.fetchHistory();
    this.responseDataItem = (this.responseData[timestampKey]);
    console.log(this.responseDataItem);
    if(this.responseDataItem.Video){
      console.log("Video is generated for the podcast selected");
      this.fetchVideo(timestampKey,formDatas);
      this.articleVideoGenerated=true;
    }else{
      this.articleVideoGenerated=false;
      this.httpClient.post(`${API_URL}/video_file_generation`,formDatas).subscribe((data:any) => {
        console.log("generateVideo: "+data);
      });
    }
  }

  fetchVideo(timestampKey: string,formDatas:any){
    console.log("Fetching Video");
    this.httpClient.post(`${API_URL}/fetch_video_file_generated`,formDatas,{ responseType: 'blob' }).subscribe((data:any) => {
      console.log("Fetched Video successfully.")
      this.videoSource=URL.createObjectURL(data);
    });
  }

  

}
