import React from 'react';
import { Router, Route, Link, HashRouter, MemoryRouter } from 'react-router-dom'; // BrowserRouter => Router(Plain Router) / when use history object
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className='ui container'>
            
            <Router history={history}>
                <div>
                    <Header />
                    <Route path='/' exact component={StreamList} />
                    <Route path='/streams/new' exact component={StreamCreate} />
                    <Route path='/streams/edit/:id' exact component={StreamEdit} />
                    <Route path='/streams/delete' exact component={StreamDelete} />
                    <Route path='/streams/show' exact component={StreamShow} />
                    {/* if Route path contains exact keyword, "/pagetwo" won't contain "/" */}
                </div>
            </Router>
        </div>
    );
}

export default App;