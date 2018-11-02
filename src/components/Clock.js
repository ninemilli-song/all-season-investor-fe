import React from 'react';

const pad = n => (n < 10 ? `0${n}` : n);

const format = t => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;

export default (props) => {
    const { light, lastUpdate } = props;
    return (
        <div className={light ? 'light' : ''}>
            { format(new Date(lastUpdate)) }
            <style jsx>
                {` 
                    div { 
                        padding: 15px;
                        color: #82FA58;
                        display: inline-block;
                        font: 50px menlo, monaco, monospace;
                        background-color: #000;
                    }
                    .light {
                        background-color: #999;
                    }
                `}
            </style>
        </div>
    );
};
