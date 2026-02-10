import React from 'react';
import DistributorBanner from '../components/banner/Distributor';
import Nav from '../components/nav/Nav';
import Container from '../components/container';
import Button from '../components/buttons/AppButton';

const BecomeADistributor = () => (
  <div>
    <Nav store={false} />
    <Container>

      <div className="">

        <DistributorBanner />
        <section className="contact-us bg-white text-gray-800 xl:mx-auto max-w-7xl mx-4  px-6 md:px-12 py-12 space-y-16">
          <div className="grid grid-cols-2 gap-1">

            <div className="p-3">
              <div className="">

                <h2 className="mb-2 font-normal text-3xl">Become A distributor</h2>
                <p className="text-base text-gray-800">Need to get in touch with us? Either fill out the form with your inquiry or find or contact us through our emails </p>
              </div>
            </div>
            <div className="p-2">

              <form action="https://formspree.io/f/xayvlole" method="post">
                <div className="input"><input name="company_name" id="name" type="text" placeholder="Name or Company name " className="border" /></div>
                <div className="input"><input name="Email" type="email" placeholder="Email address" required className="border" /></div>
                <div className="input"><input name="State" type="text" placeholder="State of Business Location" required className="border" /></div>
                <div className="input text-input">
                  <textarea placeholder="Enter Message (opptional)" className="border" name="message" />

                </div>
                {/* <button name="message" type="submit">Get in touch</button>
           */}
                <Button type="submit" btnText="Send Message" className="!w-full" />
              </form>

            </div>
          </div>
        </section>
      </div>
    </Container>

  </div>
);

export default BecomeADistributor;
