var OPEN_DURATION = 1000;
var EXPAND_DURATION = 2000;

var timeline = anime.timeline({
    direction: 'alternate',
    loop: true
});

var sourcePoints = document.querySelector('#OpenPath').points;
var targetString = "";
for(var i = 0; i < sourcePoints.length;i++){
    targetString += sourcePoints[i].x + ',' + sourcePoints[i].y + ' ';
}

timeline.add({
    targets: '#ClosedPath',
    points: targetString,
    easing: 'linear',
    duration: OPEN_DURATION
});
animatePath(1);
animatePath(2);
animatePath(3);
animatePath(4);
animatePath(5);
animatePath(6);
animatePath(7);
animatePath(8);
animatePath(9);

timeline.add({
    duration: 1000
});

function animatePath(index) {
    var partId = '#Part-' + index;
    var pathId = partId + ' > path'; 
    var part = document.querySelector(partId);
    var path = anime.path(pathId);

    var item = part.querySelector('g');
    var itemBox = item.getBBox();
    var itemX = -itemBox.x - 0.5 * itemBox.width;
    var itemY = -itemBox.y - 0.5 * itemBox.height;
    var offset = 'translate(' + itemX + 'px, ' + itemY + 'px)';

    part.removeChild(item);
    
    var parent = document.createElementNS('http://www.w3.org/2000/svg', 'g');    
    parent.style.transform = offset;
    parent.appendChild(item);

    part.appendChild(parent);
    
    timeline.add({
        targets: pathId,
        strokeDashoffset: [anime.setDashoffset, 0],        
        easing: 'linear',
        duration: EXPAND_DURATION,
        offset: OPEN_DURATION
    });
    timeline.add({
        targets: item,
        translateX: path('x'), 
        translateY: path('y'),     
        easing: 'linear',
        duration: EXPAND_DURATION,
        offset: OPEN_DURATION    
    });
}



