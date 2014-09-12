// GaciX
document.querySelector('#btn-pomo').addEventListener ('click', function () {
  document.querySelector('#pomo').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-task').addEventListener ('click', function () {
  document.querySelector('#task').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-newtask').addEventListener ('click', function () {
  document.querySelector('#newtask').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-viewtask').addEventListener ('click', function () {
  document.querySelector('#viewtask').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-about').addEventListener ('click', function () {
  document.querySelector('#about').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-help').addEventListener ('click', function () {
  document.querySelector('#help').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});


document.querySelector('#btn-pomo-back').addEventListener ('click', function () {
  document.querySelector('#pomo').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

document.querySelector('#btn-task-back').addEventListener ('click', function () {
  document.querySelector('#task').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-newtask-back').addEventListener ('click', function () {
  document.querySelector('#newtask').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-viewtask-back').addEventListener ('click', function () {
  document.querySelector('#viewtask').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-help-back').addEventListener ('click', function () {
  document.querySelector('#help').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-about-back').addEventListener ('click', function () {
  document.querySelector('#about').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
