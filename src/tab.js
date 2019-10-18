import React, {Component} from 'react';

class Tab extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      w: 0,
      myTimer: null,
      setTimer: null,
      transitions: 0
    }
  }

  componentDidMount() {
    this.autoPlay(); 
  }

  autoPlay() {
    clearInterval(this.state.myTimer);
    clearInterval(this.state.setTimer);

    this.state.myTimer = setTimeout(() => {
      this.setState({
        transitions: this.props.tabJson.timer/1000,
        w: 100
      });
    }, 0);

    this.state.setTimer = setInterval(() => {
      this.setState({
        index: this.state.index + 1 == this.props.tabJson.picUrl.length ? 0 : this.state.index + 1,
        transitions: 0,
        w: 0
      });
      setTimeout(() => {
        this.setState({
          transitions: this.props.tabJson.timer/1000,
          w: 100
        });
      }, 10);
    }, this.props.tabJson.timer);
  }

  click(i) {
    this.setState({
      index: i
    });
  }

  leftClick() {
    this.setState({
      index: this.state.index - 1 == -1 ? this.props.tabJson.picUrl.length - 1 : this.state.index - 1
    });
  }

  rightClick() {
    this.setState({
      index: this.state.index + 1 == this.props.tabJson.picUrl.length ? 0 : this.state.index + 1
    });
  }

  mouseOver() {
    clearInterval(this.state.myTimer);
    clearInterval(this.state.setTimer);
    this.setState({
      transitions: 0,
      w: 0
    });
  }

  mouseOut() {
    this.autoPlay(); 
  }
  
  render() {
    let aLi = [], alio = [];
    this.props.tabJson.picUrl.forEach((v, i) => {
      aLi.push(<li key={i}><img src={v} /></li>);
      alio.push(<li key={i} className={this.state.index == i ? 'active' : ''} onClick={this.click.bind(this, i)}></li>);
    });
    return (
      <div className="tab" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
        <div className="line" style={{transition: this.state.transitions + 's linear', width: this.state.w + '%'}}></div>
        <div className="left" onClick={this.leftClick.bind(this)}></div>
        <ul style={{width: this.props.tabJson.picUrl.length * 960, left: this.state.index*-960}}>
          {aLi}
        </ul>
        <div className="right" onClick={this.rightClick.bind(this)}></div>
        <ol>
          {alio}
        </ol>
      </div>
    )
  }
}

export default Tab;
