// Importing React since we are using React.
import React, { Component } from "react";
// Importing UI components from rebass.
import { Heading, Row, Column } from 'rebass';
// Importing the AppointmentsForm component.
import AppointmentsForm from './AppointmentsForm';
// Importing the AppointmentsList component.
import AppointmentsList from './AppointmentsList';
// Import API
import AppointmentAPI from '../../utils/AppointmentAPI';
// Import UI components from material-ui-next.
import { withStyles } from 'material-ui/styles';

//Style
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
});

class Appointments extends Component {
  state = {
    appointmentName: "",
    appointmentDoctor: "",
    appointmentDate: "",
    appointmentTime: "",
    appointments: [],
    error: ""
  };

  componentDidMount() {
    this.loadAppointments();
  }

  loadAppointments = () => {
    AppointmentAPI.getAppointments()
      .then(res =>
        this.setState({ appointments: res.data})
      )
      .catch(err => console.log(err));
  };

  // Keep track of what user enters for appointment name so that input can be grabbed later
  handleAppointmentNameChange = (event) => {
    this.setState({ appointmentName: event.target.value });
  }

  // Keep track of what user selects for doctor so that input can be grabbed later
  handleAppointmentDoctorChange = (event) => {
    this.setState({ appointmentDoctor: event.target.value });
  }

  // Keep track of what user types into appointment date input field so that input can be grabbed later
  handleAppointmentDateChange = (event) => {
    this.setState({ appointmentDate: event.target.value });
  }

  // Keep track of what user types into appointment time input field so that input can be grabbed later
  handleAppointmentTimeChange = (event) => {
    this.setState({ appointmentTime: event.target.value });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Adding appointment");
    console.log("this.state.appointmentName: ", this.state.appointmentName);
    console.log("this.state.appointmentDoctor: ", this.state.appointmentDoctor);
    console.log("this.state.appointmentDate: ", this.state.appointmentDate);
    console.log("this.state.appointmentTime: ", this.state.appointmentTime);
    AppointmentAPI.saveAppointment({
      notes: this.state.appointmentName,
      doctor: this.state.appointmentDoctor,
      date: this.state.appointmentDate,
      time: this.state.appointmentTime,
    })
  };

  render() {
    const { classes } = this.props;
    const newLocal1 = <Heading is="h1" children="Appointments" mt={4} color="white" />;
    const newLocal = newLocal1;

    return [  
      newLocal,

      <div className="main-content-section">
        <Row mt={4}>
          <Column width={1} >
            <AppointmentsForm
              handleFormSubmit={this.handleFormSubmit}
              handleAppointmentNameChange={this.handleAppointmentNameChange}
              handleAppointmentDoctorChange={this.handleAppointmentDoctorChange}
              handleAppointmentDateChange={this.handleAppointmentDateChange}
              handleAppointmentTimeChange={this.handleAppointmentTimeChange}  />
          </Column>
        </Row>

        <Row>
          <Column width={1}>
            <div className={classes.root}>
                <Heading is="h1" children="Upcoming appointments" mt={4} color="white" />
                {this.state.appointments.map(appointment => {
                  return (
                    <AppointmentsList
                      id={appointment._id}
                      key={appointment._id}
                      name={appointment.name}
                      date={appointment.date}
                      time={appointment.time}
                      doctor={appointment.doctor}
                      clinic={appointment.clinic}
                    />
                  );
                })}
            </div>
          </Column>
        </Row>
      </div>,
    ];
  }
}

// Exporting the Appointments component
// so that the App.js file can use/render the Appointments page.
export default withStyles(styles)(Appointments);