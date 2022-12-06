import React from 'react'
import SideNav from '../components/sideNav/SideNav'
import Hero from '../components/banner/Hero'
import Products from '../components/products/Products'
const ApparelsPage = () => {
  return (
    <div>
        <div className='product-container'>
            <Hero />
            <div className='prod-page'>
                <button>Pure Aero</button>
                <button>pure strike</button>
                <button>boost</button>
                <button>All Apparels</button>

                <div className='flex-center level'>
                    <div className='side-nav'>
                        <SideNav />
                    </div>
                    <div className='full-width flex-center'>
                        <Products />
                        <div className="product-details">
            <h3> BABOLAT TENNIS RACQUET BRANDS</h3>
            <p>

              1) Babolat Pure Aero Racquets
              So, you say you want more spin out of your tennis racquet.
              The Babolat Pure Aero was designed for you and guess who has his
              fingerprints all over this series.

              If you guessed Rafael Nadal, you are correct. His need for great spin in his game
              was the genesis for this entire lineup of tennis racquets.
              More spin allows a player to take big swings generating extra power at the point
              of contact with the ball.
              Of course, the average ter who needs more power.
              The intermediate and advanced players who want
              a tennis racquet with controllable power.
              Maybe you have decided you need a bigger sweet spot to get power and spin even
              on off center shots. If so, these are the Babolat tennis racquets with a bigger head
              size and are a solid choice for your tennis racquets.
              Some players want a bit more length on their tennis rackets.
              The Pure Drive has a great racquet for you too. For every player
              who wants easy power added

              to their game allowing them to hit a heavy ball to dictate points,
              most game styles will benefit from these tennis rackets.
              3) Pure Strike Series
              The Babolat Pure Strike series is the right racquet for players who crave control.
              These tennis racquets give you the confidence that comes from pinpoint control.
              The Pure St.

              STRING PATTERN
              No surprises here with some pretty standard string spacing.
              The open string pattern in the Pure Drive is especially helpful for a control oriented
              tennis racquet swing.
            </p>

          </div>
                    </div>

                </div>


            </div>

        </div>
    </div>
  )
}

export default ApparelsPage