(function(){
  var FRAME_PER_TEXT_ADD = 3

  // the level manager
  window.level = function(num){
    var levelConfig = window.STORY.levels[num]
    if(!levelConfig) window.level(1)
    var progress = 0
    var nextStep = function(){
      var stepConfig = levelConfig[progress++]
      if(!stepConfig) return window.level(num + 1)
      if(stepConfig.func) LEVEL_FUNCS[stepConfig.func](num, nextStep)
      else showText(stepConfig.pic, stepConfig.text, nextStep)
    }
    nextStep()
  }

  // show common text dialog
  var $dialog = document.getElementById('dialog')
  var $pic = document.getElementById('pic')
  var $text = document.getElementById('text')
  var $textContent = $text.childNodes[0]
  var showText = function(picName, text, cb){
    $pic.replaceChild(window.preloaded['svg/coody-' + picName + '.svg'], $pic.childNodes[0])
    $dialog.removeAttribute('hidden')
    var ended = false
    var frame = 0
    requestAnimationFrame(function textAdd(){
      if(frame++ % FRAME_PER_TEXT_ADD) {
        requestAnimationFrame(textAdd)
        return
      }
      $textContent.textContent = text.slice(0, frame / FRAME_PER_TEXT_ADD)
      if(frame / FRAME_PER_TEXT_ADD < text.length) requestAnimationFrame(textAdd)
      else ended = true
    })
    $dialog.onclick = function(){
      if(ended) {
        $dialog.onclick = null
        cb()
      } else {
        frame = FRAME_PER_TEXT_ADD * text.length
      }
    }
  }

  // custom level functions
  var LEVEL_FUNCS = {
    cover: function(level, cb){
      cb()
    },
    showMap: function(level, cb){
      cb()
    },
    showBoxiesAndTargets: function(level, cb){
      cb()
    },
    startGame: function(level, cb){
      cb()
    },
    startGamePreview: function(level, cb){
      cb()
    },
    transferPrograms: function(level, cb){
      cb()
    },
  }
})()
