(function(){
  var FRAME_PER_TEXT_ADD = 2

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

  // play audio by pic
  var playAudioByPic = function(pic){
    var PIC_AUDIO_MAP = {
      awful: '65',
      failing: '65',
      idea: '13',
      power: '13',
      sad: '65',
      smile: '13',
      teach: '12',
      thinking: '12',
      victory: '35'
    }
    var $audio = document.getElementById('audio-' + PIC_AUDIO_MAP[pic])
    $audio.currentTime = 0
    $audio.play()
  }

  // show common text dialog
  var $dialog = document.getElementById('dialog')
  var $pic = document.getElementById('pic')
  var $text = document.getElementById('text')
  var $textContent = $text.childNodes[0]
  var showText = function(picName, text, cb){
    playAudioByPic(picName)
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
        if(window.MOBILE_MODE) {
          if(document.body.requestFullScreen) {
            document.body.requestFullScreen()
          }
        }
      }
    },
    startGamePreview: function(level, cb){
      $dialog.setAttribute('hidden', '')
      window.showMap(level)
      currentGameKeyHandler = window.keyboardEventHandler
      window.keyboardEventHandler = $control.onclick = function(){
        window.keyboardEventHandler = $control.onclick = null
        cb()
      }
    },
    startGame: function(level, cb){
      $dialog.setAttribute('hidden', '')
      window.keyboardEventHandler = currentGameKeyHandler
      $control.onclick = null
      window.mapEndedCb = cb
    },
    transferPrograms: function(level, cb){
      $dialog.setAttribute('hidden', '')
      var $transferList = document.getElementById('transfer-list')
      for(var i=0; i<4; i++) {
        if(i + 2 <= level) $transferList.childNodes[i].removeAttribute('hidden')
        else $transferList.childNodes[i].setAttribute('hidden', '')
      }
      if(level >= 4) $transferList.childNodes[1].classList.toggle('transfer-item-disabled', true)
      if(level >= 5) $transferList.childNodes[0].classList.toggle('transfer-item-disabled', true)
      var $transfer = document.getElementById('transfer')
      $transfer.removeAttribute('hidden')
      var needSelect = (level === 2 ? 1 : 2)
      var selected = 0
      window.keyboardEventHandler = function(keyName){
        if(keyName[0] !== 'f') return
        var sel = keyName[1] - 1
        if($transferList.childNodes[sel].classList.contains('transfer-item-disabled')) return
        if($transferList.childNodes[sel].getAttribute('hidden') === '') return
        window.setMapF(++selected, $transferList.childNodes[sel].id)
        if(selected === needSelect) {
          $transfer.setAttribute('hidden', '')
          cb()
        }
      }
    }
  }
})()
