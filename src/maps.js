var MAPS = '\
=\
\\       x        \\\
\\       -        \\\
\\       -        \\\
\\       oo---x   \\\
\\   x---o#       \\\
\\        -       \\\
\\        -       \\\
\\        c       \\\
=\
\\       x        \\\
\\       -        \\\
\\       -        \\\
\\       oo---x   \\\
\\   x--o-#       \\\
\\        o       \\\
\\        -       \\\
\\        x       \\\
=\
\\       x        \\\
\\       -        \\\
\\       -        \\\
\\       o-o--x   \\\
\\    x--o#       \\\
\\        o       \\\
\\        -       \\\
\\        x       \\\
=\
\\       x        \\\
\\       -        \\\
\\       -        \\\
\\       o----x   \\\
\\    x--o#       \\\
\\        o       \\\
\\        -       \\\
\\        x       \\\
=\
\\       x        \\\
\\       -        \\\
\\       -        \\\
\\       -----x   \\\
\\    x--o#       \\\
\\        o       \\\
\\        -       \\\
\\        x       \\\
';

(function(){
  var SVG_NS = 'http://www.w3.org/2000/svg'

  var processedMaps = []
  MAPS.split('=').forEach(function(str, i){
    var lines = str.match(/\\.+?\\/g)
    if(!lines) return processedMaps[i] = null
    var levelMap = processedMaps[i] = []
    lines.forEach(function(line){
      levelMap.push(line.slice(1, -1))
    })
  })

  var $control = document.getElementById('control')
  var $mapBoxies = document.getElementById('map-boxies')
  window.showMap = function(level){

    // clone map
    var map = []
    processedMaps[level].forEach(function(line){
      map.push(line)
    })

    // init map svg
    var $map = document.createElementNS(SVG_NS, 'svg')
    $map.width = 1600
    $map.height = 800
    $map.setAttribute('class', 'map')
    var r = 0, c = 0
    for(r=0; r<8; r++) {
      for(c=0; c<16; c++) {
        var char = map[r][c]
        var $cell = null
        if(char === '-' || char === 'o' || char === 'c' || char === '#') {
          $cell = document.createElementNS(SVG_NS, 'rect')
          $cell.setAttribute('style', 'fill:rgb(248,248,248);stroke-width:0')
        } else if(char === 'x' || char === '*') {
          $cell = document.createElementNS(SVG_NS, 'g')
          var $back = document.createElementNS(SVG_NS, 'rect')
          $back.setAttribute('width', 100)
          $back.setAttribute('height', 100)
          $back.setAttribute('style', 'fill:rgb(248,248,248);stroke-width:0')
          var $p1 = document.createElementNS(SVG_NS, 'path')
          $p1.setAttribute('d', 'M 20 20 L 80 80')
          $p1.setAttribute('stroke', 'rgb(255,128,128)')
          $p1.setAttribute('stroke-width', '10')
          var $p2 = document.createElementNS(SVG_NS, 'path')
          $p2.setAttribute('d', 'M 20 80 L 80 20')
          $p2.setAttribute('stroke', 'rgb(255,128,128)')
          $p2.setAttribute('stroke-width', '10')
          $cell.appendChild($back)
          $cell.appendChild($p1)
          $cell.appendChild($p2)
          $cell.setAttribute('transform', 'translate(' + c*100 + ',' + r*100 + ')')
        } else {
          $cell = document.createElementNS(SVG_NS, 'rect')
          $cell.setAttribute('style', 'fill:rgb(32,32,32);stroke-width:0')
        }
        $cell.setAttribute('x', c * 100)
        $cell.setAttribute('y', r * 100)
        $cell.setAttribute('width', 100)
        $cell.setAttribute('height', 100)
        $map.appendChild($cell)
      }
    }
    $control.replaceChild($map, $control.childNodes[0])

    // history tracker
    var history = []

    // init map boxie images
    var coodyPos = null
    var updateBoxies = function(map, coodyHead){
      history.push(map.join('\n'))
      var ended = true
      while($mapBoxies.childNodes.length) {
        $mapBoxies.removeChild($mapBoxies.childNodes[0])
      }
      for(r=0; r<8; r++) {
        for(c=0; c<16; c++) {
          var boxieImg = null
          if(map[r][c] === 'o') {
            ended = false
            boxieImg = window.preloaded['svg/boxie.svg'].cloneNode()
          } else if(map[r][c] === 'c') {
            boxieImg = window.preloaded['svg/boxie-green.svg'].cloneNode()
          } else if(map[r][c] === '#' || map[r][c] === '*') {
            coodyPos = {
              x: c,
              y: r
            }
            boxieImg = window.preloaded['svg/coody-' + (coodyHead || 'smile') + '-head.svg']
          }
          if(!boxieImg) continue
          boxieImg.style.transform = 'translate(' + c*100 + 'px,' + r*100 + 'px)'
          $mapBoxies.appendChild(boxieImg)
        }
      }
      if(ended) {
        window.keyboardEventHandler = null
        window.mapEndedCb()
      }
    }
    var updateMap = function(map, x, y, char){
      map[y] = map[y].slice(0, x) + char + map[y].slice(x+1)
    }

    // show and wait user events
    $control.removeAttribute('hidden')
    var moveCoody = {
      walk: function(x1, y1, x2, y2){
        if(map[y1][x1] === '*') updateMap(map, x1, y1, 'x')
        else updateMap(map, x1, y1, '-')
        if(map[y2][x2] === 'x') updateMap(map, x2, y2, '*')
        else updateMap(map, x2, y2, '#')
      },
      push: function(x1, y1, x2, y2, x3, y3){
        if(map[y1][x1] === '*') updateMap(map, x1, y1, 'x')
        else updateMap(map, x1, y1, '-')
        if(map[y2][x2] === 'c') updateMap(map, x2, y2, '*')
        else updateMap(map, x2, y2, '#')
        if(map[y3][x3] === 'x') updateMap(map, x3, y3, 'c')
        else updateMap(map, x3, y3, 'o')
      },
      testMove: function(dx, dy){
        var newPosType = map[coodyPos.y + dy] && map[coodyPos.y + dy][coodyPos.x + dx]
        if(newPosType === '-' || newPosType === 'x') {
          moveCoody.walk(coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy)
          updateBoxies(map, 'smile')
        } else if(newPosType === 'o' || newPosType === 'c') {
          var newPosType2 = map[coodyPos.y + dy + dy] && map[coodyPos.y + dy + dy][coodyPos.x + dx + dx]
          if(newPosType2 === '-' || newPosType2 === 'x') {
            moveCoody.push(coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy, coodyPos.x + dx + dx, coodyPos.y + dy + dy)
            updateBoxies(map, 'power')
          } else return
        } else return
      }
    }
    var userEventHandler = {
      up: function(){
        moveCoody.testMove(0, -1)
      },
      down: function(){
        moveCoody.testMove(0, 1)
      },
      left: function(){
        moveCoody.testMove(-1, 0)
      },
      right: function(){
        moveCoody.testMove(1, 0)
      },
      reverse: function(){
        if(history.length <= 1) return
        history.pop()
        map = history.pop().split('\n')
        updateBoxies(map, 'failing')
      },
      f1: function(){},
      f2: function(){},
    }
    window.keyboardEventHandler = function(keyName){
      if(userEventHandler[keyName]) userEventHandler[keyName]()
    }
    updateBoxies(map)
  }
  window.hideMap = function(){
    $control.setAttribute('hidden', '')
  }
  window.hideMap()
})()
