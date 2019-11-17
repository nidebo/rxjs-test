import React from 'react';
import { fromEvent, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, retry, tap, scan, catchError, flatMap } from 'rxjs/operators';

const URL = '/data';

const fetchData = (val) => fromFetch(`${URL}/${val}`).pipe(
    flatMap(res => res.json()
        .then(body => {
            if (body.error) {
                throw body;
            }
            return body;
        })
    ),
    retry(1),
    catchError((err) => of(err))
);

export const Button = ({ setEvents }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        const obs$ = fromEvent(ref.current, 'click').pipe(
            scan((acc) => acc + 1, 0),
            tap((val) => console.log(`click #${val}`)),
            switchMap(fetchData)
        );

        obs$.subscribe((result) => {
            console.log('subscriber received:', result);
            setEvents(events => [...events, result])
        });
    }, []);

    return (
        <button ref={ref}>Go fetch</button>
    );
};
