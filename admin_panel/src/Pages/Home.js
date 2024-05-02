import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import React from 'react';
import NavBar from '../components/NavBar';
import { Footer } from '../components/Footer';
import { HomeComponent } from '../components/HomeComponent';


const Home = () => {
  return (
    <section className="admin_home">
      <div>
        <NavBar />
        <HomeComponent />

        <Footer />
      </div>
    </section>
  );
};

export default Home;
