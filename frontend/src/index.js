import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './pages/Homepage';
import AddNode from './components/Modal';
import { Route, BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
import { queryClient } from './api';
import { QueryClientProvider } from 'react-query';
import { StoreProvidor } from './store';
import moment from 'moment';

export const Main = () => {
    return (
        <Fragment>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/insert">
                <AddNode />
            </Route>
        </Fragment>
    );
};

const fetchNode = async id => {
    let url = 'http://localhost:5000/api/node';
    if (id) {
        url += `?id=${id}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    return result.node[0];
};

const printNode = ({ firstName, lastName, birthday, children }) => {
    return (
        <Fragment>
            <li>
                <span>{`${firstName} ${lastName} (${moment(new Date(birthday)).format(`DD-MM-YYYY`)})`}</span>
                {children.length ? <ul>{children.map(e => printNode(e))}</ul> : null}
            </li>
        </Fragment>
    );
};

const getData = async () => {
    const fetchChildren = async node => {
        if (!node.children.length) return [];
        node.children = await Promise.all(
            node.children
                .filter(el => el)
                .map(async id => {
                    const _node = await fetchNode(id);

                    if (_node.children) {
                        _node.children = await fetchChildren(_node);
                    }
                    return _node;
                }),
        );

        return node.children;
    };

    const node = await fetchNode();
    node.children = await fetchChildren(node);

    return node;
};

const MyComponent = () => {
    const [node, setNode] = useState();

    useEffect(() => {
        (async () => {
            setNode(await getData());
        })();
    }, []);

    return node ? printNode(node) : <h1>loading</h1>;
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvidor>
                <QueryClientProvider client={queryClient}>
                    <Main />
                </QueryClientProvider>
            </StoreProvidor>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
