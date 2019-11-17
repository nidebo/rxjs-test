import React from 'react';
import ReactDOM from 'react-dom';
import { MyApp } from './components/MyApp';

function App() {
    return (
        <MyApp />
    );
}

const app = document.createElement('div');
app.className = 'app';

const body = document.getElementsByTagName('body')[0];
body.append(app);

ReactDOM.render(<App />, app);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

