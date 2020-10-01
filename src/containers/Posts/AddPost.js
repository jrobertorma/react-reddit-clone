import React from 'react';

class AddPost extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.firebase.ref('posts').push({
            title: this.state.title,
            upvote: 0,
            downvote: 0
        });

        this.setState({title:''});
    }

    render() {
        return(
            <div className="AddPost">
                <input
                    type="text"
                    placeholder="Write te title of your post"
                    onChange={this.handleChange}
                    value={this.state.title}
                />
                <button
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Submit
                </button>
            </div>
        );
    }
}

export default AddPost;