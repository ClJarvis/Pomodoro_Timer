import './App.css';
import Timer from './Timer';
import Settings from './Settings';
import {useState} from 'react';
import SettingsContext from './SettingsContext';

function App() {

const [showSettings, setShowSettings] = useState(false);
const [studyMinutes, setStudyMinutes] = useState(45);
const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <SettingsContext.Provider value ={{
        showSettings,
        setShowSettings,
        studyMinutes,
        breakMinutes,
        setStudyMinutes,
        setBreakMinutes,
      }}>
      {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
