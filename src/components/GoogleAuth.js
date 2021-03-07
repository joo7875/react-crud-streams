import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    // state = { isSignedIn: null };

    componentDidMount() {
        // load called callback func
        window.gapi.load('client:auth2', () => {
            // init does not need to call callback func
            // init returns Promise that is object after client is successfully called and initialized => .then()
            window.gapi.client.init({
                clientId: '1033378501756-paqf0snhsj7kf57m7p2janjn1hb9nt6c.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance(); // assign auth

                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.onAuthChange(this.auth.isSignedIn.get()); // immediately update auth state inside of my redux store
                
                this.auth.isSignedIn.listen(this.onAuthChange); // wait until the status has changed in the future
            });
        });
    }

    // callback func should have arrow func = () =>
    // In javascript console log, gapi.auth2.getAuthInstance().signOut()
    onAuthChange = (isSignedIn) => {
        // this func is called everytime the google account status chages according to gapi library
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }
  
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className='ui red google button' onClick={this.onSignOutClick }> {/* func에 괄호를 안쓰는 이유 */}
                    <i className='google icon' />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className='ui red google button' onClick={this.onSignInClick}>
                    <i className='google icon' />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }; // null, true, false
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
// call appropriate action creators