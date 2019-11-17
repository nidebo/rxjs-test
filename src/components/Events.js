import React from 'react';
import { Button } from './Button';

const Event = ({ event }) => (
    <div>
        <div>Data: {event.data || "None"}</div>
        <div>Error: {event.error || "None"}</div>
    </div>
);

export const Events = () => {
    const [state, setState] = React.useState([]);

    return (
        <div>
            <Button setEvents={setState} />
            {state.map((event, i) => (
                <Event key={i} event={event} />
            ))}
        </div>
    );
};
