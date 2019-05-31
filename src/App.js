import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Form from './components/Form';
import './App.css';
import Footer from "./components/Footer";

class App extends Component {

    state = {
        todos:[],
        active_elms:0,
    };

    handleAddTodo = event => {
        event.preventDefault();
        const todo_name = document.getElementById('main').value;
        const re = /[A-Za-z0-9]+/;
        if(re.test(todo_name)) {
            const obj = {id: this.state.todos.length*Math.ceil(Math.random()*100), name: todo_name, class: 'todoDiv active_todo',completed:false,container_class:'shown'};
            this.setState(prevState => ({
                todos: [...prevState.todos, obj]
            }));
            document.getElementById('main').value = '';
            const act_elms = this.state.active_elms;
            this.setState({active_elms:act_elms+1});
        }
    };

    dblClick = event => {
        event.target.removeAttribute('disabled');
        event.target.focus();
    };

    changeTodo = (e) => {
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
        document.querySelector('#input'+index).setAttribute('disabled','disabled');
    };

    handleChangeInput = (id) => {
        const val = document.querySelector('#input'+id).value;
        const todos = this.state.todos;
        todos.map(todo => todo.name = todo.id == id ? val : todo.name);
        this.setState({todos});

    };

    checkTodo = (e) => {
        const id = e.target.getAttribute('data-id');
        document.querySelector('#row'+id).classList.toggle('completed');
        document.querySelector('#row'+id).classList.toggle('active_todo');
        const todos = [...this.state.todos];
        todos.map(todo => todo.completed = todo.id == id ? todo.completed == false ? true : false : todo.completed);
        if (document.getElementById('main_container').classList.contains('filtered_compl')) {
            todos.map(todo => todo.completed == true ? todo.container_class = 'shown completed':todo.container_class = 'hidden active_todo');
        }
        if (document.getElementById('main_container').classList.contains('filtered_act')) {
            todos.map(todo => todo.completed == true ? todo.container_class = 'hidden completed':todo.container_class = 'shown active_todo');
        }
        this.setState({todos});
        const elms = this.state.active_elms;
        this.setState({active_elms:document.querySelector('#row'+id).classList.contains('completed') ? elms-1:elms+1});
    };

    handleDelete = todo_id => {
        const todos = this.state.todos.filter(todo => todo_id !== todo.id);
        this.setState({todos});
        const act_elms = this.state.active_elms;
        const count =  document.querySelector('#row'+todo_id).classList.contains('completed') ?  act_elms:act_elms-1;
        document.querySelector('#row'+todo_id).classList.contains('active_todo') && this.setState({active_elms: count});
    };

    handleCompleted = (e) => {
        if (!document.getElementById('main_container').classList.contains('filtered_compl')) {
            document.getElementById('main_container').classList.add('filtered_compl');
            document.getElementById('main_container').classList.remove('filtered_act');
        }
        e.preventDefault();
        const todos = [...this.state.todos];
        todos.map(todo => todo.completed == true ? todo.container_class = 'shown completed':todo.container_class = 'hidden active_todo');
        this.setState({todos});
    };

    handleActive = () => {
        if (!document.getElementById('main_container').classList.contains('filtered')) {
            document.getElementById('main_container').classList.add('filtered_act');
            document.getElementById('main_container').classList.remove('filtered_compl');
        }
        const todos = [...this.state.todos];
        todos.map(todo => todo.completed == false ? todo.container_class = 'shown active_todo':todo.container_class = 'hidden');
        this.setState({todos})
    };

    handleAll = () => {
        if (document.getElementById('main_container').classList.contains('filtered_act')) {
            document.getElementById('main_container').classList.remove('filtered_act');
        }
        if (document.getElementById('main_container').classList.contains('filtered_compl')) {
            document.getElementById('main_container').classList.remove('filtered_compl');
        }
        const todos = [...this.state.todos]
        todos.map(todo => todo.completed == true ? todo.container_class = 'shown completed':todo.container_class = 'shown active_todo');
        this.setState({todos})
    };

    handleClearCompleted = () => {
        const todos =this.state.todos.filter(t => t.completed == false);
        this.setState({todos})
    };

    handleCheckAll = e => {
        const that = e.target;
        that.classList.toggle('active_big');
        const todos = [...this.state.todos];
        if (that.classList.contains('active_big')) {
            todos.map(todo => {
                todo.completed = true;
                todo.container_class = 'shown completed'
            });
            this.setState({todos})
            this.setState({active_elms:0})
        }else{
            todos.map(todo => {
                todo.completed = false;
                todo.container_class = 'active_todo shown'
            });
            this.setState({todos})
            this.setState({active_elms:this.state.todos.length})
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6" id={'main_container'}>
                        <div className="row mt-2">
                            <Form onSubmit={this.handleAddTodo} handleCheckAll={this.handleCheckAll} activeElms={this.state.todos.length} completedElms={this.state.todos.filter(t=>t.completed == true).length} />
                        </div>
                        {this.state.todos.map((todo,index) =>
                            <div onDoubleClick={ this.dblClick } key={todo.id} className={'row ml-0 mr-0 mt-2 justify-content-around todo ' + todo.container_class} id={'row'+todo.id}>
                                <div className={'check'} data-id={todo.id} onClick={this.checkTodo}><i className="fas fa-check check_icon" data-id={todo.id}></i></div>
                                <form onSubmit={this.changeTodo} data-index={todo.id}>
                                    <input className={todo.class+' form-control'} disabled={true} onBlur={this.changeTodo} id={'input'+todo.id} onChange={()=>this.handleChangeInput(todo.id)} data-index={todo.id} defaultValue={todo.name}/>
                                </form>
                                <button className='fas fa-trash-alt btn btn-transparent bg-transparent' data-id={todo.id} onClick={() => this.handleDelete(todo.id)}></button>
                            </div>
                        )}
                        { this.state.todos.length > 0 && <Footer itemsLeft={this.state.active_elms} completedElms={this.state.todos.filter(t=>t.completed == true).length} handleAll={this.handleAll} handleActive={this.handleActive} handleCompleted={this.handleCompleted} handleClearCompleted={this.handleClearCompleted} /> }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
