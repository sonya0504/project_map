import React from 'react';
import styles from "./App.scss";
import imageSrc from './bukowa.jpg';

const App = () => (
    <div>
        <div className={styles.app}>
            <img src={imageSrc} alt='pani bukowa i wino' />
            To jest root aplikacji
        </div>
        <div>
            <div className='images'></div>
        </div>
    </div>
);

export default App;