import Item from 'Item.js'
import Footer from 'Footer.js'

import 'css/base.css'
import 'css/index.css'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todoData : [],
      inputValue : '',
      view:'all'
    }
    this.addItemHandler = this.addItemHandler.bind(this)
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.destroyItemHandler = this.destroyItemHandler.bind(this);
    this.clearAllCompleted = this.clearAllCompleted.bind(this);
    this.allCompleted = this.allCompleted.bind(this);
    this.onItemToggle = this.onItemToggle.bind(this)
    this.viewChange = this.viewChange.bind(this)
    this.changItemValue = this.changItemValue.bind(this)
  }
  // 视图状态
  viewChange(view){
    this.setState({
      view
    })
  }
  //增加todo
  addItemHandler(ev){
    if(ev.keyCode !== 13) return;
    let {inputValue,todoData} = this.state;
    if(inputValue === '') return;
    let todo = {}
    todo.id = +new Date();
    todo.value = inputValue;
    todo.hasCompleted = false;
    todoData.unshift(todo)
    this.setState({
      todoData,
      inputValue:''
    })
  }
  //删除todo
  destroyItemHandler(todo){
    let {todoData} = this.state;
    todoData = todoData.filter(elt=>{
      return elt.id !== todo.id
    })
    this.setState({
      todoData
    })
  }
  // 当输入值时，触发
  inputChangeHandler(ev){
    this.setState({
      inputValue:ev.target.value
    })
  }
  //删除所以选中的completed
  clearAllCompleted(){
    let {todoData} = this.state
    todoData = todoData.filter(elt=>{
      return !elt.hasCompleted
    })
    this.setState({
      todoData
    })
  }
  //全选或全不选
  allCompleted(ev){
    let {checked} = ev.target

    let {todoData} = this.state;
    todoData = todoData.map(elt=>{
      elt.hasCompleted = checked
      return elt;
    })
    console.log(todoData)
    this.setState({
      todoData
    })
  }
  // 单个item的选中或取消选中
  onItemToggle(todo){
    let {todoData} = this.state
    todoData = todoData.map(elt=>{
      if(elt.id === todo.id){
        elt.hasCompleted = !elt.hasCompleted
      }
      return elt;
    })
    this.setState({
      todoData
    })
  }
  //修改todo的value
  changItemValue(todo,value){
    let {todoData} = this.state;
    todoData = todoData.map(elt=>{
      if(elt.id === todo.id){
        elt.value = value
      }
      return elt;
    })
    this.setState({
      todoData
    })
  }
  render(){
    let {todoData,inputValue,view} = this.state
    let {inputChangeHandler,
          addItemHandler,
          destroyItemHandler,
          clearAllCompleted,
          allCompleted,
          onItemToggle,
          viewChange,
          changItemValue
        } = this

    let items = null,
        itemsBox = null,
        footer = null;
    let leftCount = todoData.length

    items = todoData.filter(elt=>{
      if(elt.hasCompleted) leftCount--;
      switch (view) {
        case 'active':
            return !elt.hasCompleted
          break;
        case 'completed':
            return elt.hasCompleted
          break;
        default:
          return true;
      }
    })

    items = items.map((elt,i)=>{
      return <Item key={i} {...{todo:elt,destroyItemHandler,onItemToggle,changItemValue}}/>
    })
    if(todoData.length){
      itemsBox = (
        <section className='main'>
          <input
            type="checkbox"
            className="toggle-all"
            checked = {leftCount === 0}
            onClick = {allCompleted}
          />
          <ul className="todo-list">
            {items}
          </ul>
        </section>
      )
      footer = (<Footer {...{
                              leftCount,
                              clearAllCompleted,
                              isShowClearButton:leftCount<todoData.length,
                              view,
                              viewChange
                            }}/>)
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input type="text"
            value={inputValue}
            className="new-todo"
            onChange= {inputChangeHandler}
            onKeyDown = {addItemHandler}
          />
        </header>
        {itemsBox}
        {footer}
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)
