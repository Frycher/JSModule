document.addEventListener('DOMContentLoaded', () => {
  const BASE_MODEL_DATA = [
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
  document.querySelectorAll('form').forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  });

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
    for (let i = 1; i <= time; i++) {
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
  renderTime(7, 5, 10);

  const content = document.querySelector('.content');
  const changeName = document.querySelector('.edit__name');
  const confirmBtnRename = document.querySelector('.edit__events .confirm__rename');
  const handleConfirm = (e) => {
    const currentTime = timesContainer.querySelector('.current__times[data-target]');
    if (!changeName.value.trim().toLowerCase()) {
      document.querySelector('.edit__events').style.border = '1px solid red';
      alert('Name cannot be empty');
      return;
    } else {
      document.querySelector('.edit__events').style.border = '1px solid #2e2e2e';
    }
    currentTime.querySelector('.current__text').textContent = changeName.value;
    changeName.value = '';
    currentTime.removeAttribute('data-target');
    document.querySelector('.edit__events').style.display = 'none';
  };
  confirmBtnRename.addEventListener('click', handleConfirm);

  const handleEdit = (e) => {
    const target = e.target;
    if (target.className != 'current__times' && target.className != 'current__text' && target.className != 'current__item') {
      return;
    }
    content.querySelector('.edit__events').style.display = 'block';
    changeName.focus();
    timesContainer.querySelectorAll('.current__times').forEach((item) => {
      item.removeAttribute('data-target');
    });
    target.closest('.current__times').setAttribute('data-target', Math.floor(Math.random() * 555));
  };
  content.addEventListener('click', handleEdit, true);

  const deleteBtn = document.querySelector('.delete__event');
  const handleDelete = (e) => {
    if (changeName.value.trim().toLowerCase()) {
      alert('You cant delete event with filled field');
      return;
    }
    timesContainer.querySelector('.current__times[data-target]').remove();
    document.querySelector('.edit__events').style.display = 'none';
    document.querySelector('.edit__events').style.border = '1px solid #2e2e2e';
  };
  deleteBtn.addEventListener('click', handleDelete);

  class MainEvent {
    constructor() {
      this.newProperties = [];
      this.addNewProperties();
      this.createNewEvent();
      this.renderTimes(this.newProperties);
    }

    addNewProperties() {
      BASE_MODEL_DATA.forEach((item) => {
        this.newProperties.push({
          ...item,
          isCompare: false,
          width: 100,
        });
      });

      // for (let i = 0; i < this.newProperties.length; i++) {
      //   const previous = this.newProperties[i - 1];
      //   const element = this.newProperties[i];
      //   const next = this.newProperties[i + 1];
      //   if(element.start) {
      //   }
      // }
      this.newProperties.forEach((item, i, array) => {
        const { start, duration, width, isCompare } = item;

        if (duration) {
          // item.width = width / 2;
          // item.isCompare = !isCompare
        }
        console.log(item);
      });
    }
    // пробежатьеще раз по массиву и сдетьа проверки
    timesTemplate(time) {
      const current__item = cElem('div', 'current__item');
      const current__text = cElem('div', 'current__text', `${time.title}`);
      const container = cElem('div', 'current__times');
      container.style.top = `${time.start * 2}px`;
      container.style.right = `${time.isCompare ? 0 : ''}`;
      container.style.height = `${time.duration * 2}px`;
      container.style.width = `${time.width}%`;
      current__item.append(current__text);
      container.append(current__item);
      return container;
    }
    renderTimes(arr) {
      const renderResult = arr.map((item) => this.timesTemplate(item));
      timesContainer.clear().add(renderResult);
    }
    splitFormTime(item, hoursDay = 0) {
      let [time, duration] = item.split(':');
      return +time * 60 - hoursDay + +duration;
    }
    createNewEvent() {
      const confrimBtnNew = document.querySelector('.new__events .new__changes');
      const inputNewName = document.querySelector('.new_event_name');
      const newStartTime = document.querySelector('.new_start_time');
      const newDurationTime = document.querySelector('.new_duration_time');
      const newColor = document.querySelector('.new_color');
      const handleConfirmEvent = (e) => {
        console.log(newStartTime.value);
        if (!inputNewName.value.trim()) {
          alert('Set new name');
          return false;
        } else if (!newStartTime.value) {
          alert('Set start time');
          return false;
        } else if (!newDurationTime.value) {
          alert('Set duration time');
          return false;
        } else if (newStartTime.value == newDurationTime.value) {
          alert('Right now you set same time');
          return false;
        } else if (
          newStartTime.value < newStartTime.min ||
          newStartTime.value > newStartTime.max ||
          newDurationTime.value < newDurationTime.min ||
          newDurationTime.value > newDurationTime.max
        ) {
          alert('You can set time at 8am and not more 5pm');
          return false;
        }

        console.log(newColor.value);
        let start = this.splitFormTime(newStartTime.value, 8 * 60);
        let duration = this.splitFormTime(newDurationTime.value) - 8 * 60;
        console.log(start);
        console.log(duration);
        for (let i = 0; i < this.newProperties.length; i++) {
          const element = this.newProperties[i];
          if (element.title.includes(inputNewName.value)) {
            alert('This event already exists');
            return false;
          }
        }
        this.newProperties.push({
          title: inputNewName.value,
          start,
          duration,
          width: 100,
          isCompare: false,
        });
        console.log(this.newProperties);
        this.renderTimes(this.newProperties);
      };
      confrimBtnNew.addEventListener('click', handleConfirmEvent);
    }
  }

  const mainEvent = new MainEvent();
  console.log(mainEvent);
});
