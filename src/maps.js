var MAPS = '\
=\
\\   --#-o----x   \\\
\\   -   --   -   \\\
\\    x-o- ---    \\\
\\   - ---o-- -   \\\
\\   -- ---x --   \\\
\\   --- -- ---   \\\
\\   ----  ----   \\\
\\   ----------   \\\
=\
\\   -----o#--x   \\\
\\   -   --   -   \\\
\\    x--- x--    \\\
\\   - -oo--- -   \\\
\\   -- -o-x --   \\\
\\   --- -- ---   \\\
\\   ----  ----   \\\
\\   ----------   \\\
=\
\\   x---oo#--x   \\\
\\   -   --   -   \\\
\\    ---x -o-    \\\
\\   - -xo--x -   \\\
\\   -- -oox --   \\\
\\   --- -- ---   \\\
\\   ----  ----   \\\
\\   ----------   \\\
=\
\\   x---oo#--x   \\\
\\   -   --   -   \\\
\\    ---x -o-    \\\
\\   - -xo--x -   \\\
\\   -- -oox --   \\\
\\   --x -- ---   \\\
\\   ---o- x-x-   \\\
\\   ----oo----   \\\
=\
\\   x-o-oo#-x-   \\\
\\   -   --   -   \\\
\\    x-xx oox    \\\
\\   - -oox-- -   \\\
\\   -- oo-- --   \\\
\\   x-x -x ---   \\\
\\   ----x ----   \\\
\\   -- -oo- --   \\\
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
  var $f1 = document.getElementById('btn-f1')
  var $f2 = document.getElementById('btn-f2')
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
        $cell.setAttribute('pos-row', r)
        $cell.setAttribute('pos-col', c)
        $map.appendChild($cell)
      }
    }
    $map.onclick = function(e){
      console.info(e.target)
      if(!e.target.getAttribute('pos-row')) return
      var r = Number(e.target.getAttribute('pos-row'))
      var c = Number(e.target.getAttribute('pos-col'))
      if(r === coodyPos.y) {
        var dx = c - coodyPos.x
        if(dx < 0 && dx >= -2) moveCoody.test(-1, 0)
        else if(dx > 0 && dx <= 2) moveCoody.test(1, 0)
      } else if(c === coodyPos.x) {
        var dy = r - coodyPos.y
        if(dy < 0 && dy >= -2) moveCoody.test(0, -1)
        else if(dy > 0 && dy <= 2) moveCoody.test(0, 1)
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
        setTimeout(window.mapEndedCb, 1000)
      }
    }
    var updateMap = function(map, x, y, char){
      map[y] = map[y].slice(0, x) + char + map[y].slice(x+1)
    }

    // play audio by move type
    var playAudioByMove = function(moveType){
      var MOVE_AUDIO_MAP = {
        reverse: '65',
        walk: '13',
        push: '12',
        skill: '35',
        breaking: 'breaking'
      }
      var $audio = document.getElementById('audio-' + MOVE_AUDIO_MAP[moveType])
      $audio.currentTime = 0
      $audio.play()
    }

    // F1 and F2
    var usingF1 = false
    var usingF2 = false
    $f1.classList.toggle('button-active', false)
    $f2.classList.toggle('button-active', false)
    $f1.classList.toggle('button-disabled', true)
    $f2.classList.toggle('button-disabled', true)

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
        if(x3 !== undefined) {
          if(map[y3][x3] === 'x') updateMap(map, x3, y3, 'c')
          else updateMap(map, x3, y3, 'o')
        }
      },
      pull: function(x1, y1, x2, y2, x3, y3){
        if(map[y1][x1] === 'x') updateMap(map, x1, y1, '*')
        else updateMap(map, x1, y1, '#')
        if(map[y2][x2] === '*') updateMap(map, x2, y2, 'c')
        else updateMap(map, x2, y2, 'o')
        if(map[y3][x3] === 'c') updateMap(map, x3, y3, 'x')
        else updateMap(map, x3, y3, '-')
      },
      testMove: function(dx, dy){
        var newPosType = map[coodyPos.y + dy] && map[coodyPos.y + dy][coodyPos.x + dx]
        if(newPosType === '-' || newPosType === 'x') {
          moveCoody.walk(coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy)
          updateBoxies(map, 'smile')
          playAudioByMove('walk')
        } else if(newPosType === 'o' || newPosType === 'c') {
          var newPosType2 = map[coodyPos.y + dy + dy] && map[coodyPos.y + dy + dy][coodyPos.x + dx + dx]
          if(newPosType2 === '-' || newPosType2 === 'x') {
            moveCoody.push(coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy, coodyPos.x + dx + dx, coodyPos.y + dy + dy)
            updateBoxies(map, 'power')
            playAudioByMove('push')
          } else return false
        } else return false
        return true
      },
      VEJP: function(dx, dy){
        var newPosType = map[coodyPos.y + dy] && map[coodyPos.y + dy][coodyPos.x + dx]
        if(newPosType === 'o' || newPosType === 'c') {
          var newPosType2 = map[coodyPos.y + dy + dy] && map[coodyPos.y + dy + dy][coodyPos.x + dx + dx]
          if(newPosType2 === '-' || newPosType2 === 'x') {
            moveCoody.walk(coodyPos.x, coodyPos.y, coodyPos.x + dx + dx, coodyPos.y + dy + dy)
            updateBoxies(map, 'smile')
            playAudioByMove('skill')
          } else return false
        } else return false
        return true
      },
      SDBBP: function(dx, dy){
        var newPosType = map[coodyPos.y + dy] && map[coodyPos.y + dy][coodyPos.x + dx]
        if(newPosType === 'o' || newPosType === 'c') {
          moveCoody.push(coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy)
          updateBoxies(map, 'failing')
          playAudioByMove('breaking')
        } else return false
        return true
      },
      HIBPP: function(dx, dy){
        dx = -dx
        dy = -dy
        var newPosType = map[coodyPos.y + dy] && map[coodyPos.y + dy][coodyPos.x + dx]
        if(newPosType === 'o' || newPosType === 'c') {
          var newPosType2 = map[coodyPos.y - dy] && map[coodyPos.y - dy][coodyPos.x - dx]
          if(newPosType2 === '-' || newPosType2 === 'x') {
            moveCoody.pull(coodyPos.x - dx, coodyPos.y - dy, coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy)
            updateBoxies(map, 'power')
            playAudioByMove('skill')
          } else return false
        } else return false
        return true
      },
      EMMBMP: function(dx, dy){
        var newPosType = map[coodyPos.y + dy] && map[coodyPos.y + dy][coodyPos.x + dx]
        if(newPosType === 'o' || newPosType === 'c') {
          var newPosType2 = map[coodyPos.y + dy * 2] && map[coodyPos.y + dy * 2][coodyPos.x + dx * 2]
          if(newPosType2 === 'o' || newPosType2 === 'c') {
            var newPosType3 = map[coodyPos.y + dy * 3] && map[coodyPos.y + dy * 3][coodyPos.x + dx * 3]
            if(newPosType3 === '-' || newPosType3 === 'x') {
              moveCoody.push(coodyPos.x, coodyPos.y, coodyPos.x + dx, coodyPos.y + dy, coodyPos.x + dx * 3, coodyPos.y + dy * 3)
              updateBoxies(map, 'power')
              playAudioByMove('skill')
            } else return false
          } else return false
        } else return false
        return true
      },
      test: function(dx, dy){
        var method = 'testMove'
        if(usingF1) method = $f1.innerHTML.match(/\[(.*?)\]/)[1]
        else if(usingF2) method = $f2.innerHTML.match(/\[(.*?)\]/)[1]
        if(moveCoody[method](dx, dy)) {
          usingF1 = false
          usingF2 = false
          $f1.classList.toggle('button-active', usingF1)
          $f2.classList.toggle('button-active', usingF2)
        }
      }
    }
    var userEventHandler = {
      up: function(){
        moveCoody.test(0, -1)
      },
      down: function(){
        moveCoody.test(0, 1)
      },
      left: function(){
        moveCoody.test(-1, 0)
      },
      right: function(){
        moveCoody.test(1, 0)
      },
      reverse: function(){
        if(history.length <= 1) return
        history.pop()
        map = history.pop().split('\n')
        updateBoxies(map, 'failing')
        playAudioByMove('reverse')
      },
      'level-reset': function(){
        while(history.length > 1) history.pop()
        map = history.pop().split('\n')
        updateBoxies(map, 'failing')
        playAudioByMove('reverse')
      },
      f1: function(){
        if($f1.classList.contains('button-disabled')) return
        usingF1 = !usingF1
        usingF2 = false
        $f1.classList.toggle('button-active', usingF1)
        $f2.classList.toggle('button-active', usingF2)
      },
      f2: function(){
        if($f2.classList.contains('button-disabled')) return
        usingF1 = false
        usingF2 = !usingF2
        $f1.classList.toggle('button-active', usingF1)
        $f2.classList.toggle('button-active', usingF2)
      }
    }
    window.keyboardEventHandler = function(keyName){
      if(userEventHandler[keyName]) userEventHandler[keyName]()
    }
    updateBoxies(map)
  }
  window.setMapF = function(which, name){
    var $f = $f1
    if(which === 2) $f = $f2
    $f.classList.toggle('button-disabled', false)
    $f.innerHTML = which + ' [' + name + ']'
  }
  window.hideMap = function(){
    $control.setAttribute('hidden', '')
  }
  window.hideMap()
})()
