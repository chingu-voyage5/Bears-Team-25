import React,{Component} from 'react';
import LoggedUserHomePage from "./LoggedUserHomePage/LoggedUserHomePage";
import GuestHomepage from "./GuestHomepage/GuestHomepage";
import { connect } from 'react-redux';
import {fetchUsersCredentials} from '../../actions/loginActions';

class Homepage extends Component{
	componentDidMount() {
		const {fetchUsersCredentials} = this.props;
		fetchUsersCredentials();
	}

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

export default connect(mapStateToProps, {fetchUsersCredentials})(Homepage);
