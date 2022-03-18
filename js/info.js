/*---Banner---*/
const bannerList = document.getElementById('banner-list');
const bannerDotWrapper = document.getElementById('banner-dot-wrapper');

function infoInit() {
  let child = bannerList.children;
  
  bannerDotWrapper.innerHTML = "";
  for (let i = 0; i < child.length; ++i) {
    let d = document.createElement('div');
    d.className = "bannerDot";
    d.setAttribute('page-id', i);
    d.onpointerenter = (e) =>
      !e.target.classList.contains('active') &&
      changeBanner(e.target.getAttribute('page-id'));

    bannerDotWrapper.appendChild(d);
  }
  bannerDotWrapper.children[0].classList.add('active');

  bannerList.appendChild(child[0].cloneNode());
}

let nowActiveDot = 0;
let bannerChanging = false;
function changeBanner(i) {
  if (bannerChanging) return;
  bannerChanging = true;
  setTimeout(() => bannerChanging = false, 500);
  
  bannerList.style.transform = `translateX(${
    (-bannerList.clientWidth) * i
  }px)`;
  
  if (i == bannerList.children.length - 1) {
    bannerList.ontransitionend = () => {
      bannerList.classList.remove('transition');
      bannerList.style.transform = 'translateX(0)';
      setTimeout(() =>
        bannerList.classList.add('transition'), 0);
      bannerList.ontransitionend = null;
      nowActiveDot = 0;
    }
  }

  i %= (bannerList.children.length - 1);
  bannerDotWrapper.children[nowActiveDot].classList.remove('active');
  bannerDotWrapper.children[i].classList.add('active');
  nowActiveDot = i;
}

infoInit();
setInterval(() => changeBanner(nowActiveDot + 1), 5000);


/*---Category---*/

const articleCategoryList = document.getElementById('article-category-list');
const articleListWrapper = document.getElementById('article-list-wrapper');

let nowArticlePage = 1;
for (let i = 0; i < articleCategoryList.children.length; ++i) {
  articleCategoryList.children[i].onclick = () => {
    articleCategoryList.children[nowArticlePage].classList.remove('active');
    articleCategoryList.children[i].classList.add('active');
    articleListWrapper.children[nowArticlePage].classList.remove('active');
    articleListWrapper.children[i].classList.add('active');
    nowArticlePage = i;
  }
}