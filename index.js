document.addEventListener('DOMContentLoaded', () => {
  const times = [
    { start: 0, duration: 15, title: 'Exercise' },
    { start: 25, duration: 30, title: 'Travel to work' },
    { start: 30, duration: 30, title: 'Plan day' },
    { start: 60, duration: 15, title: "Review yesterda'ys commits" },
    { start: 100, duration: 15, title: 'Code review' },
    { start: 180, duration: 90, title: 'Have lunch with John' },
    { start: 360, duration: 30, title: 'Skype call' },
    { start: 370, duration: 45, title: 'Follow up with designer' },
    { start: 405, duration: 30, title: 'Push up brunch' },
  ];

  const cElem = (tag, cName, text) => {
    const elem = document.createElement(tag);
    elem.className = cName || '';
    elem.textContent = text || '';
    return elem;
  };
  const gElem = (param) => {
    const elem = document.querySelector(param);
    elem.clear = function () {
      this.innerHTML = '';
      return this;
    };
    elem.add = function (listOfElems) {
      this.append(...listOfElems);
      return this;
    };
    return elem;
  };
  const timesContainer = gElem('.times__container');
  const render__times = gElem('.render__times');

  const renderTime = (start, end, time) => {
    for (let i = 0; i <= time; i++) {
      let time;
      if (i < 6) {
        time = i + start;
      } else {
        time = i - end;
      }
      const currentTime = cElem('div', 'whole__time', `${time}:00`);
      const halfAnHour = cElem('div', 'half__hour', `${time}:30`);
      render__times.append(currentTime);
      if (time == 5) {
        return;
      }
      render__times.append(halfAnHour);
    }
  };
  const timesTemplate = (time) => {
    const current__time = cElem('div', 'current__time');
    const current__item = cElem('div', 'current__item');
    const current__text = cElem('div', 'current__text', `${time.title}`);
    const container = cElem('div', 'current__times');
    const close__time = cElem('div', 'close__time', `x`);
    container.style.height = `${time.duration * 2}px`;
    current__item.append(current__text, close__time);
    container.append(current__time, current__item);
    container.style.top = `${time.start * 2}px`;

    // const template = `
    //   <div class="current__time"></div>
    //   <div class="current__item" style="height: ${time.duration * 2}px">
    //     <div class="current__text">${time.title}</div>
    //     <div class="close__time">
    //       &times;
    //     </div>
    //   </div>
    // `;
    // container.innerHTML = template;
    return container;
  };
  const renderTimes = (arr) => {
    const renderResult = arr.map((item) => timesTemplate(item));
    timesContainer.clear().add(renderResult);
    renderTime(8, 5, 10);
  };
  renderTimes(times);
});

// const deleteEvent = (e) => {
//   const target = e.target
//   if(target.className == 'close__time') {
//     target.closest('.current__times').remove()
//   }
// }

// document.querySelector('.times__container').addEventListener('click',deleteEvent)
