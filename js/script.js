/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = page * 9 - 9;
  let endIndex = page * 9;

  if (endIndex > list.length) {
    const diff = endIndex - list.length;
    endIndex -= diff;
  }

  const studentList = document.querySelector('.student-list');

  studentList.innerHTML = '';

  for (let i = startIndex; i >= startIndex && i < endIndex; i++) {
    const student = `
    <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
    </li>`;
    studentList.insertAdjacentHTML('beforeend', student);
  }
}

function getNumberOfPaginationButtons(listOfStudents) {
  let numberOfButtons = listOfStudents.length / 9;

  if (listOfStudents.length % 9 !== 0) {
    numberOfButtons = Math.ceil(numberOfButtons);
  }
  return numberOfButtons;
}

function createPaginationButtons(listElement, numberOfButtons) {
  listElement.innerHTML = '';

  for (let pageNumber = 1; pageNumber <= numberOfButtons; pageNumber++) {
    const student = `
    <li>
      <button type="button">${pageNumber}</button>
    </li>`;
    listElement.insertAdjacentHTML('beforeend', student);
  }
}

function addActiveClassToFirstPageButton(listElement) {
  const firstPageButton = listElement.querySelector('li:first-child button');
  firstPageButton.classList.add('active');
}

function removeActiveClassFromPreviousButton() {
  const buttons = document.querySelectorAll('.link-list button');

  for (const button of buttons) {
    button.classList.remove('active');
  }
}

function addActiveClassToCurrentButton(event) {
  event.target.classList.add('active');
}

function displayPage(event) {
  if (event.target.tagName === 'BUTTON') {
    const page = Number(event.target.textContent);

    removeActiveClassFromPreviousButton();
    addActiveClassToCurrentButton(event);
    showPage(data, page);
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const linkList = document.querySelector('.link-list');
  const numberOfButtons = getNumberOfPaginationButtons(list);

  createPaginationButtons(linkList, numberOfButtons);
  addActiveClassToFirstPageButton(linkList);
  linkList.addEventListener('click', displayPage);
}

// Call functions
showPage(data, 1);
addPagination(data);