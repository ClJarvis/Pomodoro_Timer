import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import {useContext, useState, useEffect, useRef} from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
	const settingsInfo = useContext(SettingsContext);

	const [isPaused, setIsPaused] = useState(true);
	const [mode, setMode] = useState('study');
	const [secondsLeft, setSecondsLeft] = useState(0);
	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);


	
	
	function switchMode() {
		const nextMode = modeRef.current === 'study' ? 'break' : 'work';
		const nextSeconds =(nextMode === 'study' ? settingsInfo.studyMinutes : settingsInfo.breakMinutes) * 60;

		setMode(nextModeRef);
		modeRef.current = nextMode;

		setSecondsLeft(nextSeconds);
		secondsLeftRef.c= nextSeconds;

	function tick() {
		secondsLeftRef.current = secondsLeftRef.current -1;
		setSecondsLeft(secondsLeftRef.current);
	}

	function initTimer() {
		setSecondsLeft(settingsInfo.studyMinutes * 60);
	}

	useEffect(() => {
		initTimer();

		const interval = setInterval(() => {
			if (isPausedRef.current){
				return;
			}
			if (secondsLeftRef.current === 0) {
			 return	switchMode();
			}
			tick();
		},1000);

		return() => clearinterval(interval);
	}, [settingsInfo]);

	const totalSeconds = mode === 'study'
	? settingsInfo.studyMinutes * 60 
	: settingsInfo.breakMinutes * 60;
	const percentage = Math.round(secondsLeft / totalSeconds * 100);
	const minutes = Math.floor(secondsLeft / 60);
	let seconds = secondsLeft % 60;
	if(seconds < 10) seconds = '0' + seconds; 

	return (
		<div>
			<CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles( {
				textColor:"fff",
				pathColor:mode === 'study' ? red : green,
				tailColor:'rgba(255,255,255,.2)',
			})} />
			
				<div style={{marginTop:'20px'}}>
				{isPaused 
					? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} /> 
					: <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
			</div>
			<div style={{marginTop:'20px'}}>
				<SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
			</div>
		</div>
		);
}

export default Timer;