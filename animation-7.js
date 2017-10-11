var timeline = anime.timeline({
    direction: "alternate",
    loop: true
});

var boxes = document.querySelectorAll('g[id^=Box-]');
var targets = [];
for(var i = 0; i < boxes.length;i++){
    var box = boxes[i];
    box.style.transform = 'translateY(-230px)';
    targets.unshift(box);
};

timeline.add({
    targets: targets,
    translateY: 0,
    easing: 'easeInQuad',
    delay: function(x, i){
        return i * 250;
    },
    duration: 2000
});

timeline.add({
    targets: '#Sparks>line',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',    
    duration: 500,    
});