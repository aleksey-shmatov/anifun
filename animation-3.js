var FALL_DURATION = 2000;
var FLIP_DURATION = 500;
var SLIDERS_DURATION = 500;
var COIN_DELAY = 3000;
var SPARK_ANIM_DURATION = 500;

var timeline = anime.timeline({
    direction: 'forward',
    loop: true
});


timeline.add({
    targets: '#Document',
    rotateY: [90, 0],
    easing: 'linear',
    duration: FLIP_DURATION
});
timeline.add({
    targets: '#Document',
    translateY: 160,
    easing: 'easeInQuad',
    duration: FALL_DURATION
});
timeline.add({
    targets: '#TrailTop line',
    opacity: [0, 1],
    translateY: [-10, 90],
    easing: 'easeInQuad',
    strokeDashoffset: [anime.setDashoffset, 0],            
    offset: '-=' + FALL_DURATION,
    duration: FALL_DURATION
});
timeline.add({
    targets: '#TrailTop line',
    opacity: 0,
    easing: 'easeInQuad',          
    duration: SPARK_ANIM_DURATION
});
animateSliders(timeline);
timeline.add({
    targets: '#Coin',
    translateY: [160, 0],
    easing: 'easeOutQuad',
    offset: '-=300',
    duration: FALL_DURATION
});
timeline.add({
    targets: '#TrailBottom line',
    opacity: [0, 1],
    translateY: [100, 0],
    easing: 'easeOutQuad',
    strokeDashoffset: [anime.setDashoffset, 0],            
    offset: '-=' + FALL_DURATION,
    duration: FALL_DURATION
});
animateLines(timeline, '#Sparks>line', COIN_DELAY, SPARK_ANIM_DURATION);
timeline.add({
    targets: '#TrailBottom line',
    opacity: 0,
    easing: 'easeInQuad', 
    offset: '-=' + COIN_DELAY,         
    duration: SPARK_ANIM_DURATION
});
timeline.add({
    targets: '#Coin',
    rotateY: [0, -90],
    easing: 'linear',
    duration: FLIP_DURATION
});

function animateSliders(timeline){
    var sliders = document.querySelectorAll('rect[id^=Slider-]');
    var offset1 = [220.1, 245.2 , 220.1];
    var offset2 = [245.2, 220.1 , 245.2];    
    timeline.add({
        targets: sliders,
        y: function(x, i) {
            return offset1[i];
        },
        easing: 'linear',
        offset: '-=500',
        duration: SLIDERS_DURATION        
    });
    timeline.add({
        targets: sliders,
        y: function(x, i) {
            return offset2[i];
        },
        easing: 'linear',
        duration: SLIDERS_DURATION        
    });
}


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
