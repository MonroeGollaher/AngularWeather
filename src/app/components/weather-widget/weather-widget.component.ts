import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {

  WeatherData: any;

  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay: true
    }
    this.getWeatherData()
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=boise&units=imperial&appid=1ef002bb8e45c35d2232da183d831698')
    .then(response => response.json())
    .then(data => { this.setWeatherData(data)})
  }

  setWeatherData(data){
    this.WeatherData = data
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000)
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString()
    let currentDate = new Date()
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime())
    this.WeatherData.temp_farenheit = (this.WeatherData.main.temp).toFixed(0)
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min).toFixed(0)
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max).toFixed(0)
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like).toFixed(0)
  }

}
