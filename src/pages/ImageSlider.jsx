import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function ImageSlider() {
  const slides = [
    {
      src: "https://res.cloudinary.com/di73dum6d/image/upload/v1756209516/smartfarmer_lknwyy.jpg",
      title: "Smart Farming",
      caption: "Technology-driven solutions for modern agriculture",
    },
    {
      src: "https://res.cloudinary.com/di73dum6d/image/upload/v1756209791/Sustainable_Practices_in_Black-Owned_Fresh_Markets__How_We_re_Redefining_the_Industry_o0z1gw.jpg",
      title: "Fresh Marketplace",
      caption: "Direct connection between farmers and buyers",
    },
    {
      src: "https://res.cloudinary.com/di73dum6d/image/upload/v1756209858/MAKAUT_plants_40_000_saplings_-_The_Statesman_p8oujc.jpg",
      title: "Community Growth",
      caption: "Empowering rural communities through trade",
    },
    {
      src: "https://res.cloudinary.com/di73dum6d/image/upload/v1756209980/karya_AQJ_Chanel_sb53ep.jpg",
      title: "Organic Farming",
      caption: "Sustainable and eco-friendly practices",
    },
  ];

  return (
    <section className="py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Farming in Action
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-xl shadow-lg"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative group overflow-hidden rounded-xl">
                {/* Image */}
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-200">{slide.caption}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
