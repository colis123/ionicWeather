import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  city: string;
  country: string;

  lat: number;
  lon: number;

  constructor( private router: Router,
               private storage: Storage,
               private modal: ModalController,
               private loader: LoadingController,
               private geolocation: Geolocation) {

      
    //  Get Storage Values First
    this.storage.get('location').then(val => {
      console.log(val);
      if(val!= null) {
        // If is not null, pull from storage
        let location = JSON.parse(val);
        this.city = location.city;
        this.country = location.country;
      } else {
        // Default to San Diego
        this.city = 'San Diego';
        this.country = 'US';
      }
    });
  
  }

  // Get Geolocation
  getLocation() {
    let options = {timeout: 10000, enableHighAccuracy: true}
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log('location',resp);
      this.lat =  resp.coords.latitude;
      this.lon = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

    // Loader

    async presentLoading() {
      const loading = await this.loader.create({
        message: 'Loading',
        duration: 1000
      });
      await loading.present();
    }


  saveForm() {
    
    let location = {
      city: this.city,
      country: this.country
    }
    console.log(location)
    this.storage.set('location', JSON.stringify(location));

    // Navigate back to home page
    this.presentLoading().then (_ => {
      setTimeout(_ => {
        this.modal.dismiss();
      }, 1500);
    });
    
  }


          

  ngOnInit() {
  }

}
