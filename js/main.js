var url = "http://api.openweathermap.org/data/2.5/weather?";
var maps = "http://www.google.com/maps/place/";
var googleapi = "AIzaSyD6LvhQh64NY6XnxrVfVbvR3WWpXbDALWE";
var appid = "&appid=8ec04d9381e406d72151eb4d84b33d5b&units=metric";
var icons = {
    "01d" : "<i class='wi wi-day-sunny'></i>",
    "02d" : "<i class='wi wi-day-cloudy'></i>",
    "03d" : "<i class='wi wi-day-cloudy-windy'></i>",
    "04d" : "<i class='wi wi-cloudy'></i>",
    "09d" : "<i class='wi wi-showers'></i>",
    "10d" : "<i class='wi wi-rain'></i>",
    "11d" : "<i class='wi wi-thunderstorm'></i>",
    "13d" : "<i class='wi wi-snow'></i>",
    "50d" : "<i class='wi wi-fog'></i>",
    "01n" : "<i class='wi wi-night-clear'></i>",
    "03n" : "<i class='wi wi-night-alt-cloudy'></i>",
    "02n" : "<i class='wi wi-night-cloudy-windy'></i>",
    "04n" : "<i class='wi wi-cloudy'></i>",
    "09n" : "<i class='wi wi-showers'></i>",
    "10n" : "<i class='wi wi-rain'></i>",
    "11n" : "<i class='wi wi-thunderstorm'></i>",
    "13n" : "<i class='wi wi-snow'></i>",
    "50n" : "<i class='wi wi-fog'></i>",
  };

var wallpapers = [
  {
    "url": "https://images.unsplash.com/photo-1431887773042-803ed52bed26?crop=entropy&fit=crop&fm=jpg&h=475&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
    "url": "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=eb4214b1bb04674628992a705ad3dc30",
    "url": "https://images.unsplash.com/photo-1422393462206-207b0fbd8d6b?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
    "url": "https://images.unsplash.com/photo-1444858345149-8ff40887589b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=f4b7fe44cd687b6707e1096b922b88cc",
    "url": "https://images.unsplash.com/photo-1437376576540-236661ddb41f?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
    "url": "https://images.unsplash.com/photo-1429979787503-f2d7d20550c8?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375"
  }
];

var night = [
  "https://images.unsplash.com/reserve/oY3ayprWQlewtG7N4OXl_DSC_5225-2.jpg?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
  "https://images.unsplash.com/photo-1425141708895-60ba4a72e556?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
  "https://images.unsplash.com/reserve/mW95rWmYSRe4nTMVaRaW_French-Mountain.jpg?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
  "https://images.unsplash.com/photo-1439923274069-a6f070db0c99?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=bd875b306cfb613e929a8b3251208922",
  "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
  "https://images.unsplash.com/photo-1444424050109-31f057e1e858?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=fe78a2fd285274f8a386db552d8bb7e6",
  "https://images.unsplash.com/photo-1441237990380-b6f17f0c3f4e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=4d95c1ff31f28dbf319e12d84739706e"
];
var currTime;
$(document).ready(function(){
  var date = moment.utc().format();
  console.log(date);
  currTime = date.split('T')[1].split(':',1)[0];
  if(currTime < 5){
    $('body').css('background-image', 'url('+night[parseInt(Math.random()*night.length)]+')');
    $('body').css('color', '#fff');
  }
  date = date.split('T', 1)[0];
  $('.now').html(date.split('-').reverse().join(' '));

  $('.get_by_location').on('click', function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      updateWeather(position.coords.latitude, position.coords.longitude);
    });
  });

  $(document).keypress(function(event) {
    if(event.which == 13){

    $('.sun').addClass('rotate-img');
    if($('#city').val() == "") {
      Materialize.toast('Please type a city name', 4000);
      return false;
    }
    $.getJSON(url+'q='+$('#city').val()+appid, function(data){
      updateData(data);
    });
    }else{
      return true;
    }

  });
  $('.get_weather').on('click', function(){
    $('.sun').addClass('rotate-img');
    if($('#city').val() == "") {
      Materialize.toast('Please type a city name', 4000);
      return false;
    }
    $.getJSON(url+'q='+$('#city').val()+appid, function(data){
      updateData(data);
      console.log(data);
    });
  });
});

function updateWeather(lat, lon)
{
  $('.sun').addClass('rotate-img');
  $.getJSON(url+'lat='+lat+'&lon='+lon+appid, function(data){
    updateData(data);
    console.log(data);
  });
}

function sunTravel(start, current, end)
{
  end = parseInt(end);
  start = parseInt(start);

  var total = end - start;
  current = current - start;
  current = Math.round((current / total) * 100);

  if(current > 100) {
    current = 100;
    $('.current i').removeClass('rotate-img');
  }else if(current < 0 ) {
    $('.current i').removeClass('rotate-img');
    current = 0;
  }

  $('.sunposition .hours').html('');
  for(var i=start; i <= end; i++) {
    $('.sunposition  .hours').append('<div style="position: absolute; width: 20px;color: #777; font-size: 12px; bottom: 2px; left: '+Math.floor(((i - start) / (end - start)) * 97)+'%;">'+i+':00</div>');
  }

  $('.current').animate({
    'left': current+'%'
  }, 3000);
}

function updateData(data)
{
  $('.card-panel').fadeIn('fast');
  $('#sunposition').removeClass('hide');
  $('.sun').removeClass('rotate-img');
  $('.card-title').html(data.name+ ' ,'+data.sys.country+'  ' + data.main.temp+' <i class="wi wi-celsius"></i>');
  var weather = data.weather[0];
  $('.description').html(weather.main+' '+weather.description);
  $('.humidity').html(data.main.humidity+' <i class="wi wi-humidity"></i>');
  $('.min').html(data.main.temp_min+' <i class="wi wi-celsius"></i>');
  $('.max').html(data.main.temp_max+' <i class="wi wi-celsius"></i>');
  $('.timeis').html(moment.unix(data.dt).hour()+':'+moment.unix(data.dt).minute()+' <i class="wi wi-celsius"></i>');
  $('.sr').html(moment.unix(data.sys.sunrise).hour()+':'+moment.unix(data.sys.sunrise).minutes());//multiply by 1000 to convert to miliseconds
  $('.ss').html(moment.unix(data.sys.sunset).hour()+':'+moment.unix(data.sys.sunset).minutes());//multiply by 1000 to convert to miliseconds
  sunTravel(
    moment.unix(data.sys.sunrise).hour()+parseFloat('0.'+moment.unix(data.sys.sunrise).minutes()), 
    moment.unix(data.dt).hour()+parseFloat('0.'+moment.unix(data.dt).minutes()), 
    moment.unix(data.sys.sunset).hour()+parseFloat('0.'+moment.unix(data.sys.sunset).minutes())); 
  $('.icon').html(icons[weather.icon]);

}

