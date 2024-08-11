let timerInterval;
let timerRunning = false;
let remainingTime = 0; // Variable to keep track of the remaining time

function startTimer(duration) {
    let timer = duration, hours, minutes, seconds;
    const display = document.getElementById('timer');
    const alarmSound = document.getElementById('alarmSound');

    timerInterval = setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "00:00:00";
            alarmSound.play();  // Play the alarm sound
            document.getElementById('startButton').disabled = false;
            document.getElementById('stopButton').disabled = true;
            document.getElementById('resetButton').disabled = false;
            timerRunning = false;
        }
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', function() {
    if (!timerRunning) {
        const hoursInput = parseInt(document.getElementById('hoursInput').value, 10) || 0;
        const minutesInput = parseInt(document.getElementById('minutesInput').value, 10) || 0;
        const secondsInput = parseInt(document.getElementById('secondsInput').value, 10) || 0;
        const timerDuration = (hoursInput * 3600) + (minutesInput * 60) + secondsInput;

        if (!isNaN(timerDuration) && timerDuration > 0) {
            // Use remainingTime if the timer was previously stopped
            const startTime = remainingTime > 0 ? remainingTime : timerDuration;
            startTimer(startTime);
            timerRunning = true;
            document.getElementById('startButton').disabled = true;
            document.getElementById('stopButton').disabled = false;
            document.getElementById('resetButton').disabled = false;
        } else {
            alert('Please enter a valid number of hours, minutes, and/or seconds.');
        }
    }
});

document.getElementById('stopButton').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerRunning = false;
    remainingTime = document.getElementById('timer').textContent
        .split(':')
        .reduce((acc, time) => (60 * acc) + +time); // Convert display time to seconds
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
    document.getElementById('resetButton').disabled = false;
});

document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = "00:00:00";
    document.getElementById('hoursInput').value = "";
    document.getElementById('minutesInput').value = "";
    document.getElementById('secondsInput').value = "";
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    timerRunning = false;
    remainingTime = 0; // Reset remaining time
});
