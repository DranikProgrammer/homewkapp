import React, { Component } from 'react';
import logo from './logo.svg';

import { createMuiTheme,withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TaskList from './cps/TaskList'
import TaskAdder from './cps/TaskAdder'
import DebugPane from './cps/DebugPane'
import LoginForm from './cps/LoginForm'
import MsgList from './cps/MsgList'
import Edit from './cps/Edit'

import NavMG from './stores/NavMG'
import S from './base/appstate'
import SA from './actions/sa'


const fab_style = {
   position: 'fixed',
   bottom: 40,
   right: 50,
   width:40,
   height:40
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          s: NavMG.state()
        }
    }

    componentWillMount() {
       NavMG.change(this._stateChange.bind(this));
    }


    _stateChange(){
        console.log("APP:: " + this.state.s);
        this.setState({s:NavMG.state()});
    }

    _newItem(){
        SA.newitem();
    }

    //

    render() {
      if(this.state.s == S.BASE)return this.renderBase();
      else if(this.state.s == S.LOGIN)return this.renderLogin();
      else if(this.state.s == S.EDIT) return this.renderEdit();
      else if(this.state.s == S.LOAD){
        return (<p>M gonna check your coooookies</p>)
      }

    }


    renderEdit(){
        return(
          <Edit />
        )
    }

    renderLogin(){
        return (
          <LoginForm />
        )
    }

    renderBase(){
      return (
        <div className="App">
          <MsgList />
          <br/>
          <TaskList />
          <br/>
          <Button
            style={fab_style} color="secondary"
            variant="fab" aria-label="delete"
            onClick={this._newItem.bind(this)}>
            <AddIcon />
          </Button>
        </div>
      );
    }

}




export default (App);
