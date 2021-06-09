import React, { Component } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

export default class Chart extends Component {

    render() {
        const { AllHabits, DoneHabits } = this.props
        const effectNam = ( 100 * ( DoneHabits ) / ( AllHabits ) ).toFixed(0)
        return (
            <div className="chart">
                <CircularProgressbarWithChildren value={effectNam > 0.1 ? effectNam : 0  }>
                    <img 
                        style={{ width: 150, marginTop: -5 }} 
                        src={ effectNam > 99 ? "https://pics.me.me/thumb_download-top-49-doge-meme-mlg-button-games-apps-50191910.png" : "https://i.imgur.com/b9NyUGm.png"  } 
                        alt="doge" /> 
                    <div className="chart-title">
                        Your progress:
                    </div>
                    <div style={{ fontSize: 32, marginTop: -5 }}>
                        <strong> { effectNam > 0.1 ? effectNam : 0 } %</strong> 
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        )
    }
}
