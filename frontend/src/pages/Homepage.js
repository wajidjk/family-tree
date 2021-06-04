import React, { useContext, useEffect, useState } from 'react';
import Search from '../components/Search';
import Card from '../components/Card';
import Add from '../components/Add';
import { useQuery } from 'react-query';
import Divider from '../assets/divider.png';
import { Fragment } from 'react';
import { Store } from '../store';
import { useHistory, useLocation } from 'react-router';
import moment from 'moment';

const fetchNode = async id => {
    let url = 'http://localhost:5000/api/node';
    if (id) {
        url += `?id=${id}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    return result.node[0];
};

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

export default function Homepage() {
    const location = useLocation();
    const history = useHistory();

    const { state, setState } = useContext(Store);

    const { data, error, isLoading, refetch } = useQuery(
        'node',
        async () => {
            let id = new URLSearchParams(location.search).get('id');
            const node = await fetchNode(id);
            node.children = await fetchChildren(node);
            return node;
        },
        {},
    );

    useEffect(() => {
        refetch();
    }, [new URLSearchParams(location.search).get('id')]);

    console.log({
        state,
        data,
    });

    const printNode = node => {
        return (
            <Fragment>
                <li>
                    <Card
                        onClick={e => {
                            setState(prev => ({ ...prev, selected: node }));
                        }}
                        onDoubleClick={e => {
                            history.push(`/?id=${node._id}`);
                        }}
                        {...node}
                    />
                    {node.children.length ? <ul>{node.children.map(e => printNode(e))}</ul> : <Fragment></Fragment>}
                </li>
            </Fragment>
        );
    };

    return (
        <div className="main_div">
            <div className="center_div">
                <div className="header">
                    <p style={{ fontSize: 25, color: 'rgba(180, 38, 85)' }}>Family Tree</p>
                    <div>
                        <Add node={data} />
                    </div>
                </div>

                <br />
                {data ? printNode(data) : <h1>loading</h1>}
            </div>
        </div>
    );
}
