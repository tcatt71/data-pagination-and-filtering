/** Creates and displays the Search bar */
function createSearchBar() {
  const header = document.querySelector('header');
  const searchBar = `
  <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`;

  header.insertAdjacentHTML('beforeend', searchBar);

  const searchBox = header.querySelector('#search');
  const searchButton = header.querySelector('button');

  searchBox.addEventListener('keyup', searchForStudents);
  searchButton.addEventListener('click', searchForStudents);
}

/** Updates the students displayed as a result of a search bar query. */
function searchForStudents() {
  const searchBox = document.querySelector('#search');

  let query = searchBox.value.toLowerCase();
  const searchResults = [];
  let hasMatches = false;

  for (const student of data) {
    const firstName = student.name.first.toLowerCase();
    const lastName = student.name.last.toLowerCase();

    if (firstName.includes(query)) {
      searchResults.push(student);
      hasMatches = true;
    } else if (lastName.includes(query)) {
      searchResults.push(student);
      hasMatches = true;
    }
  }

  if (hasMatches) {
    showPage(searchResults, 1);
    addPagination(searchResults);
  } else {
    handleNoResultsFound();
  }
}

/** Displays a message when no results are returned when performing a search for students. */
function handleNoResultsFound() {
  const studentList = document.querySelector('.student-list');
  const linkList = document.querySelector('.link-list');

  studentList.innerHTML = '<p>No results found</p>';
  studentList.querySelector('p').style.textAlign = 'left';
  linkList.innerHTML = '';
}

/** Creates and displays pagination buttons.
 * @param {array} list - An array of student objects.
 */
function addPagination(list) {
  const linkList = document.querySelector('.link-list');
  const numberOfButtons = getNumberOfPaginationButtons(list);

  createPaginationButtons(linkList, numberOfButtons);
  addActiveClassToFirstPageButton(linkList);
  linkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const page = Number(e.target.textContent);

      removeActiveClassFromPreviousButton();
      addActiveClassToCurrentButton(e);
      showPage(list, page);
    }
  });
}

/**
 * Gets the number of pagination button to be created.
 * @param {array} listOfStudents
 * @returns {number} Number of buttons to be created.
 */
function getNumberOfPaginationButtons(listOfStudents) {
  let numberOfButtons = listOfStudents.length / 9;

  if (listOfStudents.length % 9 !== 0) {
    numberOfButtons = Math.ceil(numberOfButtons);
  }
  return numberOfButtons;
}

/**
 * Creates pagination buttons
 * @param {object} listElement
 * @param {number} numberOfButtons
 */
function createPaginationButtons(listElement, numberOfButtons) {
  listElement.innerHTML = '';

  for (let pageNumber = 1; pageNumber <= numberOfButtons; pageNumber++) {
    const button = `
    <li>
      <button type="button">${pageNumber}</button>
    </li>`;
    listElement.insertAdjacentHTML('beforeend', button);
  }
}

/**
 * Adds the class active to the buttons class list.
 * @param {object} listElement
 */
function addActiveClassToFirstPageButton(listElement) {
  const firstPageButton = listElement.querySelector('li:first-child button');
  firstPageButton.classList.add('active');
}

/**
 * Removes the class active from the buttons class list.
 */
function removeActiveClassFromPreviousButton() {
  const buttons = document.querySelectorAll('.link-list button');

  for (const button of buttons) {
    button.classList.remove('active');
  }
}

/**
 * Adds the class active to the button that is clicked.
 * @param {object} event
 */
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

/**
 * Returns the last index number of the page being displayed.
 * @param {number} page
 * @param {array} listOfStudents
 * @returns {number} Last index nuber of the page being displayed.
 */
function getEndingIndex(page, listOfStudents) {
  let endIndex = page * 9;

  if (endIndex > listOfStudents.length) {
    const diff = endIndex - listOfStudents.length;
    endIndex -= diff;
  }
  return endIndex;
}

/**
 * Creates and displays the students for a paticular page.
 * @param {number} startIndex
 * @param {number} endIndex
 * @param {array} list
 */
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

createSearchBar();
showPage(data, 1);
addPagination(data);