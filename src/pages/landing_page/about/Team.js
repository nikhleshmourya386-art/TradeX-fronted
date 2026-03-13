import React from "react";
import './About.css';

function Team() {
  return (
<section class="team-section">
  <h1 class="team-heading">People</h1>
  <div class="team-content">
    <div class="team-left">
      <img src="media/image/nithin-Kamath.jpg" alt="Nithin Kamath" />
      <h4>Nithin Kamath</h4>
      <h6>Founder, CEO</h6>
    </div>
    <div class="team-right">
      <p>
        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
      </p>
      <p>
        He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
      </p>
      <p>Playing basketball is his zen.</p>
      <p>
        Connect on <a href="#">Homepage</a> / <a href="#">TradingQnA</a> / <a href="#">Twitter</a>
      </p>
    </div>
  </div>
</section>

  );
}

export default Team;