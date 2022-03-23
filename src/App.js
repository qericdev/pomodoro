import { clear } from '@testing-library/user-event/dist/clear';
import React from 'react'

export default function App() {

  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [minutes, setMinutes] = React.useState(sessionLength);
  const [seconds, setSeconds] = React.useState("00");
  const [sessionActive, setSessionActive] = React.useState(false);
  const [timer, setTimer] = React.useState(null);
  const [breakTimer, setBreakTimer] = React.useState(null);
  const [audio, setAudio] = React.useState(new Audio("./../audio/bell.mp3"));

  React.useEffect(() => {
    console.log(sessionActive)
    if(sessionActive) {
      let tempSessionActive = sessionActive
      let tempSeconds = seconds
      let tempMinutes = minutes

      setTimer (prevTimer => setInterval(function() {
          if(tempSeconds === "00" && tempSessionActive && !(tempSeconds ==="00" && tempMinutes === 0)) {
              setSeconds(59)
              tempSeconds = 59
              setMinutes(prevMinutes => prevMinutes - 1)
              tempMinutes = tempMinutes - 1
          } else if(tempSeconds > 1 && tempSessionActive && !(tempSeconds ==="00" && tempMinutes === 0)) {
              setSeconds(prevSeconds => prevSeconds - 1)
              tempSeconds -= 1
          } else if(tempSeconds === 1 && tempSessionActive && !(tempSeconds ==="00" && tempMinutes === 0)){
              setSeconds("00")
              tempSeconds = "00"
              audio.play()
          } else if(tempSeconds === "00" && tempMinutes === 0) {
              setBreakTimer(true)
              setSessionActive(false)
              setTimer(prevTimer => clearInterval(prevTimer))
          }
        }, 1000))
      } else {
        setTimer(prevTimer => clearInterval(prevTimer))
      }
  },[sessionActive])

  React.useEffect(() => {
    if(breakTimer === true) {
      let tempMinutesBreak = breakLength
      let tempSecondsBreak = "00"
      setMinutes(breakLength)
      setSeconds("00")
      setBreakTimer(prevBreakTimer => setInterval(function() {
        if(tempSecondsBreak === "00") {
          setSeconds(59)
          tempSecondsBreak = 59
          setMinutes(prevMinutes => prevMinutes- 1)
          tempMinutesBreak = tempMinutesBreak - 1
        } else if(tempSecondsBreak > 0) {
          setSeconds(prevSeconds => prevSeconds - 1)
          tempSecondsBreak = tempSecondsBreak - 1
        } else if(tempSecondsBreak === 1) {
          setSeconds("00")
          tempSecondsBreak = "00"
          
        } else if(tempSecondsBreak === 0 & tempMinutesBreak === 0) {
          audio.play()
          setMinutes(sessionLength)
          setSeconds("00")
          setSessionActive(true)
          setBreakTimer(prevBreakTimer => clearInterval(prevBreakTimer))
        }
      }
      ,1000))
    } 
  },[breakTimer])

  function decrementBreak() {
    if(breakLength > 1 && breakTimer!== true && !sessionActive && !breakTimer) {
      setBreakLength(prevBreakLength => prevBreakLength - 1)
    }
  }

  function incrementBreak() {
    if(breakLength <= 59 && breakTimer!== true && !sessionActive && !breakTimer) {
      setBreakLength(prevBreakLength => prevBreakLength + 1)
    }
  }

  function decrementSession() {
    if(sessionLength > 1 && !sessionActive && minutes === sessionLength) {
      setSessionLength(prevSessionLength => prevSessionLength - 1)
      setMinutes(prevMinutes => prevMinutes - 1)
    }
  }

  function incrementSession() {
    if(!sessionActive && minutes === sessionLength) {
      setSessionLength(prevSessionLength => prevSessionLength + 1)
      setMinutes(prevMinutes => prevMinutes + 1)
    }
  }

  function startStop() {
    if(!(breakTimer)) {
    setSessionActive(prevSessionActive => !prevSessionActive)
    } 
  }

  function reset() {
    setTimer(prevTimer => clearInterval(prevTimer))
    setBreakTimer(prevBreakTimer => clearInterval(prevBreakTimer))
    setSessionActive(false)
    setMinutes(sessionLength)
    setSeconds("00")
  }

  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1>

      <div className="settings">

        <div className="break-section">
          <div id="break-label">Break Length</div>
          <div className='break-buttons'>
            <img onClick={decrementBreak} id="break-decrement" src="./../images/arrow-down.png"/>
            <p id="break-length">{breakLength}</p>
            <img onClick={incrementBreak} id="break-increment" src="./../images/arrow-up.png"/>
          </div>
        </div>

        <div className="session-section">
          <div id="session-label">Session Length</div>
          <div className="session-buttons">
            <img onClick={decrementSession} id="session-decrement" src="./../images/arrow-down.png"/>
            <p id="session-length">{sessionLength}</p>
            <img onClick={incrementSession}id="break-increment" src="./../images/arrow-up.png"/>
          </div>
        </div>

      </div>

      <div className="timer-section">

      <div className="timer-section-display">
        <div id="timer-label">{breakTimer ? "Break" : "Session"}</div>
        <div id="time-left">{minutes < 10 ? `0${minutes}`: minutes}:
                            {seconds < 10 && seconds !== "00" ? `0${seconds}`: seconds}
        </div>
      </div>
      
      <div className="timer-section-buttons">
        <img onClick = {startStop} id="star_stop" src="./../images/next.png"/>
        <img onClick = {reset} id="reset"src="./../images/arrows-circle.png"/>
      </div>

      </div>
      <div className="footer">
        <p>Designed and Coded by</p>
        <p className="author">Erick Rojas</p>
      </div>

    </div>
  );
}


