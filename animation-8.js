var MAIN_ANIMATION_DURATION = 1500;
var CHECKMARK_APPEARANCE_DURATION = 750;
var DELAY = 3000;
var SPARK_ANIM_DURATION = 500;

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
    duration: MAIN_ANIMATION_DURATION
}).add({
    targets: '#Parts',
    rotate: 0,
    easing: 'linear',
    offset: 0,
    duration: MAIN_ANIMATION_DURATION
}).add({
    targets: '#Lines>line',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',    
    duration: MAIN_ANIMATION_DURATION,   
}).add({
    targets: '#Checkmark',
    opacity: 1,
    easing: 'linear',
    offset: '-=500',
    duration: CHECKMARK_APPEARANCE_DURATION,   
});

animateLines(timeline, '#Sparks>line', DELAY , SPARK_ANIM_DURATION);

function animateLines(timeline, targets, totalDelay, duration) {
    const count = Math.round( totalDelay / (2 * duration) );
    for(var i = 0; i < count;i++){
        timeline.add({
            targets: targets,
            strokeDashoffset: (i % 2)? [0, anime.setDashoffset] : [anime.setDashoffset, 0],        
            easing: 'linear',
            duration: duration     
        });
    }
}