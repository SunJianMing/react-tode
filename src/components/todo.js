import React,{createRef} from 'react'


export default class  extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inEdit:false
    }
    this.editInput = createRef()
  }
  onEdit = ()=>{
    let input = this.editInput.current;
    let {content} = this.props
      this.setState({
        inEdit:true
      },()=>{
          input.value = content
          input.focus()
      })
  }
  onBlur = ()=>{
      if(!this.state.inEdit) return;
      this.setState({
        inEdit:false
      })
      this.commitAlert()
  }
  commitAlert(){
    let {current:input} = this.editInput;
    let content = input.value.trim()
    let {id} = this.props
    if(content)
      this.props.editContent(id,content)
    else
      this.props.deleteTodo(id)
  }
  onKeyDown = (ev)=>{
      if(ev.keyCode === 27 || ev.keyCode === 13){
        this.setState({
          inEdit:false
        })
      }
      if(ev.keyCode === 13){
        this.commitAlert()
      }
  }
  render(){
    let {id,content,hasCompleted,todoToggle,deleteTodo} = this.props;
    let {inEdit} = this.state;
    let className = hasCompleted?'completed':''
    className = inEdit?hasCompleted+' editing':className
    return (<li
      // className="completed"
      // className="editing"
      className = {className}
    >
      <div className="view">
        {/* 勾选按钮 */}
        <input
          type="checkbox"
          className="toggle"
          checked = {hasCompleted}
          onChange = {()=>{todoToggle(id)}}
        />
        {/* todo 的内容 */}
        <label ref="label"
            onDoubleClick={this.onEdit}
          >
          {content}
        </label>
        {/* 删除按钮 */}
        <button
          className="destroy"
          ref="btn"
          onClick = {()=>deleteTodo(id)}
        ></button>
      </div>
      {/* 编辑 todo 的输入框 */}
      <input
        type="text"
        className="edit"
        ref={this.editInput}
        onBlur = {this.onBlur}
        onKeyDown = {this.onKeyDown}
      />
    </li>)
  }
}
