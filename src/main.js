window.onload = function(){
  window.MOBILE_MODE = (window.ontouchstart !== undefined)

  var $game = document.getElementById('game')
  function resizer(){
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    var ratio = 1
    if(!window.MOBILE_MODE || width >= height) {
      ratio = Math.min(width / 1920, height / 1080)
      if(window.MOBILE_MODE) ratio *= 1.15
      $game.style.transform = 'translate(-50%, -50%) scale(' + ratio + ', ' + ratio + ') translateZ(0)'
      window.ROTATED = false
    } else {
      ratio = Math.min(width / 1080, height / 1920)
      if(window.MOBILE_MODE) ratio *= 1.15
      $game.style.transform = 'translate(-50%, -50%) scale(' + ratio + ', ' + ratio + ') rotate(90deg) translateZ(0)'
      window.ROTATED = true
    }
  }
  window.addEventListener('resize', resizer)
  resizer()

  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "Game progress would not be saved!";
    e.returnValue = confirmationMessage
    return confirmationMessage
  });

  window.preload(function(){
    document.body.removeChild(document.getElementById('loading'))
    document.getElementById('game-wrapper').removeAttribute('hidden')
    document.getElementById('text-background').appendChild(window.preloaded['svg/bubble.svg'].cloneNode())

    document.getElementById('buttons').onclick = function(e){
      var id = e.target.id
      if(id.slice(0, 4) !== 'btn-') return
      if(e.target.classList.contains('button-disabled')) return
      if(window.keyboardEventHandler) window.keyboardEventHandler(id.slice(4))
    }
    document.getElementById('transfer').onclick = function(e){
      var btn = e.target.getAttribute('btn')
      if(!btn) return
      if(window.keyboardEventHandler) window.keyboardEventHandler(btn)
    }
    var $transferHint = document.getElementById('transfer-hint')
    var onmouseenter = function(e){
      $transferHint.innerHTML = window.STORY.hints[this.id]
    }
    var onmouseleave = function(e){
      $transferHint.innerHTML = ''
    }
    var $transferList = document.getElementById('transfer-list')
    for(var i=0; i<$transferList.childNodes.length; i++){
      if($transferList.childNodes[i] instanceof window.HTMLElement) {
        $transferList.childNodes[i].onmouseenter = onmouseenter
        $transferList.childNodes[i].onmouseleave = onmouseleave
      } else {
        $transferList.removeChild($transferList.childNodes[i--])
      }
    }

    window.addEventListener('keyup', function(e){
      var KEY_CODE_MAP = {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right',
        87: 'up',
        83: 'down',
        65: 'left',
        68: 'right',
        82: 'reverse',
        76: 'level-reset',
        32: 'space',
        13: 'space',
        49: 'f1',
        50: 'f2',
        51: 'f3',
        52: 'f4'
      }
      var keyName = KEY_CODE_MAP[e.keyCode]
      if(keyName && window.keyboardEventHandler) window.keyboardEventHandler(keyName)
    })

    if(window.MOBILE_MODE) {
      var touchstartX = 0
      var touchstartY = 0
      document.getElementById('game-wrapper').addEventListener('touchstart', function(e){
        if(e.touches.length > 1) return
        touchstartX = e.touches[0].pageX
        touchstartY = e.touches[0].pageY
      })
      document.getElementById('game-wrapper').addEventListener('touchmove', function(e){
        if(e.touches.length > 1 || !touchstartX) return
        e.preventDefault()
        var dx = e.touches[0].pageX - touchstartX
        var dy = e.touches[0].pageY - touchstartY
        var ev = ''
        if(Math.abs(dx) > Math.abs(dy)) {
          if(dx > 30) ev = 'right'
          if(dx < -30) ev = 'left'
        } else {
          if(dy > 30) ev = 'down'
          if(dy < -30) ev = 'up'
        }
        if(window.ROTATED && ev) {
          ev = ({
            left: 'down',
            up: 'left',
            right: 'up',
            down: 'right'
          })[ev]
        }
        if(ev) {
          if(window.keyboardEventHandler) window.keyboardEventHandler(ev)
          touchstartX = 0
        }
      })
    }

    window.level(1)
  })
}
