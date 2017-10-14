var ONE_STEP_DURATION = 2000;
var DELAY = 3000;
var SPARK_ANIM_DURATION = 500;
var POPUP_DURATION = 1000;

var timeline = anime.timeline({
    direction: 'forward',
    loop: true
});

var items = document.querySelectorAll('g[id^=Item-]');
var points = [{x: 1, y: 1}, {x: -1,y: 1}, {x: -1,y: -1}, {x: 1,y: -1}];
var offsets = [];
var pathLength = 85;
for(var i = 0; i < 4;i++) {
    offsets.push([]);
    var offset = {x: 0, y: 0};
    for(var j = 0; j < 3;j++){
        var direction = points[(i + j) % 4];
        offset = {x: offset.x + pathLength * direction.x, y: offset.y + pathLength * direction.y}
        offsets[i].push(offset);
    }
    offsets[i].push({x: 0, y: 0});
}

stepAnim(timeline, 0);
stepAnim(timeline, 1);
stepAnim(timeline, 2);
stepAnim(timeline, 3);

function stepAnim(timeline, step) {
    timeline.add({
        targets: items,
        translateX: function(item, i) {
            return offsets[i][step].x;
        },
        translateY: function(item, i) {
            return offsets[i][step].y;        
        },
        easing: 'linear',
        duration: ONE_STEP_DURATION
    });
    var itemIndex = (5 - step ) % 4 + 1;
    var displayItem = '#DisplayItem-' + itemIndex.toString();
    timeline.add({
        targets: displayItem,
        opacity: [0, 1],
        easing: 'easeInQuad',
        duration: POPUP_DURATION
    });
    timeline.add({
        targets: '#PriceTag',
        translateY: [90, 0],
        easing: 'easeOutQuad',
        duration: POPUP_DURATION, 
        offset: '-=' +  POPUP_DURATION
    });
    animateLines(timeline, '#Sparks>line', DELAY, SPARK_ANIM_DURATION); 
    timeline.add({
        targets: '#PriceTag',
        translateY: [0, 90],
        easing: 'easeOutQuad',
        duration: POPUP_DURATION
    });    
    timeline.add({
        targets: displayItem,
        opacity: [1, 0],
        easing: 'easeOutQuad',
        duration: POPUP_DURATION,
        offset: '-=' +  POPUP_DURATION
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

