var timeline = anime.timeline({
    direction: "alternate",
    loop: true
});

timeline.add({
    targets: '#PiePiece',
    translateX: 8,
    translateY: -8,
    easing: 'linear',
    offset: 0,
    duration: 3000
});

animateLineChart(timeline);
animateBars(timeline);
animatePieChart3(timeline);
animateSliders(timeline);
animateBubble(timeline);
animateSparks(timeline);

function animateBubble(timeline) {
    var bubble = document.querySelector('#Bubble');
    bubble.style.transform= 'translateY(60px)';
    timeline.add({
        targets: bubble,
        translateY: 0,
        easing: 'linear',
        duration: 1000          
    });   
}

function animateSparks(timeline) {
    var sparks = document.querySelector('#Sparks');
    sparks.style.opacity = 0; 
    timeline.add({
        targets: sparks,
        opacity: 1,
        easing: 'linear',
        duration: 500          
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
        duration: 3000        
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
        duration: 3000
    });
    timeline.add({
        targets: '#LineCircle',
        cx: path('x'),
        cy: path('y'),
        easing: 'linear',
        offset: 0,
        duration: 3000
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
            return i * 1000;
        },
        easing: 'linear',
        offset: 0,
        duration: 1000
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
        opacity: [{value: 1, duration: 500}, {value: 0, duration: 1000}],
        delay: function(x, i){
            return i * 1000;
        },        
        easing: 'linear',
        offset: 0,
        duration: 1000
    });
}

