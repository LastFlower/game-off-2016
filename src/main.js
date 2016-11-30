window.onload = function(){
  window.MOBILE_MODE = (window.ontouchstart !== undefined)

  var $game = document.getElementById('game')
  function resizer(){
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    var ratio = 1
    if(!window.MOBILE_MODE || width >= height) {
      ratio = Math.min(width / 1920, height / 1080)
      $game.style.transform = 'translate(-50%, -50%) scale(' + ratio + ', ' + ratio + ') translateZ(0)'
    } else {
      ratio = Math.min(width / 1080, height / 1920)
      $game.style.transform = 'translate(-50%, -50%) scale(' + ratio + ', ' + ratio + ') rotate(90deg) translateZ(0)'
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

    window.level(1)
  })
}
