import React, { useContext } from 'react';
import { Store } from '../store';
import moment from 'moment';

export default function Card(props) {
    const { state, setState } = useContext(Store);

    return (
        <div onDoubleClick={props.onDoubleClick} onClick={props.onClick} className={`card ${state.selected?._id === props._id ? 'selected' : ''}`}>
            <img src="https://img.icons8.com/plasticine/2x/person-male.png" />
            <h5 style={{ color: 'rgba(180, 38, 85)' }}>{`${props.firstName} ${props.lastName}`}</h5>
            <p style={{ color: 'rgba(180, 38, 85)' }}>{moment(new Date(props.birthday)).format(`DD-MM-YYYY`)}</p>
        </div>
    );
}
