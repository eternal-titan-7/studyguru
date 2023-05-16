import React from 'react';
import "./progress.css"
import { decorateFileSize } from './progressUtils';

function Progress({ args }) {
    const [current, max] = args;
    const progress = (current / max) * 100;
    const status = `${decorateFileSize(current)}/${decorateFileSize(max)} ${progress.toFixed(2)}%`;

    return (
        <div className="progress-box">
            <div className='progress-detail'>{status}</div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress.toFixed(0)}%` }}></div>
            </div>
        </div>
    );
}

export default Progress;