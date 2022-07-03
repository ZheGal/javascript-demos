const stopwatch = () => {
    const container = document.querySelector('.container');
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-block');
    const actionButton = document.createElement('button');
    const hrBlock = document.createElement('span');
    const mnBlock = document.createElement('span');
    const scBlock = document.createElement('span');
    const msBlock = document.createElement('span');
    hrBlock.innerText = '00:';
    mnBlock.innerText = '00:';
    scBlock.innerText = '00:';
    msBlock.innerText = '000';
    actionButton.innerText = 'Start';

    timerContainer.append(hrBlock);
    timerContainer.append(mnBlock);
    timerContainer.append(scBlock);
    timerContainer.append(msBlock);

    container.append(timerContainer);
    container.append(actionButton);
    
    const state = {
        active: false,
        start: null,
        event: false
    };
    const tick = () => {
        const time = Date.now() - state.start;
        const ms = (time % 1000);
        const scString = String(`0${Math.floor((time / 1000)) % 60}`);
        const mnString = String(`0${Math.floor(((time / 1000) / 60)) % 60}`);
        const hr = Math.floor(((time / 1000) / 60 / 60))

        const sc = scString.substring(scString.length - 2);
        const mn = mnString.substring(mnString.length - 2);

        hrBlock.innerHTML = (hr < 10) ? `0${hr}:` : `${hr}:`;
        mnBlock.innerHTML = `${mn}:`;
        scBlock.innerHTML = `${sc}:`;
        msBlock.innerHTML = `${ms}00`.slice(0,3);
    }
    const newTimer = () => {
        state.start = Date.now();
        localStorage.setItem('stopwatchStart', state.start);
        startTimer();
    }
    const startTimer = () => {
        state.active = true;
        state.event = setInterval(tick, 100);
        actionButton.innerText = 'Stop';
    }
    const stopTimer = () => {
        state.active = false;
        clearInterval(state.event);
        actionButton.innerText = 'Start';
        localStorage.removeItem('stopwatchStart');
    }
    actionButton.addEventListener('click', () => {
        return (state.active) ? stopTimer() : newTimer();
    });
    if (localStorage.getItem('stopwatchStart')) {
        state.start = localStorage.getItem('stopwatchStart');
        startTimer();
    }
}

stopwatch();