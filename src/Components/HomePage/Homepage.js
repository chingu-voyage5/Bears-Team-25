import React,{Component} from 'react';
import LoggedUserHomePage from "./LoggedUserHomePage/LoggedUserHomePage";
import GuestHomepage from "./GuestHomepage/GuestHomepage";
import { connect } from 'react-redux';

class Homepage extends Component{
	render(){
		const {auth}=this.props
		const Page=auth?(<LoggedUserHomePage />):(<GuestHomepage />)
		return(
			<div className="homepage">
			{Page}
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
    }
}

export default connect(mapStateToProps)(Homepage);
