var FALL_DURATION = 1000;
var CONVEYOR_SPEED = 2000;
var TOTAL = 5000;

var timeline = anime.timeline({
    direction: 'forward',
    loop: true
});


var conveyourTimeline = anime.timeline({
    direction: 'forward',
    loop: true
})
conveyourTimeline.add({
    targets: '[id^=Screw-]',
    rotate: 360,
    easing: 'linear',
    offset: 0,    
    duration: CONVEYOR_SPEED
});
conveyourTimeline.add({
    targets: '#belt-pattern',
    y: [0, -40],
    easing: 'linear',
    offset: 0,
    duration: CONVEYOR_SPEED
});



timeline.add({
    targets: '#Document',
    translateX: [104, 104],    
    rotateY: [90, 0],    
    easing: 'easeInQuad',
    duration: 500
});
timeline.add({
    targets: '#Document',
    translateX: 104,
    translateY: [0, 120],    
    easing: 'easeInQuad',
    duration: FALL_DURATION
});
timeline.add({
    targets: '#Document',
    translateX: [104, 240],    
    translateY: 120,
    easing: 'linear',
    duration: CONVEYOR_SPEED
});
timeline.add({
    targets: '#LampHighlight',
    opacity: [0, 1],    
    easing: 'linear',
    duration: 500
});
timeline.add({
    targets: '#MeterArrow',
    rotate: [-20, 135],    
    easing: 'linear',
    offset: '-=500',
    duration: 500  
});
animateLines(timeline, '#Sparks>line', 1000, 500);
timeline.add({
    targets: '#LampHighlight',
    opacity: [1, 0],    
    easing: 'linear',
    duration: 500
});
timeline.add({
    targets: '#MeterArrow',
    rotate: [135, -20],    
    easing: 'linear',
    offset: '-=500',
    duration: 500  
});
var path = anime.path('#FallTrajectory');
timeline.add({
    targets: '#Document',
    translateX: path('x'),    
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: CONVEYOR_SPEED
});


function animateLines(timeline, targets, totalDelay, duration) {
    const count = Math.round( totalDelay / duration );
    for(var i = 0; i < count;i++){
        timeline.add({
            targets: targets,
            strokeDashoffset: (i % 2)? [0, anime.setDashoffset] : [anime.setDashoffset, 0],        
            easing: 'linear',
            duration: duration     
        });
    }
}


