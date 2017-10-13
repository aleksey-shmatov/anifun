var CHART_ANIM_DURATION = 1500;
var BUBBLE_POPUP_DURATION = 1000;
var BUBBLE_POPUP_DELAY = 3000;
var SPARK_ANIM_DURATION = 500;

var timeline = anime.timeline({
    direction: 'alternate',
    loop: true
});

timeline.add({
    targets: '#PiePiece',
    translateX: 8,
    translateY: -8,
    easing: 'linear',
    offset: 0,
    duration: CHART_ANIM_DURATION
});

animateLineChart(timeline);
animateBars(timeline);
animatePieChart3(timeline);
animateSliders(timeline);
animateBubble(timeline);

animateLines(timeline, '#Sparks>line', BUBBLE_POPUP_DELAY, SPARK_ANIM_DURATION);

function animateBubble(timeline) {
    timeline.add({
        targets: '#Bubble',
        translateY: [60, 0],
        easing: 'linear',
        duration: BUBBLE_POPUP_DURATION          
    });   
}

function animateSliders(timeline) {
    var sliders = document.querySelectorAll('rect[id^=Slider-]');
    var offset = [97.5, 74.5 , 97.5];
    timeline.add({
        targets: sliders,
        x: function(x, i) {
            return offset[i];
        },
        easing: 'linear',
        offset: 0,
        duration: CHART_ANIM_DURATION        
    });
}

function animateLineChart(timeline) {
    var path = anime.path('#CircleTrack');        
    timeline.add({
        targets: 'line#Line',
        x1: path('x'),
        x2: path('x'),
        easing: 'linear',
        offset: 0,
        duration: CHART_ANIM_DURATION
    });
    timeline.add({
        targets: '#LineCircle',
        cx: path('x'),
        cy: path('y'),
        easing: 'linear',
        offset: 0,
        duration: CHART_ANIM_DURATION
    });
}

function animateBars(timeline){
    var bars = document.querySelectorAll('rect[id^=Bar-]');
    var values = [];
    for(var i = 0; i < bars.length;i++){
        var bar = bars[i];
        values.push({y: bar.y.baseVal.value, height: bar.height.baseVal.value});
    }
    bars.forEach(function(bar, i) {
        bar.setAttribute('height', 0);
        bar.setAttribute('y', values[i].y + values[i].height);
    });
    timeline.add({
        targets: bars,
        height: function(x, i) {
            return values[i].height;
        },
        y: function(x, i) {
            return values[i].y;        
        },
        delay: function(x, i){
            return i * CHART_ANIM_DURATION / 3;
        },
        easing: 'linear',
        offset: 0,
        duration: CHART_ANIM_DURATION / 3
    });
}

function animatePieChart3(timeline) {
    var highlights = document.querySelectorAll('path[id^=Highlight-]');
    for(var i = 0; i < highlights.length;i++){
        var highlight = highlights[i];
        highlight.style.opacity = 0;
    }
    timeline.add({
        targets: highlights,
        opacity: [{value: 1, duration: 250}, {value: 0, duration: 500}],
        delay: function(x, i){
            return i * CHART_ANIM_DURATION / 3;
        },        
        easing: 'linear',
        offset: 0,
        duration: CHART_ANIM_DURATION / 3
    });
}

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

