import React from 'react';
import './myStyles.css';
import Searchbox from './Searchbox';
import Msgbtn from './Msgbtn';
import FilesInfo from './FilesInfo';
import RecentFiles from './RecentFiles';

function WorkArea() {
  return (
    <div className='Workarea'>
       <Searchbox/>
       <Msgbtn/>
        <FilesInfo/>
        <RecentFiles/>
        
    </div>
  )
}

export default WorkArea;