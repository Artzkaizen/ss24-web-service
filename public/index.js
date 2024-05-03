let currentPage = 1;
let arraySize = 10
async function fetchAvatars(page = 1, size = 20) {
    try {
        const response = await fetch(`http://localhost:4500/api/avatars?page=${page}&size=${size}`,
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJwYXJlbnQiLCJjaGlsZCJdLCJuYW1lIjoiTWFyaWUiLCJpYXQiOjE3MTQ3MjQ4NTMsImV4cCI6MTcxNzMxNjg1Mywic3ViIjoibWFyaWVAaG9tZS5lZHUifQ.hJ1ggckRIKJyWsiMvtNguH6DTyN3VR1jQ9sdW1QlwBs',
                    'Content-Type': 'application/json',
                }
            }
    );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching avatars:', error);
    }
}
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const tableBody = document.querySelector('tbody');

async function displayAvatars(page, arraySize) {
    try {
        const avatars = await fetchAvatars(page, arraySize);
        currentPage === 1 && avatars.length ? prevBtn.disabled = true : prevBtn.disabled = false;
        avatars.length <  arraySize ? nextBtn.disabled = true : nextBtn.disabled = false;

        setTimeout(() => {
            avatars.forEach(avatar => {
                const tableRow = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = avatar.avatarName;
                tableRow.appendChild(nameCell);

                const ageCell = document.createElement('td');
                ageCell.textContent = avatar.childAge;
                tableRow.appendChild(ageCell);

                const createdAtCell = document.createElement('td');
                createdAtCell.textContent = (new Date(avatar.createdAt)).toDateString()
                tableRow.appendChild(createdAtCell);

                tableBody.appendChild(tableRow);
            })
        }, 150)
        ;
    } catch (error) {
        console.error('Error displaying avatars:', error);
    }
}
prevBtn.onclick = () => {
    tableBody.innerHTML = '';
    displayAvatars(--currentPage, arraySize);
}
nextBtn.onclick = () => {
    tableBody.innerHTML = '';
    displayAvatars(++currentPage, arraySize);
}

displayAvatars(currentPage, arraySize);
