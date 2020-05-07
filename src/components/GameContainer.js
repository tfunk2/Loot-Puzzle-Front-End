import React, { Component } from 'react'
import MakeBoxes from './MakeBoxes'
import Timer from './Timer'
import TotalMisses from './TotalMisses'
import GameResultContainer from './GameResultContainer'

export default class GameContainer extends Component {

    state = {
        gameStartedStatus: false,
        gameCompletedStatus: false,
        userId: null,
        totalMisses: 0,
        mostRecentTime: null,
        mostRecentTotalMisses: null,
        leaderBoardClicked: false
    }

    componentDidMount() {
        fetch('http://localhost:3000/users', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        }).then(response => response.json())
            .then(users => this.findUserInfo(users))

            window.scrollTo(50, 50)
    }
    
    findUserInfo = (users) => {
        this.setUserInfo(users.find(user => user.username === this.props.usernameState))
    }

    setLeaderBoardStatus = () => {
        if (this.state.leaderBoardClicked === false) {
            this.setState({ leaderBoardClicked: true})
        } else {
            this.setState({ leaderBoardClicked: false})
        }
    }

    incrementTotalMisses = () => {
        this.setState({ totalMisses: this.state.totalMisses + 1 })
    }

    resetTotalMisses = () => {
        this.setState({ totalMisses: 0})
    }

    setUserInfo = (user) => {
        this.setState({ userId: user.id })
    }

    handleClick = () => {
        this.setState({ gameCompletedStatus: false })
        this.setState({ gameStartedStatus: true })
    }


    handleGameCompletion = () => {
        this.setState({ gameCompletedStatus: true })
        this.setState({ gameStartedStatus: false })
        this.props.resetBackpackItems()
    }

    setMostRecentScore = (recentCount) => {
        this.setState({ mostRecentTime: recentCount })
        this.setState({ mostRecentTotalMisses: this.state.totalMisses })
    }

    render() {
        return (
            <div className="game-container">
                {
                    this.state.gameStartedStatus === false ?
                        <div className="game-container-header">
                            <h2>{this.state.gameCompletedStatus === false ? 
                            "Grab the loot swiftly and accurately!" : ""}</h2>
                            <button onClick={this.handleClick}>Start Game!</button>
                        </div> : <></>
                }
                {
                    this.state.gameStartedStatus === true && 
                    this.state.gameCompletedStatus !== true ? 
                    <div id="timer-and-misses-div">
                        <Timer 
                            totalMisses={this.state.totalMisses} 
                            userId={this.state.userId} 
                            gameStartedStatus={this.state.gameStartedStatus}
                            resetTotalMisses={this.resetTotalMisses}
                            setMostRecentScore={this.setMostRecentScore}
                        />
                        <TotalMisses 
                        totalMisses={this.state.totalMisses} 
                        />
                    </div> : <></>
                }
                
                {
                    this.state.gameStartedStatus === true ? 
                    <MakeBoxes 
                        boxes={this.props.boxes} 
                        addToBackpack={this.props.addToBackpack}
                        checkBackpackForItem={this.props.checkBackpackForItem}
                        backpackItems={this.props.backpackItems}
                        handleGameCompletion={this.handleGameCompletion}
                        gameCompletedStatus={this.state.gameCompletedStatus}
                        incrementTotalMisses={this.incrementTotalMisses}
                        totalMisses={this.state.totalMisses}
                    /> : <></>
                }
                {
                    this.state.gameCompletedStatus === true ?
                    <GameResultContainer 
                        userId={this.state.userId}
                        mostRecentTime={this.state.mostRecentTime}
                        mostRecentTotalMisses={this.state.mostRecentTotalMisses}
                        usernameState={this.props.usernameState}
                        setLeaderBoardStatus={this.setLeaderBoardStatus}
                        leaderBoardClicked={this.state.leaderBoardClicked}
                    /> : <></>
                }
            </div>
        )
    }
}