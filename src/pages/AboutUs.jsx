import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="mt-0 space-y-10">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[60vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/022/852/413/small_2x/generative-ai-tractor-spraying-a-field-farm-landscape-agricultural-beautiful-countryside-country-road-nature-illustrationrealistic-top-view-horizontal-banner-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        data-aos="fade-zoom-in"
      >
        <div className="relative z-20 text-center px-6 text-green drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to FarmConnect
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Bridging the gap between farmers and buyers through technology,
            trust, and transparency.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section
        className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          About FarmConnect
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>FarmConnect</strong> is a modern digital platform empowering
          farmers with direct access to buyers, vendors, and the
          public—eliminating middlemen and ensuring fair prices.
        </p>
      </section>

      {/* Mission Section */}
      <section
        className="bg-gray-50 shadow-md rounded-lg p-6 max-w-5xl mx-auto"
        data-aos="slide-right"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To revolutionize agriculture by leveraging technology to connect
          farmers and consumers directly.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section
        className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto"
        data-aos="slide-left"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          More than just a platform—we’re a supportive ecosystem for digital
          agriculture.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li data-aos="fade-up" data-aos-delay="100">
            Direct farmer-to-buyer interaction
          </li>
          <li data-aos="fade-up" data-aos-delay="200">
            Real-time crop listings and buyer inquiries
          </li>
          <li data-aos="fade-up" data-aos-delay="300">
            Location-based crop discovery
          </li>
          <li data-aos="fade-up" data-aos-delay="400">
            AI-powered crop planning suggestions
          </li>
          <li data-aos="fade-up" data-aos-delay="500">
            Secure and verified user base
          </li>
        </ul>
      </section>

      {/* Vision Section */}
      <section
        className="bg-gray-50 shadow-md rounded-lg p-6 max-w-5xl mx-auto"
        data-aos="zoom-in-up"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To become India’s leading agriculture marketplace by enabling
          scalability and sustainability for all farmers.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section
        className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Dekshith Rao", role: "Founder & CEO" },
            { name: "Jagan Pambala", role: "CTO" },
            { name: "Naresh", role: "Lead Designer" },
            { name: "Sandeep T", role: "Marketing Head" },
            { name: "Varun G", role: "Community Manager" },
            { name: "Ganesh Chenna", role: "Customer Support Lead" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-lg p-4 shadow"
              data-aos="flip-left"
              data-aos-delay={idx * 100}
            >
              <div className="w-24 h-24 mx-auto bg-green-300 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3">
                {member.name[0]}
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 shadow-md rounded-lg p-6 max-w-5xl mx-auto mt-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
            Why AgriConnect?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="hover:scale-105 transition-transform duration-300">
              <img
                src="https://res.cloudinary.com/di73dum6d/image/upload/v1754402682/farmer_od5ol2.png"
                alt="Empower Farmers"
                className="mx-auto w-20 h-20 mb-4"
                loading="lazy"
              />
              <p className="font-medium text-lg">Empowers Local Farmers</p>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <img
                src="https://res.cloudinary.com/di73dum6d/image/upload_v1754402312/save-money_swrzjg.png"
                alt="Transparent Pricing"
                className="mx-auto w-20 h-20 mb-4"
                loading="lazy"
              />
              <p className="font-medium text-lg">Transparent Pricing</p>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <img
                src="https://res.cloudinary.com/di73dum6d/image/upload/v1754402409/artificial-intelligence_crhzv7.png"
                alt="AI Insights"
                className="mx-auto w-20 h-20 mb-4"
                loading="lazy"
              />
              <p className="font-medium text-lg">AI-Driven Decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          What Our Users Say
        </h2>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700">
            "FarmConnect has transformed how I sell my produce. No more
            middlemen, just direct sales to buyers!" -{" "}
            <strong>Ravi, Farmer</strong>
          </blockquote>
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700">
            "The AI suggestions have helped me plan my crops better and increase
            my yield. Highly recommend!" - <strong>Sita, Farmer</strong>
          </blockquote>
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700">
            "I love how easy it is to find fresh produce directly from farmers.
            FarmConnect is a game-changer!" - <strong>Arjun, Buyer</strong>
          </blockquote>
        </div>
      </section>

      {/* Community Section */}
      <section
        className="bg-gray-50 shadow-md rounded-lg p-6 max-w-5xl mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Join Our Community
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Become part of a growing community of farmers, buyers, and vendors who
          are committed to sustainable agriculture and fair trade.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Contact Us to Join
        </Link>
      </section>

      {/* CTA Section */}
      <section
        className="bg-green-600 text-white py-12 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to join the FarmConnect community?
        </h2>
        <p className="text-lg mb-6">
          Support farmers, buy fresh crops, or post your produce today!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/contact"
            className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            className="bg-green-800 px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
