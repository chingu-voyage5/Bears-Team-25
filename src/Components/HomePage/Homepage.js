import React,{Component} from 'react';
import LoggedUserHomePage from "./LoggedUserHomePage/LoggedUserHomePage";
import GuestHomepage from "./GuestHomepage/GuestHomepage";

class Homepage extends Component{
	render(){
		const auth=true;
		const Page=auth?(<LoggedUserHomePage />):(<GuestHomepage />)
		return(
			<div className="homepage">
			{Page}
			</div>
		);
	}
}

export default Homepage;