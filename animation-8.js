var sceneCenter = { x: 165.4, y: 160.4 };
var polygons = document.querySelectorAll('#Parts>polygon');
polygons.forEach(function(x){
    var box = x.getBBox();
    var polygonCenter = {x: box.x + box.width * 0.5, y: box.y + box.height * 0.5 };
    var vector = {x: polygonCenter.x - sceneCenter.x , y: polygonCenter.y - sceneCenter.y};
    var vectorLength = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var direction = {x: vector.x/vectorLength, y: vector.y/vectorLength};
    var offset = {x: direction.x * 36, y: direction.y * 36 };
    var translation = 'translateX(' + offset.x + 'px) translateY(' + offset.y + 'px)';
    x.style.transform = translation; 
});

document.querySelector('#Parts').style.transform = 'rotate(-90deg)';

var timeline = anime.timeline({
    direction: "alternate",
    loop: true
});

timeline.add({
    targets: '#Parts>polygon',
    translateX: 0,
    translateY: 0,
    easing: 'linear',
    offset: 0,
    duration: 1000
}).add({
    targets: '#Parts',
    rotate: 0,
    easing: 'linear',
    offset: 0,
    duration: 1000
}).add({
    targets: '#Lines>line',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',    
    duration: 1000,   
}).add({
    targets: '#Checkmark',
    opacity: 1,
    easing: 'linear',
    offset: '-=500',
    duration: 1000,   
}).add({
    targets: '#Sparks>line',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',    
    duration: 500,    
});