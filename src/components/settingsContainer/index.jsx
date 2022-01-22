import React, { Component } from 'react';
import { setApiKey, setAutoplay, setFadeOut, setNumberOfResults, setOnlyHd  } from '../../actions/settingsActions';
import { connect } from 'react-redux';
import { checkYoutubeApiKey } from '../../services/ytApiService'

class SettingsContainer extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          show: false,
          apiKey: '',
          apiMessage: ''
        };
    
      }
    
    setApiMessage = (message) => {
        const root = this;
        this.setState({apiMessage: message}, () => setTimeout(function(){ root.setState({apiMessage: ''})}, 8000))
    }

    render() {
        return (
            <React.Fragment>
                <div className="addedPadding">
                    <button className="link" onClick={() => this.setState({show: !this.state.show})}>{this.state.show ? "Hide Settings" : "Show Settings"}</button> 
                    <div className={this.state.show ? "present" : "hidden"}>
                        <div className="settingsContainer"> 
                            <div align="center" style={{height: "90%"}}> 
                                <table style={{width: "60%", height: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>Fade Out Duration: 
                                                    <input name="Fade Out duration" type="number" style = {{ width: "50px" }} min="1" max="30"
                                                    onChange={(event) => this.props.setFadeOut(event.target.value)} 
                                                    value={this.props.fadeOut}
                                                />s</div>
                                            </td>
                                            <td>
                                                <div>Autoplay (on End): <input name="Autoplay" type="checkbox"
                                                    onChange={(event) => this.props.setAutoplay(event.target.checked)} 
                                                    checked={this.props.autoplay}
                                                /></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>Number of Search Results: <input name="Number of results" type="number" style = {{ width: "50px" }} min="1" max="10"
                                                    onChange={(event) => this.props.setNumberOfResults(event.target.value)} 
                                                    value={parseInt(this.props.numberOfResults)}
                                                /></div> 
                                            </td>
                                            <td>
                                                <div>Only HD results: <input name="Only HD" type="checkbox"
                                                    onChange={(event) => this.props.setOnlyHd(event.target.checked)} 
                                                    checked={this.props.onlyHd}
                                                /></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div>API KEY: <input name="API KEY" type="text" placeholder="Only apply if current does not work!" style={{width: "400px"}}
                                                    value={this.state.apiKey}
                                                    onChange={(event) => this.setState({apiKey : event.target.value})} 
                                                /></div>
                                                <button className="link" 
                                                    onClick={() => checkYoutubeApiKey(
                                                        this.state.apiKey,
                                                        () => { this.props.setApiKey(this.state.apiKey); this.setApiMessage('Success!')},
                                                        (error) => this.setApiMessage(error))
                                                    }
                                                    
                                                >Apply API Key</button>
                                                {this.state.apiMessage}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>                      
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = function(state) {
    return {
      fadeOut: state.settings.fadeout,
      autoplay: state.settings.autoplay,
      numberOfResults: state.settings.results,
      onlyHd: state.settings.onlyHd,
      apiKey: state.settings.apiKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      setFadeOut: (seconds) => dispatch(setFadeOut(seconds)), //forica sa ovim () i generalno sa tim arrow funkcijama? 
      setAutoplay: (value) => dispatch(setAutoplay(value)),
      setNumberOfResults: (number) => dispatch(setNumberOfResults(number)),
      setOnlyHd: (value) => dispatch(setOnlyHd(value)),
      setApiKey: (key) => dispatch(setApiKey(key))
    }
  }
  


  export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainer);