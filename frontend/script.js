document.addEventListener('DOMContentLoaded', () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayData(data) {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');
    
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>League</th>
        <th>League Link</th>
        <th>League Logo</th>
        <th>Match Time</th>
        <th>Home Team</th>
        <th>Home Logo</th>
        <th>Home Score</th>
        <th>Away Team</th>
        <th>Away Logo</th>
        <th>Away Score</th>
    `;
    table.appendChild(headerRow);

    data.forEach(competition => {
        competition.match.forEach(match => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${competition.league}</td>
                <td><a href="${competition.league_link}">Link</a></td>
                <td><img src="${competition.league_logo}" alt="League Logo" width="50"></td>
                <td>${match.time}</td>
                <td>${match.home}</td>
                <td><img src="${match.home_logo}" alt="Home Logo" width="20"></td>
                <td>${match.home_score}</td>
                <td>${match.away}</td>
                <td><img src="${match.away_logo}" alt="Away Logo" width="20"></td>
                <td>${match.away_score}</td>
            `;
            table.appendChild(row);
        });
    });

    contentDiv.appendChild(table);
}



document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setInterval(fetchData, 60000); // Fetch new data every 60 seconds
});

function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>League</th>
        <th>League Link</th>
        <th>League Logo</th>
        <th>Match Time</th>
        <th>Home Team</th>
        <th>Home Logo</th>
        <th>Home Score</th>
        <th>Away Team</th>
        <th>Away Logo</th>
        <th>Away Score</th>
    `;
    table.appendChild(headerRow);

    data.forEach(competition => {
        competition.match.forEach(match => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${competition.league}</td>
                <td><a href="${competition.league_link}">Link</a></td>
                <td><img src="${competition.league_logo}" alt="League Logo" width="50"></td>
                <td>${match.time}</td>
                <td>${match.home}</td>
                <td><img src="${match.home_logo}" alt="Home Logo" width="20"></td>
                <td>${match.home_score}</td>
                <td>${match.away}</td>
                <td><img src="${match.away_logo}" alt="Away Logo" width="20"></td>
                <td>${match.away_score}</td>
            `;
            table.appendChild(row);
        });
    });

    contentDiv.appendChild(table);
}
