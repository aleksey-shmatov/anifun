var FLIP_DURATION = 1500;
var HAND_POPUP_DURATION = 1000;
var HIGHLIGHT_DELAY = 1500;
var SPARK_ANIM_DURATION = 500;

var timeline = anime.timeline({
    direction: 'alternate',
    loop: true
});


var topPart = document.querySelector('#TopPart30');
topPart.style.transformOrigin = '157.8px 138.4px'; 

timeline.add({
    targets: topPart,
    rotateX: 90,
    easing: 'linear',
    duration: FLIP_DURATION 
});

var bottomPart = document.querySelector('#BottomPart01');
bottomPart.style.transformOrigin = '157.8px 138.4px'; 

timeline.add({
    targets: bottomPart,
    rotateX: [-90, 0],
    easing: 'linear',
    duration: FLIP_DURATION 
});


timeline.add({
    targets: '#Hand',
    translateX: [-100, 0],
    easing: 'easeInQuad',
    duration: HAND_POPUP_DURATION
});
animateLines(timeline, '#Sparks>line', HIGHLIGHT_DELAY, SPARK_ANIM_DURATION);

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

