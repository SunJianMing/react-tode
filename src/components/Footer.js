let propTypes = {
  leftCount:PT.number,
  clearAllCompleted:PT.func,
  isShowClearButton:PT.bool,
  viewChange:PT.func,
  view:PT.oneOf(['all','active','completed'])
}
export default class Footer extends React.Component {
  render(){
    let {leftCount,clearAllCompleted,isShowClearButton,view,viewChange} = this.props
    let clearButton = null;
    if(isShowClearButton){
      clearButton = (
        <button className="clear-completed" onClick={clearAllCompleted}>
        clear all completed
      </button>)
    }
    return (
      <footer className="footer">
        <span className='todo-count'>
          <strong>{leftCount}</strong>
          <span>item left</span>
        </span>
        <ul className="filters">
          <li>
            <a href="#/all"
              className = {view === 'all'?'selected':''}
              onClick = {ev=>viewChange('all')}
            >All</a>
          </li>
          <li>
            <a href="#/active"
              className = {view === 'active'?'selected':''}
                onClick = {ev=>viewChange('active')}
            >Active</a>
          </li>
          <li>
            <a href="#/completed"
              className = {view === 'completed'?'selected':''}
                onClick = {ev=>viewChange('completed')}
            >Completed</a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}
Footer.propTypes = propTypes
