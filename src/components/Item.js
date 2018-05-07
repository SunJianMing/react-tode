let propTypes = {
  todo:PT.object,
  destroyItemHandler:PT.func,
  onItemToggle:PT.func,
  changItemValue:PT.func
}
export default class Item extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inEdit:false,
      val:''
    }
    this.changInEdit = this.changInEdit.bind(this)
    this.valChange = this.valChange.bind(this)
    this.onEnter = this.onEnter.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.changItemValue = this.changItemValue.bind(this)
  }
  //双击编辑
  changInEdit(){
    let {value} = this.props.todo
    this.setState({
      inEdit:true,
      val:value
    },()=>this.refs.editInput.focus())


  }
  valChange(ev){
    let {value} = ev.target
    this.setState({
      val:value
    })
  }
  onBlur(){
    this.changItemValue()
  }
  onEnter(ev){
      if(ev.keyCode !== 13) return;
      this.changItemValue()
  }
  changItemValue(){
    this.setState({
      inEdit :false
    })
    let {changItemValue,todo} = this.props;
    changItemValue(todo,this.state.val)
  }
  render(){
    let {todo,destroyItemHandler,onItemToggle} = this.props
    let {inEdit,val} = this.state;
    let {changInEdit,valChange,onEnter,onBlur} = this
    let itemClass = null;
    if(inEdit){
      itemClass = 'editing'
    }
    return (
      <li className={itemClass}>
        <div className="view">
          <input
            checked = {todo.hasCompleted}
            type="checkbox"
            className="toggle"
            onChange={ev=>onItemToggle(todo)}
          />
          <label onDoubleClick = {changInEdit}>{todo.value}</label>
          <button className="destroy" onClick={ev=>{destroyItemHandler(todo)}}></button>
        </div>
        <input type="text"
           value={val}
           className="edit"
           onChange={valChange}
           onBlur = {onBlur}
            onKeyDown = {onEnter}
            ref='editInput'
         />
      </li>
    )
  }
}
Item.propTypes = propTypes
