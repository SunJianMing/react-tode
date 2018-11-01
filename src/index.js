import React, {Component, createRef, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Todo from './components/todo';
import Footer from './components/footer';

import './main.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        }
        this.inputValue = createRef()

    }
    onKeyDown = (ev) => {
        let {todoList} = this.state;
        let {value} = this.inputValue.current;

        if (ev.keyCode !== 13 || !value.trim())
            return;

        this.setState({
            todoList: [
                {
                    id: Math.random(),
                    content: value,
                    hasCompleted: false
                },
                ...todoList
            ]
        }, () => {
            this.inputValue.current.value = ''
        })

    }
    deleteTodo = (id) => {
        let {todoList} = this.state;
        todoList = todoList.filter(elt => {
            return elt.id !== id
        })
        this.setState({todoList})
    }
    todoToggle = (id) => {
        let {todoList} = this.state;
        todoList = todoList.map(elt => {
            if (elt.id === id) {
                elt.hasCompleted = !elt.hasCompleted
            }
            return elt
        })
        this.setState({todoList})
    }
    toggleAll = (ev) => {

        let {todoList} = this.state;
        todoList = todoList.map(elt => {
            elt.hasCompleted = ev.target.checked
            return elt
        })
        this.setState({todoList})
    }
    editContent = (id, content) => {
        let {todoList} = this.state;
        todoList = todoList.map(elt => {
            if (elt.id === id) {
                elt.content = content
            }
            return elt
        })
        this.setState({todoList})
    }
    clearCompleted = () => {
        let {todoList} = this.state;
        todoList = todoList.filter(elt => {
            return !elt.hasCompleted
        })

        this.setState({todoList})
    }
    changeView = (view) => {
        this.setState({view})
    }
    render() {
        let {location:{pathname:url}} = this.props;
        console.log(this.props.match);

        let {todoList} = this.state;
        let leftItem = 0;
        let showTodoData = todoList.filter(elt => {
          if(!elt.hasCompleted) leftItem++;
            switch (url) {

                case '/active':
                    return !elt.hasCompleted

                case '/completed':
                    return elt.hasCompleted
                default:
                  return true
            }
        })

        let todo = showTodoData.map(elt => {
            return <Todo key={elt.id} {...{
                id:elt.id,
                content:elt.content,
                hasCompleted:elt.hasCompleted,
                todoToggle:this.todoToggle,
                deleteTodo:this.deleteTodo,
                editContent:this.editContent
              }}/>
        })

        let activeTodo = todoList.find(elt => elt.hasCompleted === false)
        let completedTodo = todoList.find(elt => elt.hasCompleted)

        return (<div>
            <header className="header">
                <h1>todos</h1>
                {/* 输入框 */}
                <input type="text" className="new-todo" placeholder="type something here" onKeyDown={this.onKeyDown} ref={this.inputValue}/>
            </header>

            {
                todoList.length > 0 && (<Fragment>
                    <section className="main">
                        {/* 全选按钮 */}
                        <input type="checkbox" className="toggle-all" checked={!activeTodo && todoList.length} onChange={this.toggleAll}/>
                        <ul className="todo-list">
                            {todo}
                        </ul>
                    </section>
                    <Footer {...{
                              clearCompleted:this.clearCompleted,
                              showClearButton:completedTodo && todoList.length,
                              leftItem,
                              url
                            }}/>
                </Fragment>)
            }
        </div>)
    }
}

ReactDOM.render(
  <Router>
    <Route path='/'  component={TodoList}/>

  </Router>
  , document.getElementById('root'))
