window.STORY = {
  hints: {
    VEJP: 'Jump over a boxie',
    SDBBP: '? ? ?',
    HIBPP: 'Pull a boxie',
    EMMBMP: 'Push two connecting boxies'
  },
  levels: {
    1: [
      { pic: 'smile', text: 'Hi, you must be the new employee here! Welcome to BoxieHub!' },
      { func: 'cover' },
      { pic: 'smile', text: "From today on, I would be your partner. I'm Coody the cute robot!" },
      { func: 'startGamePreview' },
      { pic: 'idea', text: 'Now the map of BoxieHub is here on the screen.' },
      { pic: 'teach', text: 'There would be some boxies on the ground. Our job is to push the box to the correct position.' },
      { pic: 'power', text: 'I am full of power so that I could push any boxie no matter how heavy it is.' },
      { pic: 'smile', text: 'So your job is to watch the map and tell me how to move them.' },
      { func: 'startGame' },
      { pic: 'victory', text: 'Finished! Great job today!' }
    ],
    2: [
      { pic: 'smile', text: 'Day 2! 今天的工作更多了呢……加油吧！' },
      { func: 'startGamePreview' },
      { pic: 'failing', text: '不行了呢……' },
      { pic: 'thinking', text: '我想我应该到箱子的另一边去才行……' },
      { pic: 'idea', text: '对啦！Hasky以前做过一个叫做[VEJP]的程序！' },
      { pic: 'idea', text: '啊，[VEJP]就是Very Exciting Jumping Program的意思啦！把这个程序传输给我，我就可以一下子跳到箱子的对面～' },
      { func: 'transferPrograms' },
      { func: 'startGame' },
      { pic: 'victory', text: '今天的工作顺利完成啦～' }
    ],
    3: [
      { pic: 'smile', text: 'Day 3! 今天也加油吧！' },
      { func: 'startGamePreview' },
      { pic: 'failing', text: '不行啦！有两个箱子连在一起的话是无论如何也推不动的。' },
      { pic: 'thinking', text: '我想想……' },
      { func: 'transferPrograms' },
      { pic: 'failing', text: '诶——不行啦，无论如何都不能用[SDBBP]这个程序的！' },
      { func: 'startGame' },
      { pic: 'sad', text: '……箱子被砸坏了。' },
      { pic: 'awful', text: '[SDBBP]是Super Dark Boxie Breaking Program的意思……好吧，至少我们完成了工作。' }
    ],
    4: [
      { pic: 'sad', text: '昨天被扣工资了……' },
      { pic: 'teach', text: '无论如何不能再用[SDBBP]了，我已经把那个程序设置为拒绝执行的电脑病毒了，你不能再用它了哦。' },
      { func: 'startGamePreview' },
      { pic: 'thinking', text: '……' },
      { pic: 'smile', text: '哈哈，昨天我让Hasky制作了一个叫做[HIBPP]的程序。' },
      { pic: 'victory', text: 'Hyper Intelligent Boxie Pulling Program！' },
      { func: 'transferPrograms' },
      { pic: 'power', text: '有了这个程序我就可以拉动箱子啦！' },
      { func: 'startGame' },
      { pic: 'victory', text: '今天的工作顺利完成啦～' },
      { pic: 'thinking', text: '不过，如果工作更复杂的话，光靠[VEJP]和[HIBPP]还是不够用呢……' }
    ],
    5: [
      { pic: 'smile', text: '今天有个好消息！Hasky开发的新程序[EMMBMP]已经可以用啦！' },
      { pic: 'victory', text: '你猜对啦！就是Extreme Mysterious Magical Boxie Moving Program！' },
      { pic: 'smile', text: '这个程序可以把连在一起的箱子像变魔法一样推动，毫不费力。' },
      { pic: 'power', text: '来试试吧！' },
      { func: 'startGamePreview' },
      { pic: 'sad', text: '我的内存太小了，只能接收两个程序……' },
      { pic: 'teach', text: '所以今天[VEJP]就不能用了哦。' },
      { func: 'transferPrograms' },
      { pic: 'failing', text: '请加油吧！' },
      { func: 'startGame' },
      { pic: 'failing', text: '好累啊，不过一周的工作终于结束了！' },
      { pic: 'victory', text: 'Happy weekend！' }
    ]
  }
}