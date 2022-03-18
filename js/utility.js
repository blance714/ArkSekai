/*---Shortcuts---*/

const activate = (target) =>
  target.classList.add('active');
const disActivate = (target) =>
  target.classList.remove('active');

/*---Section Rolling---*/
const sectionWrapper = document.getElementById('section-wrapper');
const mainDiv = document.getElementById('main');
const sectionCatagory = document.getElementById('section-catagory');

let nowSection = 0;
let isRolling = false;
function updSectionTranslate() {
  sectionWrapper.style.transform = `translateY(${
    -mainDiv.clientHeight * nowSection
  }px)`;
}

let lastRolltime = 0;
function roll2Section(i) {
  let now = new Date();
  if (now.getTime() - lastRolltime < 300)  return;
  lastRolltime = now.getTime();

  disActivate(sectionWrapper.children[nowSection]);
  disActivate(sectionCatagory.children[nowSection])
  activate(sectionWrapper.children[i]);
  activate(sectionCatagory.children[i])
  nowSection = i;

  updSectionTranslate();
}

let lastWheel = 0;
document.body.addEventListener('wheel', (e) => {
  e.preventDefault();
  e.stopPropagation();
  let pass = Math.abs(e.deltaY) < lastWheel + 10;
  lastWheel = Math.abs(e.deltaY);
  if (pass) return;
  console.log(`${e.deltaX} ${e.deltaY}`);
  if (e.deltaY < -20 && nowSection) roll2Section(nowSection - 1);
  else if (e.deltaY > 20 && nowSection < sectionWrapper.children.length - 1)
    roll2Section(nowSection + 1);
}, {passive: false});

window.onresize = updSectionTranslate;

//sectionCatagory
(() => {
  let items = sectionCatagory.children;
  for (let i = 0; i < items.length; ++i) {
    items[i].onclick = () =>
      roll2Section(items[i].getAttribute('list-id'));
  }
})();