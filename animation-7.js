var BOX_FALL_DURATION = 2000;
var BOX_NEXT_OFFSET = 250;
var DELAY = 3000;
var SPARK_ANIM_DURATION = 500;

var timeline = anime.timeline({
    direction: "alternate",
    loop: true
});

var boxes = document.querySelectorAll('g[id^=Box-]');
var targets = [];
for(var i = 0; i < boxes.length;i++){
    targets.unshift(boxes[i]);
};

timeline.add({
    targets: targets,
    translateY: [-230, 0],
    easing: 'easeInQuad',
    delay: function(x, i){
        return i * BOX_NEXT_OFFSET;
    },
    duration: BOX_FALL_DURATION
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
