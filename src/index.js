import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/learn' element={<Learn/>}>
        <Route path='courses' element={<Courses/>}>
          <Route path=":courseId" element={<CourseId/>}/>
        </Route>
        <Route path='bundles' element={<Bundles/>}/>
      </Route>
      <Route path='/my-apps' element={<Navigate replace to="/learn"/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </Router>
);

function Home(){
  return(
    <div>
      <h1>Home Route !</h1>
    </div>
  )
}

function Learn(){
  return(
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here !</h4>
      <Link class="btn btn-secondary" to="/">Home</Link>
      <Link class="btn btn-primary" to="/learn/courses">Courses</Link>
      <Link class="btn btn-success" to="/learn/bundles">Bundles</Link>
      <Outlet/>
    </div>
  )
}

function Courses(){

  const courseList = ["Angular","React","Vue","NodeJs"];
  const randomCourse = courseList[Math.floor(Math.random()*courseList.length)];

  return(
    <div>
      <h1>Courses</h1>
      <h4>Courses List</h4>

      <p>More Tests .......</p>

      <NavLink
        style={({isActive}) => {
          return{
            backgroundColor: isActive ? "red": "green"
          }
        }} 
        to={`/learn/courses/${randomCourse}`}>{randomCourse}</NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/tests`}>tests</NavLink>
      <Outlet/>
    </div>
  )
}

function Bundles(){
  return(
    <div>
      <h1>Bundles</h1>
      <h4>Bundles List</h4>
    </div>
  )
}

function CourseId(){
  const navigate = useNavigate();
  const {courseId} = useParams();
  return(
    <div>
      <h1> Course Params are : {courseId}</h1>
      <button
      onClick={() => {
        navigate("/dashboard",{state:courseId})
      }} 
      className='btn btn-warning'>Price</button>

      <Link to={"/dashboard"} state={"Django"}>Test Link</Link>
    </div>
  )
}

function Dashboard(){

  const location = useLocation();

  return (
    <div>
      <h1>This is the value that I carried : {location.state}</h1>
    </div>
  )
}

reportWebVitals();
