import React from 'react';
import './myStyles.css';

function RecentFiles() {
  return (
    <div className='recent-files'>
                <div className='recent-files-data'>
                    <div className='heading'>
                       Recent Files
                    </div>
                    <div className='divider'>
                        ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    </div>
                    <div className='table-cell-heading'>
                        <div className='table-cell-icon'>
                             <input className = "check-box" type='checkbox'></input>
                        </div>
                        <div className='name'>
                            name

                        </div>
                        <div className='type'>
           type
                        </div>
                        <div className='duration'>
duration
                        </div>
                        <div className='Date-created'>
Date created
                        </div>
                        <div className='Last-Updated'>
                        Last Updated
                        </div>
                        <div className='Action'>
Action
                        </div>

                    </div>
                    <div className='table-cell-heading'>
                        <div className='table-cell-icon'>
                             <input className='check-box' type='checkbox'></input>
                        </div>
                        <div className='name'>
                            name

                        </div>
                        <div className='type'>
           type
                        </div>
                        <div className='duration'>
duration
                        </div>
                        <div className='Date-created'>
Date created
                        </div>
                        <div className='Last-Updated'>
                        Last Updated
                        </div>
                        <div className='Action'>
Action
                        </div>

                    </div>

                </div>
            </div>

  )
}

export default RecentFiles