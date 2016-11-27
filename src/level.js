(function(){
  var FRAME_PER_TEXT_ADD = 3

  // the level manager
  window.level = function(num){
    var levelConfig = window.STORY.levels[num]
    if(!levelConfig) return window.level(1)
    var progress = 0
    var nextStep = function(){
      var stepConfig = levelConfig[progress++]
      if(!stepConfig) {
        window.hideMap()
        $dialog.setAttribute('hidden', '')
        setTimeout(function(){
          window.level(num + 1)
        }, 1000)
        return
      }
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
    window.keyboardEventHandler = $dialog.onclick = function(keyName){
      if(typeof(keyName) === 'string' && keyName !== 'space') return
      if(ended) {
        window.keyboardEventHandler = $dialog.onclick = null
        cb()
      } else {
        frame = FRAME_PER_TEXT_ADD * text.length
      }
    }
  }

  // custom level functions
  var $control = document.getElementById('control')
  var currentGameKeyHandler = null
  var LEVEL_FUNCS = {
    cover: function(level, cb){
      var $cover = document.getElementById('cover')
      $cover.removeAttribute('hidden')
      var $coverStart = document.getElementById('cover-start')
      window.keyboardEventHandler = $coverStart.onclick = function(keyName){
        if(typeof(keyName) === 'string' && keyName !== 'space') return
        $cover.setAttribute('hidden', '')
        $coverStart.innerHTML = 'Replay &gt;&gt;'
        window.keyboardEventHandler = $coverStart.onclick = null
        cb()
      }
    },
    startGamePreview: function(level, cb){
      $dialog.setAttribute('hidden', '')
      window.showMap(level)
      currentGameKeyHandler = window.keyboardEventHandler
      window.keyboardEventHandler = $control.onclick = cb
    },
    startGame: function(level, cb){
      $dialog.setAttribute('hidden', '')
      window.keyboardEventHandler = currentGameKeyHandler
      $control.onclick = null
      window.mapEndedCb = cb
    },
    transferPrograms: function(level, cb){
      $dialog.setAttribute('hidden', '')
      cb()
    },
  }
})()
