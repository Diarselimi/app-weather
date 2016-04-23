var url = "http://api.openweathermap.org/data/2.5/weather?";
var appid = "&appid=8ec04d9381e406d72151eb4d84b33d5b&units=metric";
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

$(document).ready(function(){

  $('.get_by_location').on('click', function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      updateWeather(position.coords.latitude, position.coords.longitude);
    });
  });


  $('.get_weather').on('click', function(){
    $('.sun').addClass('rotate-img');
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

function updateData(data)
{
  $('.sun').removeClass('rotate-img');
  $('.card-title').html(data.name+ ' ' + data.main.temp+' C');
  var weather = data.weather[0];
  $('.weather_description').html(weather.description);
  $('.icon').attr('src', 'img/'+weather.description.split(' ').join('')+'.png');
}
