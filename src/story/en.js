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
      { pic: 'teach', text: 'There would be some boxies on the ground. Our job is to push the boxie to the correct position.' },
      { pic: 'power', text: 'I am fully charged so that I could push any boxie no matter how heavy it is.' },
      { pic: 'smile', text: 'So your job is to watch the map and tell me how to move them.' },
      { func: 'startGame' },
      { pic: 'victory', text: 'Finished! Good job today!' }
    ],
    2: [
      { pic: 'smile', text: 'Day 2! More boxies today!' },
      { func: 'startGamePreview' },
      { pic: 'failing', text: 'No, stop!' },
      { pic: 'thinking', text: 'I think I should go to the other side of this boxie.' },
      { pic: 'idea', text: 'Oh yes! Hasky the engineer have ever written a program called [VEJP] for me!' },
      { pic: 'idea', text: '[VEJP] means [Very Exciting Jumping Program]! Please transfer this program to me and then I could jump over this boxie!' },
      { func: 'transferPrograms' },
      { func: 'startGame' },
      { pic: 'victory', text: 'Done! Great job!' }
    ],
    3: [
      { pic: 'smile', text: 'Day 3! Even more boxies!' },
      { func: 'startGamePreview' },
      { pic: 'failing', text: 'No no! I cannot push two connected boxies!' },
      { pic: 'thinking', text: 'Let me think...' },
      { func: 'transferPrograms' },
      { pic: 'failing', text: "That's not right! You should not use the [SDBBP] in any case!" },
      { func: 'startGame' },
      { pic: 'sad', text: 'Boxies are broken...' },
      { pic: 'awful', text: '[SDBBP] refers to [Super Dark Boxie Breaking Program]. OK, we have done the job.' }
    ],
    4: [
      { pic: 'sad', text: 'The cost of broken boxies was deducted from our wages yesterday.' },
      { pic: 'teach', text: 'I have set [SDBBP] to a computer virus and refuse to receive it automatically. You cannot use it now.' },
      { func: 'startGamePreview' },
      { pic: 'thinking', text: '...' },
      { pic: 'smile', text: 'Haha! Yesterday I asked Hasky to build a program called [HIBPP]!' },
      { pic: 'victory', text: '[Hyper Intelligent Boxie Pulling Program]!' },
      { func: 'transferPrograms' },
      { pic: 'power', text: 'I could pull boxies with this program!' },
      { func: 'startGame' },
      { pic: 'victory', text: 'We made it today!' },
      { pic: 'thinking', text: 'But it seems special programs [VEJP] and [HIBPP] are not enough for more complex jobs...' }
    ],
    5: [
      { pic: 'smile', text: 'Good news! Hasky developed [EMMBMP] and it is usable now!' },
      { pic: 'victory', text: 'Yes! That means [Extreme Mysterious Magical Boxie Moving Program]!' },
      { pic: 'smile', text: 'This program could magically move two connected boxies!' },
      { pic: 'power', text: "Let's have a try!" },
      { func: 'startGamePreview' },
      { pic: 'sad', text: 'My memory is too small. I could only store two special programs at a time.' },
      { pic: 'teach', text: 'We would not use [VEJP] today.' },
      { func: 'transferPrograms' },
      { pic: 'failing', text: 'So many boxies! It is a challenge!' },
      { func: 'startGame' },
      { pic: 'failing', text: 'Tired, but we have done a great job this week!' },
      { pic: 'victory', text: 'Happy weekend！' }
    ]
  }
}