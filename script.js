document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addButton');
  const titleInput = document.getElementById('title');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const scheduleEntriesTable = document.getElementById('scheduleEntries');
  const scheduleTableContainer = document.getElementById('scheduleTableContainer');
  const calendarForm = document.querySelector('.calendar-form');
  const selectedDateInput = document.getElementById('selectedDate');
  const showScheduleButton = document.getElementById('showScheduleButton');

  addButton.addEventListener('click', addEntry);
  showScheduleButton.addEventListener('click', showSchedule);

  // Load schedule entries from Local Storage on page load
  loadScheduleFromLocalStorage();

  function addEntry() {
    const title = titleInput.value.trim();
    const date = dateInput.value.trim();
    const time = timeInput.value.trim();

    if (title !== '' && date !== '' && time !== '') {
      const tableRow = document.createElement('tr');

      const titleCell = document.createElement('td');
      titleCell.textContent = title;

      const dateCell = document.createElement('td');
      dateCell.textContent = date;

      const timeCell = document.createElement('td');
      timeCell.textContent = time;

      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        tableRow.remove();
        saveScheduleToLocalStorage(); // Update Local Storage after deletion
      });

      deleteCell.appendChild(deleteButton);

      tableRow.appendChild(titleCell);
      tableRow.appendChild(dateCell);
      tableRow.appendChild(timeCell);
      tableRow.appendChild(deleteCell);

      scheduleEntriesTable.appendChild(tableRow);

      scheduleTableContainer.classList.remove('hidden');
      calendarForm.classList.remove('hidden');

      titleInput.value = '';
      dateInput.value = '';
      timeInput.value = '';

      saveScheduleToLocalStorage(); // Save to Local Storage after addition
    }
  }

  function showSchedule() {
    const selectedDate = selectedDateInput.value;
    const scheduleEntries = scheduleEntriesTable.querySelectorAll('tr');

    scheduleEntries.forEach((entry) => {
      const entryDate = entry.querySelector('td:nth-child(2)').textContent;
      if (entryDate !== selectedDate) {
        entry.style.display = 'none';
      } else {
        entry.style.display = '';
      }
    });
  }

  function saveScheduleToLocalStorage() {
    const scheduleEntries = scheduleEntriesTable.querySelectorAll('tr');
    const scheduleData = [];

    scheduleEntries.forEach((entry) => {
      const title = entry.querySelector('td:nth-child(1)').textContent;
      const date = entry.querySelector('td:nth-child(2)').textContent;
      const time = entry.querySelector('td:nth-child(3)').textContent;

      scheduleData.push({ title, date, time });
    });

    localStorage.setItem('schedule', JSON.stringify(scheduleData));
  }

  function loadScheduleFromLocalStorage() {
    const scheduleData = JSON.parse(localStorage.getItem('schedule'));

    if (scheduleData) {
      scheduleData.forEach((data) => {
        const { title, date, time } = data;

        const tableRow = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = title;

        const dateCell = document.createElement('td');
        dateCell.textContent = date;

        const timeCell = document.createElement('td');
        timeCell.textContent = time;

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          tableRow.remove();
          saveScheduleToLocalStorage(); // Update Local Storage after deletion
        });

        deleteCell.appendChild(deleteButton);

        tableRow.appendChild(titleCell);
        tableRow.appendChild(dateCell);
        tableRow.appendChild(timeCell);
        tableRow.appendChild(deleteCell);

        scheduleEntriesTable.appendChild(tableRow);
      });

      scheduleTableContainer.classList.remove('hidden');
      calendarForm.classList.remove('hidden');
    }
  }
});
