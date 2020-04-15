import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './../history';
import logo from "./logo_org.png";
import man from "./hero-img.png";
import './Home.css';

export default class Home extends Component {
  componentDidMount() {

   }

  render() {
    return (
      <div>
        <div>
    <body>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

        <header id="header">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#"></a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><img class="logoimg" src={logo}/></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#"><span class="glyphicon glyphicon-home"></span><h4>Home</h4></a></li>
              <li><a href="#"><span class="glyphicon glyphicon-btc"></span><h4>Vote</h4></a></li>
            </ul>
          </div>
        </nav>
          </header>
          <div class="container">
          <div class="row fullscreen align-items-center justify-content-between">
          <div class="col-lg-6 col-md-6 banner-left">
        </div>
          </div>
          </div>
<section class="banner-area">
          <div class="container">
          					<div class="row fullscreen align-items-center justify-content-between">
          						<div class="col-lg-6 col-md-6 banner-left"><br/><br/><br/><br/><br/>
          							<h3>The future is in your hands!</h3>
          							<h1>Dear Voter,</h1><br/>
          							<h4>
          								Thank you for exercising your right to choose the what you deserve. Democracy is the root of our constitution. Every vote counts, especially yours. We urge you to encourage your friends and family to take part in this democratic process!
          							</h4><br/>
                      <form>
                      <button class="button" variant="btn btn-success" onClick={() => history.push('/Vote')}>Vote Now!</button>
                      </form>
          						</div>
          						<div class="col-lg-6 col-md-6 banner-right d-flex align-self-end">
          							  <img src={man} width="500" height="650"></img>
          						</div>
          					</div>
          				</div>
</section>
<br/>
<section class="services-area section-gap">
          <div class="container">
          <div class="row d-flex justify-content-center">
          	<div class="menu-content  col-lg-25">
          		  <div class="title text-center">
          		     <h1 class="mb-10">What we offer</h1>
          		     <h4>The technology we use for implementing our unique voting sprocess are cutting edge. Here's a glimpse of how we do, what we do</h4>
          		  </div>
              <br/>
                <div class="row">
						<div class="col-lg-4 col-md-6">
							<div class="single-services">
								<span class="glyphicon glyphicon-cloud"></span>
								<a href="#"><h4>Cloud based</h4></a>
								<p>
									Backed up on the Cloud almost seamlessly so prevent any data loss.
								</p>
							</div>
<br/>
						</div>
						<div class="col-lg-4 col-md-6">
							<div class="single-services">
								<span class="glyphicon glyphicon-bitcoin"></span>
								<a href="#"><h4>Blockchain</h4></a>
								<p>
									The crown jewel of our voting system: blockchain & ethereum.
								</p>
							</div>
						</div>
<br/>
						<div class="col-lg-4 col-md-6">
							<div class="single-services">
								<span class="glyphicon glyphicon-hdd"></span>
								<a href="#"><h4>Secure Database</h4></a>
								<p>
									A secure & safe database to ease our consumers of any discrepancies
								</p>
							</div>
						</div>
<br/>
						<div class="col-lg-4 col-md-6">
							<div class="single-services">
								<span class="glyphicon glyphicon-phone"></span>
								<a href="#"><h4>Portable</h4></a>
								<p>
									Portable between your desktop to within your pocket onto your smartphones and tablets.
								</p>
							</div>
						</div>
<br/>
						<div class="col-lg-4 col-md-6">
							<div class="single-services">
								<span class="glyphicon glyphicon-globe"></span>
								<a href="#"><h4>Accessible</h4></a>
								<p>
									Ease of access from anywhere all around the globe.
								</p>
							</div>
						</div>
<br/>
						<div class="col-lg-4 col-md-6">
							<div class="single-services">
								<span class="glyphicon glyphicon-lock"></span>
								<a href="#"><h4>Security</h4></a>
								<p>
									Database secured with multiple backups to put our customers data in the most secure place.
								</p>
							</div>
						</div>
<br/>
          	</div>
        </div>
      </div>
</div>
</section>
<br/><br/><br/>
<footer class="footer-area section-gap">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 col-md-6 col-sm-6">
                            <div class="single-footer-widget">
                                <h4>About the Company</h4>
                                <p class="text-white-50 bg-dark">
                                    Atul Anand - PES1201701452<br/>
                                    Akhil J - PES1201700050<br/>
                                    Kevin Arulraj - PES1201700659<br/>
                                </p>
                                <p class="footer-text">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved. <i class="fa fa-heart-o" aria-hidden="true"></i> from <a href="https://github.com/AkhilJ99/WebTechII-Project" target="_blank">WT2</a>
</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

</body>
        </div>
      </div>

    );
  }
}
