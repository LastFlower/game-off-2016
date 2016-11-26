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
    document.getElementById('text-background').appendChild(window.preloaded['svg/bubble.svg'].cloneNode())

    window.level(1)
  })
}
