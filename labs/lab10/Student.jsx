import { Component } from "react";

export default class Student extends Component {
    constructor(props) {
        // 1. super(props) MUST be the very first line
        super(props);

        // 2. Bind methods after super()
        this.showMessage = this.showMessage.bind(this);

        this.regularProperty = "regular property, this does not hook into the react lifecycle phases";

        // 3. Access studentId correctly from props
        this.state = {         
            studentId: props.studentId,
            firstName: "Kalid"
        };
    }

    showMessage() {
        alert("Welcome " + this.state.firstName);
    }

    incrementEventHandler = () => {
        this.regularProperty = "Updated " + this.regularProperty;
        console.log(this.regularProperty);
        this.setState({
            studentId: this.state.studentId + 1
        });
    }

    eventHanflerPrinter = (event) => {
        console.log(event);
        console.log(event.target.name + " : " + event.target.value);
    }

    readName = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }
    
    render() {
        console.log("The student class component is about to render");
        return (
            <section>
                <h2>Student Component</h2>
                <p>regularProperty: {this.regularProperty}</p>
                <p>Student ID: {this.state.studentId}</p>
                <p>State: {JSON.stringify(this.state)}</p>

                <input name="firstname" onChange={this.readName} />
                <br />
                <button name="buttonEvent" value="Event" onClick={(event) => {
                    this.eventHanflerPrinter(event);
                }}>
                    Show event
                </button>
                <button onClick={this.showMessage}>
                    Click to show Message
                </button>
            </section>
        );
    }

    componentDidMount() {
        console.log("component just mounted");
    }

    shouldComponentUpdate(newProps, newState) {
        console.log("component will update to this new state: " + JSON.stringify(newState));
        return true; // Must return true
    }
}