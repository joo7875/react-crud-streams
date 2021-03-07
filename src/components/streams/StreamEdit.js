import React from 'react';
import { connect } from 'react-redux';

const StreamEdit = (props) => {
    console.log(props); // match.params.id
    // check match.stream

    return (
        <div>StreamEdit</div>
    );
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps); // Same result as StreamEdit(props)
    return { stream: state.streams[ownProps.match.params.id] };
};  

export default connect(mapStateToProps)(StreamEdit);