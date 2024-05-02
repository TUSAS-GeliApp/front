import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import React from 'react';
import NavBar from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PodcastComponent } from '../components/PodcastComponent';


const Podcastler = () => {
  return (
    <section className="podcastler">
      <div>
        <NavBar />
        <PodcastComponent />

        <Footer />
      </div>
    </section>
  );
};

export default Podcastler;
