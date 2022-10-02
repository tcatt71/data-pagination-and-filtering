/** Creates and displays pagination buttons
 * @param {array} list - An array of student objects.
 */
function addPagination(list) {
  const linkList = document.querySelector('.link-list');
  const numberOfButtons = getNumberOfPaginationButtons(list);

  createPaginationButtons(linkList, numberOfButtons);
  addActiveClassToFirstPageButton(linkList);
  linkList.addEventListener('click', displayPage);
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

function displayPage(event) {
  if (event.target.tagName === 'BUTTON') {
    const page = Number(event.target.textContent);

    removeActiveClassFromPreviousButton();
    addActiveClassToCurrentButton(event);
    showPage(data, page);
  }
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

/** Displays the students of a paticular page.
 * @param {array} list - An array of student objects.
 * @param {number} page - The pagination button page number.
 */
function showPage(list, page) {
  const startIndex = page * 9 - 9;
  let endIndex = getEndingIndex(page, list);

  displayStudents(startIndex, endIndex, list);
}

function getEndingIndex(page, listOfStudents) {
  let endIndex = page * 9;

  if (endIndex > listOfStudents.length) {
    const diff = endIndex - listOfStudents.length;
    endIndex -= diff;
  }
  return endIndex;
}

function displayStudents(startIndex, endIndex, list) {
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

showPage(data, 1);
addPagination(data);