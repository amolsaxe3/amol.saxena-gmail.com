import React from "react";
import Nav from "./Nav";
// import {connect} from 'react-redux';
// import {getAllCampusesFromServer} from '../redux/actions/campuses'

const Home = () => {
  console.log("hello component!!!");
  return (
    <div>
      <Nav />
      <div>
        <nav>Welcome!</nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        </main>
      </div>
    </div>
  );
};

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllCampuses)
export default Home;
