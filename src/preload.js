window.preload = function(cb){
  var RESOURCES = [
    'svg/boxie.svg',
    'svg/bubble.svg',
    'svg/coody-awful.svg',
    'svg/coody-failing.svg',
    'svg/coody-idea.svg',
    'svg/coody-power.svg',
    'svg/coody-sad.svg',
    'svg/coody-smile.svg',
    'svg/coody-teach.svg',
    'svg/coody-thinking.svg',
    'svg/coody-victory.svg',
  ]

  var preloaded = window.preloaded = {}
  var pendingCount = RESOURCES.length
  var pendingEnd = function(){
    if(--pendingCount) return
    cb()
  }

  RESOURCES.forEach(function(itemName){
    if(/\.svg$/.test(itemName)) {
      var $img = document.createElement('img')
      $img.onload = $img.onerror = function(){
        preloaded[itemName] = $img
        pendingEnd()
      }
      $img.src = 'src/' + itemName
    }
  })
}