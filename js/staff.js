const staffData = Agent.get('/assets/staffList.json');

const staffList = document.getElementById('staff-list');
const staffListWrapper = document.getElementById('staff-list-wrapper');
const staffNameBoard = document.getElementById('staff-name-board');
const staffInfoWrapper = document.getElementById('staff-info-wrapper');
const staffImageWrapper = document.getElementById('staff-image-wrapper');

function rpEmpty(str) {
  return str.replace(/ /g, '&nbsp;');
}

function createStaffListItem(i, index, staff) {
  const staffListTemplate =
`<li class="staffItem" list-id=${index}>
  <span class="staffListNumber">${i + 1 < 10 ? '0' + (i + 1) : i + 1}</span>
    <img src="${staff.img}">
  <span class="staffListName">${staff.name}</span>
</li>`

  let li = document.createRange().createContextualFragment(staffListTemplate).firstChild;
  li.onclick = () => selectStaff(index);

  return li;
}

function staffInit() {
  staffList.innerHTML = "";
  for (let j = 0; j < 3; ++j)
  for (let i in staffData) {
    staffList.appendChild(
      createStaffListItem(parseInt(i), parseInt(i) + parseInt(j) * staffData.length, staffData[i])
    );
  }
}

let lastStaff = 3 + staffData.length;
let isTransition = false;
function selectStaff(i) {

  //处理侧边栏
  if (isTransition) return;
  isTransition = true;

  //预加载图片
  Agent.prefetch(staffData[i % staffData.length].charimg);

  console.log(i);
  staffList.style.top = `${(i - 3) * (-8)}%`;
  staffList.classList.add('transition');
  staffList.children[lastStaff].classList.remove('active');
  let nowItem = staffList.children[i];
  nowItem.classList.add('active');
  
  setTimeout(() => {
    staffList.classList.remove('transition');
    nowItem.classList.remove('active');
    
    i = i % staffData.length + staffData.length;
    staffList.style.top = `${(i - 3) * (-8)}%`;
    staffList.children[i].classList.add('active');
    lastStaff = i;
  }, 400);

  //处理人物信息
  let isFirst = staffInfoWrapper.children.length == 0;
  if (!isFirst) {
    staffInfoWrapper.classList.add('unshow');
    staffImageWrapper.classList.add('unshow');
  }
  setStaffNameBoard(staffData[i % staffData.length].nameEng);
  
  
  setTimeout(() => {
    staffInfoWrapper.classList.remove('unshow');
    staffImageWrapper.classList.remove('unshow');
    staffImageWrapper.children[0].src = staffData[i % staffData.length].charimg;
    staffInfoWrapper.innerHTML = "";
    staffInfoWrapper.appendChild(createStaffInfoEle(staffData[i % staffData.length]));
  }, isFirst ? 0 : 800);

  setTimeout(() => isTransition = false, 1800);
}

const timeDelay = 0.8;  //名字渐变总时长
const alphaTime = 0.3;  //单个字符渐变时长
const alphaDelay = timeDelay - alphaTime;

function setStaffNameBoard(str) {
  for (let i = 0; i < staffNameBoard.children.length; ++i) {
    let d = staffNameBoard.children[i];
    d.style.animation = `staffNameBoardHide ${alphaTime}s linear ${
      i * (alphaDelay / staffNameBoard.children.length)
    }s both`;
  }
  
  setTimeout(() => {
    staffNameBoard.innerHTML = "";

    for (let i in str) {
      let d = document.createElement('div');
      d.innerHTML = str[i] == ' ' ? `&nbsp;` : str[i];
      d.style.animation = `staffNameBoardShow ${alphaTime}s linear ${
        i * (alphaDelay / str.length)
      }s both`;
      staffNameBoard.appendChild(d);
    }
  }, timeDelay * 1000);
}

function createStaffInfoEle(staff) {
  const template = 
`<div id="staff-info">
  <div id="staff-info-name-wrapper">
    <div id="staff-info-name">${staff.name}</div>
    <div id="staff-info-cv-wrapper">
      <div id="staff-info-nameeng">${staff.nameEng}</div>
      <div id="staff-info-cv">CV:${staff.cv}</div>
    </div>
    <div id="staff-info-bigname" style="color: ${staff.color}">${staff.nameEng}</div>
  </div>
  <div id="staff-info-content">${staff.info}</div>
</div>`

  let d = document.createRange().createContextualFragment(template).firstChild;
  return d;
}

staffInit();
selectStaff(3 + staffData.length);