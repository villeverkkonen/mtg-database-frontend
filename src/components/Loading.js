import React, { Component } from 'react'

class Loading extends Component {
  constructor(props) {
    super(props)

    this.modifyLoadingText = this.modifyLoadingText.bind(this)

    this.state = {
      loadingText: 'Loading',
      amountOfDots: 0,
      dotsIncreasing: true,
      loadingTextVisible: true
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.modifyLoadingText, 200)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  modifyLoadingText() {
    let loadingText = 'Loading'

    if (this.state.dotsIncreasing) {
      this.setState({ amountOfDots: this.state.amountOfDots + 1 })
    } else {
      this.setState({ amountOfDots: this.state.amountOfDots - 1 })
    }

    if (this.state.dotsIncreasing && this.state.amountOfDots === 3) {
      this.setState({ dotsIncreasing: false })
    }

    if (!this.state.dotsIncreasing && this.state.amountOfDots === 0) {
      this.setState({ dotsIncreasing: true })
    }

    for (let i = 0; i < this.state.amountOfDots; i++) {
      loadingText += '.'
    }
    this.setState({ loadingText })
  }

  render() {
    return (
      <div className="loading">
        <div className="loadingContent">
          <p>{this.state.loadingText}</p>
        </div>
      </div>
    )
  }
}

export default Loading
