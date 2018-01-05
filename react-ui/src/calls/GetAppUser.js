import React, { Component } from "react";
import Result from "../Result.js"

class GetAppUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIdPayload: null,
      smoochUserId: null,
      errorPayload: null,
      error: false
    };
  }

  getAppUser = () => {
    fetch("/appuser")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        if(data.response.status === 200){
          this.setState({
            userIdPayload: JSON.stringify(data.appUser, null, 2),
            smoochUserId: JSON.stringify(data.appUser._id, null, 2),
            error: false
          });
        }
        else if (data.response.status === 404){
          this.setState({
            userIdPayload: `API call failed: ` + `404 `+ `Description: ` + JSON.stringify(data.description, null, 2),
            smoochUserId: `API call failed: ` + `404 `+ `Description: ` +  JSON.stringify(data.description, null, 2),
            error: false
          });
        }
        else if (data.response.status === 403){
          this.setState({
            userIdPayload: `API call failed: ` + `403 `+ `Description: ` + JSON.stringify(data.description, null, 2),
            smoochUserId: `API call failed: ` + `403 `+ `Description: ` +  JSON.stringify(data.description, null, 2),
            error: false
          });
        }
      })
      .catch(e => {
        console.log(e)
        this.setState({
          errorPayload: `HTTP request failed: ${e}`,
          error: true
        });
      });
  };

  render() {
    return (
      <div className="result-section-dropdown">
        <div className="button-container">
          <button onClick={this.getAppUser}>{this.props.buttonTitle} </button>
        </div>
        <Result data={this.state.smoochUserId} title="Smooch userId (_id): " error={this.state.error} errorPayload={this.state.errorPayload}/>
        <Result data={this.state.userIdPayload} title="Full user payload: " error={this.state.error} errorPayload={this.state.errorPayload}/>
      </div>
    );
  }
}

export default GetAppUser;
