import React from 'react'
import { Link } from 'react-router-dom'
export default function (props){
  let {clearCompleted,showClearButton,leftItem,url} = props;
  return (<footer className="footer">
    <span className="todo-count">
      <strong> {leftItem} </strong>
      <span>item left</span>
    </span>
    <ul className="filters">
      <li>
        <Link
          className={url === '/'?"selected":''}
          // onClick = {()=>changeView('all')}
          to='/'
        >All</Link>

      </li>
      <li>
        <Link
          className={url === '/active'?"selected":''}
          // onClick = {()=>changeView('active')}
          to='/active'
        >Active</Link>

      </li>
      <li>
        <Link
          className={url === '/completed'?"selected":''}
          // onClick = {()=>changeView('completed')}
          to='/completed'
        >Completed</Link>

      </li>
    </ul>
    {/* 清除完成按钮 */}
    {showClearButton && (<button
      className="clear-completed"
      onClick = {clearCompleted}
    >
      clear all completed
    </button>)}

  </footer>)
}
