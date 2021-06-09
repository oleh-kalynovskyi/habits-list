import React, { Component } from 'react';

// icons
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { BiCaretUpSquare} from 'react-icons/bi';
import { BiCaretDownSquare} from 'react-icons/bi';

export default class lis extends Component {

    state={
        editMode: true,
    }
    handleChange = (e) => {
        this.setState({
            changeText: e.target.value,
        })
        console.log('f');
    }
    // open input for habit text
    EditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        const { el, Delet, SeveChange, Text, UpArrow, DoneHabits, DownArrow } = this.props;
        return (
            <div 
                className="habit" 
                key={el.id}
                style={{ 
                    color: el.doneHabit ? 'blue' : '', 
                    textDecoration: el.doneHabit ? 'line-through' : '' }}>

                <div className="change-positon">
                    <BiCaretUpSquare onClick={ () => UpArrow(el) } className="btn" />
                    <BiCaretDownSquare className="btn" onClick={ () => DownArrow(el) } />
                </div>

                <input 
                    type="checkbox" 
                    onChange={ () => { DoneHabits(); SeveChange(el.id)} } 
                    checked={el.doneHabit} />

                <div className="habit-text"> 
                    { this.state.editMode 
                        ? 
                        <p> {el.habi}   </p>
                        :  
                        <div className="edit-habit-text">
                            <input 
                                id="editHabi"
                                type="text" 
                                defaultValue={el.habi}
                                onChange={  this.handleChange }
                                />
                            { this.state.changeText ? 
                                <MdDone 
                                    className="btn" 
                                    onClick={ () => { Text(this.state.changeText, el.id); this.EditMode(); } }/> 
                                : '' }
                            
                            <AiFillCloseCircle 
                                className="btn" 
                                onClick={ () => this.EditMode() }/>
                        </div> }
                </div>
                
                <div className="habit-btn"> 
                    <FaEdit 
                        style={{ color: this.state.editMode ? '' : 'blue'    }}
                        className="btn" 
                        onClick={ () => this.EditMode() }
                        /> 
                    <MdDeleteForever 
                        className="btn" 
                        onClick={ () => Delet(el) }/>
                </div>

            </div>
        )
    }
}
