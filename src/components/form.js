import React, { Component } from 'react';
import Lis from './lis';
import Chart from './Chart'


export default class Form extends Component {
    state = {
        habit: {
            habi: '',
            id:'',
            doneHabit: null
        },
        habits: [],
    }

    componentDidMount = async () => {
        const habits = JSON.parse(localStorage.getItem('habits'))
        if(habits) {
            this.setState({ 
                habits
            });
        }
    }
    handleChange = (e) => {
        this.setState({
            habit: {
                habi: e.target.value,
                id: Math.random(),
                doneHabit: false
            },
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();

        await this.setState({
            habits: [ ...this.state.habits, this.state.habit ],
        })
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }

    // mark all habits as unfulfilled
    reset = () => {
        const newHabits = this.state.habits.map( item => {
            item.doneHabit = false
            return item
        })
        this.setState({
            habits: newHabits
        });
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }
    // delete select habit
    Delet = async (el) => {
        await this.setState({
            habits: this.state.habits.filter(habits => habits.id !== el.id)
        });
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }
    // changes habit style
    saveChange = (id) => {
        const newHabits = this.state.habits.map( item => {
            if(item.id === id) {
                item.doneHabit = !item.doneHabit
            }
            return item
        })
        this.setState({
            habits: newHabits
        });
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }
    // changes habit text
    textEdit = (er, id) => {
        const newHabits = this.state.habits.map( item => {
            if(item.id === id) {
                item.habi = er
            }
            return item
        })
        this.setState({
            habits: newHabits
        });
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }
    // number of habits performed 
    doneHabits = () => {
        const doneHabits = this.state.habits.map(el => {
            return el.doneHabit;
        })
        const count = doneHabits.reduce( (tally, habit) => {
            tally[habit] = (tally[habit] || 0) + 1 ;
            return tally;
          }, {})
        return count.true
    }

    upArrow = async (el) => {
        const ind = this.state.habits.indexOf( el )
        const pos = this.state.habits.splice( ind, 1 )
        this.state.habits.splice( ind-1, 0, pos[0] )
        this.setState({
            habits: this.state.habits
        });
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }
    
    downArrow = async (el) => {
        const ind = this.state.habits.indexOf( el )
        const pos = this.state.habits.splice( ind, 1 )
        this.state.habits.splice( ind+1, 0, pos[0] )
        this.setState({
            habits: this.state.habits
        });
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
    }

    render() {
        const { habits } = this.state;
        // habits.reverse();
        return (
        <div>
            <form className="form" onSubmit={this.handleSubmit}>
                <input 
                    required
                    autoComplete="off"
                    type="text" 
                    placeholder="Write down your habit"
                    id="habi" 
                    onChange={this.handleChange} />
                <button> Add </button>
            </form>

            <div className="main-content">
                <div className="habits-list">

                    <div className="info">
                        <button onClick={this.reset} > Reset </button> 
                        <span>
                            You have { habits.length } { habits.length > 1 ? "habits" : "habit" }!
                        </span>
                    </div>
                    { habits.length > 0 ?
                        ''
                        : 
                        <div className="put-your-habits">
                            Your list of habits is clean, enter habit in form
                        </div> }
                    { habits.map( (el, index) => {
                        return(
                            <div className="habit-wrapper"  key={index}>
                                <Lis 
                                    el={el}
                                    Delet={this.Delet}
                                    SeveChange={this.saveChange}
                                    Text={this.textEdit}
                                    DoneHabits = {this.doneHabits}
                                    UpArrow={this.upArrow}
                                    DownArrow={this.downArrow}
                                />
                            </div>
                        )
                    }) }
                </div>
                
                <Chart
                   AllHabits={habits.length}
                   DoneHabits={this.doneHabits()}
                />
            </div>

        </div>
            
        )
    }
}


