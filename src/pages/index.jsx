import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import heroFarm from "../assets/heroFarm.jpg";
import ImageSlider from "../pages/ImageSlider";

function Index() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    {
      title: "Smart Marketplace",
      description:
        "Connect directly with farmers and buyers in a transparent, efficient marketplace",
      icon: "https://res.cloudinary.com/di73dum6d/image/upload/v1754475601/home-automation_drb6mw.png",
    },
    {
      title: "AI Recommendations",
      description:
        "Get personalized crop suggestions and market insights powered by AI",
      icon: "https://res.cloudinary.com/di73dum6d/image/upload/v1754476271/ai-tech_ehnt8p.png",
    },
    {
      title: "Location-Based",
      description:
        "Find farms and buyers in your area with our interactive map feature",
      icon: "https://res.cloudinary.com/di73dum6d/image/upload/v1754476367/location_nijdpd.png",
    },
    {
      title: "Direct Communication",
      description:
        "Chat directly with farmers and buyers for seamless transactions",
      icon: "https://res.cloudinary.com/di73dum6d/image/upload/v1754476430/two-way-communication_fq8poi.png",
    },
    {
      title: "Secure & Trusted",
      description:
        "Verified profiles and secure payment systems ensure safe transactions",
      icon: "https://res.cloudinary.com/di73dum6d/image/upload/v1754476491/cyber-security_rukerl.png",
    },
    {
      title: "Real-time Updates",
      description:
        "Get instant notifications about weather, prices, and market changes",
      icon: "https://res.cloudinary.com/di73dum6d/image/upload/v1754476581/updated_lti12h.png",
    },
  ];

  return (
    <div className="bg-[#f5f3ec]  text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroFarm}
            alt="Modern farming technology"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6" data-aos="fade-up">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              The Future of <span className="text-green-400">Agriculture</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Connect farmers and buyers through AI-powered marketplace. Fresh
              produce, fair prices, direct trade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition"
              >
                Start Farming Smart
              </Link>
              <Link
                to="/demo"
                className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-full text-lg border border-gray-300 transition"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold mb-4 text-gray-900"
            data-aos="fade-up"
          >
            Why Choose <span className="text-green-600">FarmConnect?</span>
          </h2>
          <p
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Revolutionizing agriculture with cutting-edge technology and direct
            farmer-buyer connections
          </p>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center transition hover:shadow-xl"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-14 h-14 mx-auto mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Results */}
      <section className="bg-[#f5f3ec] py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Results for Modern Farmers
            </h2>
            <p className="text-gray-700 mb-6">
              Join thousands of farmers who have already transformed their
              agricultural business with FarmConnect's innovative platform.
            </p>

            {/* Checklist with staggered AOS */}
            <ul className="space-y-3 text-gray-800">
              {[
                "Increase farm profits by 30% on average",
                "Reduce time to market by 50%",
                "Access to 10,000+ verified buyers",
                "Real-time weather and market data",
                "AI-powered crop recommendations",
                "24/7 customer support",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3"
                  data-aos="fade-up"
                  data-aos-delay={i * 100} // stagger effect
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                    alt="checkmark"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              to="/marketplace"
              className="mt-6 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3523/3523063.png"
                className="w-5 h-5"
                alt="marketplace"
                loading="lazy"
              />
              Explore Marketplace
            </Link>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 relative" data-aos="fade-left">
            <img
              src="https://preview--crop-circle-link.lovable.app/assets/marketplace-crops-G-Hv1mjB.jpg"
              alt="Fresh produce"
              className="rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />

            {/* Floating Stats Card */}
            <div
              className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 transition-transform transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                className="w-6 h-6"
                alt="users"
                loading="lazy"
              />
              <div>
                <p className="text-lg font-bold text-green-700">10,000+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Section */}
      <section className="bg-[#f5f3ec] py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <img
              src="https://res.cloudinary.com/di73dum6d/image/upload/v1755849141/MAphoto_wrtbb0.jpg"
              alt="Modern Farming"
              className="rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering Farmers with Technology
            </h2>
            <p className="text-gray-700 mb-6">
              FarmConnect bridges the gap between traditional agriculture and
              modern technology, ensuring farmers can increase productivity,
              reduce risks, and connect directly with buyers for better profits.
            </p>

            {/* Key Points with staggered animations */}
            <ul className="space-y-3 text-gray-800">
              {[
                "Smart tools for efficient farming",
                "Direct market access without middlemen",
                "Real-time insights for weather & pricing",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                    alt="checkmark"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2983/2983782.png"
                className="w-5 h-5"
                alt="about"
                loading="lazy"
              />
              Learn More
            </Link>
          </div>
        </div>
        <div>
          <ImageSlider />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            data-aos="fade-up"
          >
            What Our Community Says
          </h2>
          <p
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Real stories from farmers and buyers who trust FarmConnect
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {[
              {
                quote:
                  "FarmConnect transformed my business. I now sell directly to buyers and earn 40% more than traditional channels.",
                name: "Sarah Johnson",
                role: "Organic Farmer",
              },
              {
                quote:
                  "Finding fresh, local produce has never been easier. The quality and freshness are consistently excellent.",
                name: "Mike Chen",
                role: "Restaurant Owner",
              },
              {
                quote:
                  "The AI recommendations helped us increase our yield by 35% this season. Absolutely revolutionary!",
                name: "Elena Rodriguez",
                role: "Agri Cooperative",
              },
            ].map((testimony, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                      className="w-5 h-5"
                      alt="star"
                      loading="lazy"
                    />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-4">"{testimony.quote}"</p>
                <h4 className="font-semibold text-gray-900">
                  {testimony.name}
                </h4>
                <p className="text-sm text-gray-500">{testimony.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 py-20 text-center text-white">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg">
            Join the agricultural revolution. Start connecting with buyers,
            accessing AI insights, and growing your profits today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2909/2909767.png"
                className="w-5 h-5"
                alt="leaf"
                loading="lazy"
              />
              Sign Up as Farmer
            </Link>
            <Link
              to="/marketplace"
              className="border border-white hover:bg-white hover:text-green-800 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3523/3523885.png"
                className="w-5 h-5"
                alt="buyer"
                loading="lazy"
              />
              Browse as Buyer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
