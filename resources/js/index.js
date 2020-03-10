import React, { useState } from 'react'
import Navigation from './modules/navigation/Navigation'
import { BrowserRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import ReactDOM from 'react-dom'
import Main from './modules/Main'
import { isLoggedInChecker } from "./modules/utils/Utils"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

function Index() {
    library.add(fab, faCalendar)
    library.add(fab, faTrash)
    library.add(fab, faPencilAlt)
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInChecker());
    const setAuthorizationBearer = () => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("usertoken")
    }
    const changeIsLoggedIn = (isLoggedInVal) => {
        setIsLoggedIn(isLoggedInVal);
        if(isLoggedInVal) {
            setAuthorizationBearer();
        }
    }
    setAuthorizationBearer();

    return (
        <BrowserRouter>
            <Navigation changeIsLoggedIn = { changeIsLoggedIn } isLoggedIn = { isLoggedIn } />
            <div className="container mt-4">
                <Main changeIsLoggedIn = { changeIsLoggedIn } />
            </div>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}