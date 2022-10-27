const TaskIds = {
  task10: 'task10',
  task13: 'task13',
  task16: 'task16',
  task19: 'task19',
  task22: 'task22',
}

const setDisableForm = (form, value) => {
  const submitTrigger = form.querySelector('[type="submit"]');

  if (submitTrigger) {
    submitTrigger.disabled = value;
  }
}

const defaultHandleTask = (data, error, formId, labelResultId) => {
  const form = document.getElementById(formId);
  const labelResult = document.getElementById(labelResultId);

  setDisableForm(form, false);

  if (error) {
    labelResult.textContent = error;
    return;
  }

  labelResult.textContent = data.join(', ');
}

const handleTask10 = (data, error) => defaultHandleTask(data, error, 'task10', 'task10Result');
const handleTask13 = (data, error) => defaultHandleTask(data, error, 'task13', 'task13Result');
const handleTask16 = (data, error) => defaultHandleTask(data, error, 'task16', 'task16Result');
const handleTask19 = (data, error) => defaultHandleTask(data, error, 'task19', 'task19Result');
const handleTask22 = (data, error) => {
  const form = document.getElementById('task22');
  const labelResult = document.getElementById('task22Result');

  if (error) {
    alert(error);
    return;
  }

  setDisableForm(form, false);

  const values = [
    ...labelResult.textContent.split(', ')
      .filter(value => value !== '' && Number.isFinite(Number(value))),
    data,
  ];
  labelResult.textContent = values.join(', ');
}

const socket = new WebSocket(`ws://${window.location.host}/ws`);

socket.onopen = () => {
  alert('Соединение установлено');
}

socket.onclose = () => {
  alert('Соединение прервано');
}

socket.onmessage = (ev) => {
  const parsedData = JSON.parse(ev.data);
  const { data, taskId, error } = parsedData;

  console.log('parsedData', parsedData);

  switch (taskId) {
    case TaskIds.task10:
      handleTask10(data, error);
      break;

    case TaskIds.task13:
      handleTask13(data, error);
      break;

    case TaskIds.task16:
      handleTask16(data, error);
      break;

    case TaskIds.task19:
      handleTask19(data, error);
      break;

    case TaskIds.task22:
      handleTask22(data, error);
      break;

    default:
      break;
  }
}

Array.from(document.forms).forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    setDisableForm(form, true);

    const formData = {};

    Array.from(form.elements).forEach(({ name, value }) => {
      if (name && value) {
        formData[name] = value;
      }
    });

    const message = {
      taskId: form.id,
      data: formData,
    }

    console.log('Отправленные данные', message);

    socket.send(JSON.stringify(message));
  });
});
