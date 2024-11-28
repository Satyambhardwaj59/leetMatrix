document.addEventListener("DOMContentLoaded", () => {

    const searchButton = document.getElementById('search-btn');
    const usernameInput = document.getElementById('user-input');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');
    const easyLable = document.querySelector('.easy-lable');
    const mediumLable = document.querySelector('.medium-lable');
    const hardLable = document.querySelector('.hard-lable');
    const cardStatsContainer = document.querySelector('.stats-cards');


    
    
    //  return true or false based on a regex...
    function validUsername(username){
        if (username.trim() === "") {
            alert('Username should not be empty');
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{

            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Ubable to fetch the User data");
            }

            const parseData = await response.json();
            console.log("logging data: " , parseData);

           // console.log(data.totalEasy);

           displayUserData(parseData);
            
            

        }

        catch(error){
            console.log(error);
            
             statsContainer.innerHTML = `<p> Data not found </p>`;
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, lable, circle){
        const progressDegree = (solved/total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        // lable.textContent = `${solved}/${total}`;
        lable.textContent = `${solved}/${total} `;

        // console.log("hiii 1 : ", easyLable);
        // console.log("hiii 2 : ", mediumLable);
        // console.log("hiii 3 : ", hardLable);
    }

    function displayUserData(parseData) {
        const totalQues = parseData.totalQuestions;
        const totalHardQues = parseData.totalHard;
        const totalMediumQues = parseData.totalMedium;
        const totalEasyQues = parseData.totalEasy;

        const solvedTotalQues = parseData.totalSolved;
        const solvedTotalHardQues = parseData.hardSolved;
        const solvedTotalMediumQues = parseData.mediumSolved;
        const solvedTotalEasyQues = parseData.easySolved;
        
        
        console.log("Hello : ", easyLable);
        
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLable, easyProgressCircle);

        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLable, mediumProgressCircle);

        updateProgress(solvedTotalHardQues, totalHardQues, hardLable, hardProgressCircle);

    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        // console.log("logging username: ", username);
        if(validUsername(username)){
            fetchUserDetails(username);
        }
        
    })








})