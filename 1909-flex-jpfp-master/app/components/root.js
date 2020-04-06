import React from "react";
import {
  HashRouter,
  BrowserRouter,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
// import {getAllCampusesFromServer} from '../redux/actions/campuses'
import Nav from "./Nav";
import Campuses from "./AllCampuses";
import Campus from "./SingleCampus";
import AddCampus from "./AddCampus";
import AddStudent from "./AddStudent";
import Students from "./AllStudents";
import Student from "./SingleStudent";
import Home from "./Home";
import { fetchCampuses } from "../redux/actions/campuses";
import { fetchStudents } from "../redux/actions/students";

class Root extends React.Component {
  constructor(props) {
    //console.log('props in root here are: ', props )
    //console.log('reached constructor in root component here!!!')
    super(props);
    // this.state = {
    //   campuses: props.campuses
    // }
  }

  componentDidMount() {
    // this.props.aTestFunction();
    // console.log('reached componentDidMount in AllCampuses component here!!!')
    this.props.onLoadCampuses();
    this.props.onLoadStudents();
  }
  render() {
    // console.log('inside root render:---> ', this.props.match.url)
    // console.log('inside root render:----> ', window.location.path)
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route component={Nav}/> */}
          <Route path="/campuses/:id" component={Campus} />
          <Route path="/campuses" component={Campuses} />
          <Route path="/addcampus" component={AddCampus} />
          <Redirect from="/addcampus" to="/campuses" />
          <Route path="/addstudent" component={AddStudent} />
          {/* <Redirect from="/addstudent" to="/students" /> */}
          <Route path="/students/:id" component={Student} />
          <Route path="/students" component={Students} />
          <Route path="/" component={Home} />
          <Route component={Nav} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapState = state => {
  return {
    campuses: state.campusState.campuses
  };
};

const mapDispatch = (dispatch, props) => ({
  onLoadCampuses: () => {
    dispatch(fetchCampuses());
  },
  onLoadStudents: () => {
    dispatch(fetchStudents());
  }
});

export default connect(mapState, mapDispatch)(Root);
// export default Root
