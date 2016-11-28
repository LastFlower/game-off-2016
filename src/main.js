window.onload = function(){
  var $game = document.getElementById('game')
  function resizer(){
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    var ratio = Math.min(width / 1920, height / 1080)
    $game.style.transform = 'translate(-50%, -50%) scale(' + ratio + ', ' + ratio + ') translateZ(0)'
  }
  window.addEventListener('resize', resizer)
  resizer()

  window.preload(function(){
    document.body.removeChild(document.getElementById('loading'))
    document.getElementById('game-wrapper').removeAttribute('hidden')
    document.getElementById('text-background').appendChild(window.preloaded['svg/bubble.svg'].cloneNode())

    document.getElementById('buttons').onclick = function(e){
      var id = e.target.id
      if(id.slice(0, 4) !== 'btn-') return
      if(window.keyboardEventHandler) window.keyboardEventHandler(id.slice(4))
    }
    document.getElementById('transfer').onclick = function(e){
      var btn = e.target.getAttribute('btn')
      if(!btn) return
      if(window.keyboardEventHandler) window.keyboardEventHandler(btn)
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

    window.level(1)
  })
}
