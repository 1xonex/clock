import './App.css';
import React, { useEffect, useState } from 'react'



function App() {
const [time, setTime] = useState({
  break: 5,
  session: 25,
  running: "stop",
  idek: "Session",
  timer: 1500,
})
const reset = () => {setTime({
  break: 5,
  session: 25,
  running: "stop",
  idek: "Session",
  timer: 1500,
});
x.pause();
x.currentTime = 0;
}
const x = document.getElementsByClassName("audiotag")[0]
const playSound =()=>{
  
  if(time.timer === 0) {
    x.play();
  }
}
const changeTimer = ()=> {
  if(time.timer < 0 && time.idek === "Session") {
    setTime({
      ...time,
      timer: time.break*60,
      idek: "Break"
    });
  } else if(time.timer < 0 && time.idek === "Break") {
    setTime({
      ...time,
      timer: time.break*60,
      idek: "Session",
    });
  }
  Clock()
}

const Clock = ()=> {
  if (time.timer < 0) return "00:00";
    let minutes = Math.floor(time.timer / 60);
    let seconds = time.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
}
const decrementTimer = ()=> {
    setTime({ ...time, timer: time.timer - 1 });
  }

useEffect(() => {
const interval = setInterval(() => {
  if(time.running === "start") {decrementTimer()}
}, 1000); return  () => clearInterval(interval);})

const startstop = () => {
  if(time.running === "stop") {
    return setTime({
    ...time,
    running: "start",
    timer: time.timer,
    })}
    else {
      return setTime({
        ...time,
        running: "stop",
        timer: time.timer,    
    })}
}
const breakIncrement = ()=> {
  if(time.running === "start" || time.break === 60) {return} else {
  setTime({...time, break: time.break+1})}
  if(time.idek === "Break") {
    setTime({...time, timer: (time.break+1)*60, break: time.break+1})
  }
}
const breakDecrement = ()=> {
  if(time.running === "start" || time.break === 1) {return} else {
  setTime({...time, break: time.break-1})}
  if(time.idek === "Break") {
    setTime({
      ...time, timer: (time.break-1)*60, break: time.break-1
    })
  }
}
const sessionIncrement = ()=> {
  if(time.running === "start" || time.session === 60) {return} else {
  setTime({...time, session: time.session+1});
  if(time.idek === "Session") {
    setTime({
      ...time, timer: (time.session+1)*60, session: time.session+1
    });
  }
}
}
const sessionDecrement = ()=> {
  if(time.running === "start" || time.session === 1) {return} else {
  setTime({...time, session: time.session-1})
  if(time.idek === "Session") {
    setTime({
      ...time, timer: (time.session-1)*60, session: time.session-1
    });
}}
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Clock</h1>
      </header>
      <div id="break-label">
      <h2>Break Length</h2>
      <button id="break-increment" onClick={breakIncrement}>
        <i className="fa fa-arrow-up fa-2x" />
      </button>
      <p id="break-length">{time.break}</p>
      <button id="break-decrement" onClick={breakDecrement}>
        <i className="fa fa-arrow-down fa-2x" />
      </button>
      </div>
      <div id="session-label">
        <h2>Session Length</h2>
      <button id="session-increment" onClick={sessionIncrement}>
        <i className="fa fa-arrow-up fa-2x" />
      </button>
      <p id="session-length">{time.session}</p>
      <button id="session-decrement" onClick={sessionDecrement}>
        <i className="fa fa-arrow-down fa-2x" />
      </button>
      </div>
      <div id="timer-label">
        <h3>{time.idek}</h3>
        <div id="time-left">
          <Clock />{changeTimer()} 
        </div>
        <button id="start_stop" onClick={startstop}>
          <i className="fa fa-play fa-2x" />
          <i className="fa fa-pause fa-2x" />
        </button>
        <button id="reset" onClick={reset}>
        <i className="fa fa-refresh fa-2x" />
        </button>
        </div>  
        <audio id="beep" className='audiotag'>
          <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></source>
        </audio>{playSound()}
    </div>
  );

}

export default App;
