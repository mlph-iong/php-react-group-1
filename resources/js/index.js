import React from 'react';
import App from './App';
import Navigation from './modules/navigation/Navigation'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Main from './modules/Main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'


function Index() {
    library.add(fab, faCalendar)
    library.add(fab, faTrash)
    library.add(fab, faPencilAlt)
    return (
        <BrowserRouter>
            <Navigation />
            <div className="container mt-4">
                <Main />
            </div>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}