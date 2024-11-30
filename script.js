document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById('search-btn');
    const usernameInput = document.getElementById('user-input');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');
    const easyLabel = document.querySelector('.easy-label');
    const mediumLabel = document.querySelector('.medium-label');
    const hardLabel = document.querySelector('.hard-label');
    const cardHfour = document.querySelector('.card-h4');
    const cardPara = document.querySelector('.card-para')

    function validUsername(username) {
        if (username.trim() === "") {
            alert('Username should not be empty');
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the User data");
            }

            const parseData = await response.json();
            displayUserData(parseData);

            console.log(parseData);
            

        } catch (error) {
            console.error(error);
            statsContainer.innerHTML = `<p>Unable to fetch data for the provided username. Please check the username and try again.</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = total > 0 ? (solved / total) * 100 : 0;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parseData) {
        updateProgress(parseData.easySolved, parseData.totalEasy, easyLabel, easyProgressCircle);
        updateProgress(parseData.mediumSolved, parseData.totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(parseData.hardSolved, parseData.totalHard, hardLabel, hardProgressCircle);

        // const cardData = [
        //     {label: "Overall Submissions", value: parseData.totalSolved},
        //     {label: "Overall Easy Submissions", value: parseData.easySolved},
        //     {label: "Overall Medium Submissions", value: parseData.mediumSolved},
        //     {label: "Overall Hard Submissions", value: parseData.hardSolved},
        // ];
        // console.log("card data: ", cardData);
        
        // statsContainer.innerHTML = cardData.map(
        //     data => {
        //            return `<div class="card">
        //                 <h4>${data.label}</h4>
        //                 <p>${data.value}</p>
        //                 </div>`
        //     } 
        // )
    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        if (validUsername(username)) {
            fetchUserDetails(username);
        }
    });
});

