"use client";
import React, { useState, useEffect, useRef } from "react";

//============================================================================
// HELPER HOOK
//============================================================================
const useAnimateOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationClass =
              entry.target.getAttribute("data-animation") ||
              "animate-fade-in-up";
            entry.target.classList.add(animationClass);
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

//============================================================================
// CÁC SECTION CỦA TRANG
//============================================================================

/**
 * HERO SECTION
 * Kết hợp tiêu đề mạnh mẽ và hình ảnh nền ấn tượng.
 */
const HeroSection = () => (
  <section
    className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center bg-fixed"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1558234326-d44a4a11b719?q=80&w=1932&auto=format&fit=crop')",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
    <div className="relative z-10 p-4 scroll-animate opacity-0">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
        Về Chúng Tôi
      </h1>
      <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
        Nâng tầm giá trị nông sản Việt, dệt nên phong cách bền vững.
      </p>
    </div>
  </section>
);

/**
 * STORY & MISSION SECTION
 * Bố cục dòng thời gian kể câu chuyện, kết hợp nội dung chi tiết.
 */
const StorySection = () => {
  const timelineEvents = [
    {
      year: "Khởi đầu",
      title: "Niềm Đam Mê Nông Sản Việt",
      description:
        "CÔNG TY TNHH LALA - LYCHEEE ra đời từ niềm đam mê kết nối tinh hoa nông sản Việt Nam với ngành thời trang và tiêu dùng bền vững, khởi nguồn từ trái vải thiều Thanh Hà.",
      imageUrl:
        "https://images.unsplash.com/photo-1623923043429-20914ff59972?q=80&w=800&auto=format&fit=crop",
      align: "left",
    },
    {
      year: "Sứ mệnh",
      title: "Khai Thác & Đổi Mới",
      description:
        "Sứ mệnh của chúng tôi là khai thác và phát triển vật liệu từ vải thiều một cách đổi mới, mang đến sản phẩm chất lượng cao, thân thiện môi trường và tạo giá trị cho cộng đồng.",
      imageUrl:
        "https://images.unsplash.com/photo-1532618500676-2e0cbf7ba7b8?q=80&w=800&auto=format&fit=crop",
      align: "right",
    },
    {
      year: "Tương lai",
      title: "Hướng Đến Toàn Cầu",
      description:
        "Chúng tôi cam kết phát triển bền vững, không ngừng sáng tạo và tiếp tục sứ mệnh lan toả giá trị của nông sản Việt Nam ra thế giới.",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
      align: "left",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-animate opacity-0">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Câu Chuyện và Sứ Mệnh
          </h2>
        </div>
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="absolute border-opacity-20 border-gray-700 h-full border"
            style={{ left: "50%" }}
          ></div>
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${
                event.align === "right"
                  ? "flex-row-reverse left-timeline"
                  : "right-timeline"
              }`}
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-pink-500 shadow-xl w-14 h-14 rounded-full">
                <h1 className="mx-auto font-semibold text-sm text-white text-center px-1">
                  {event.year}
                </h1>
              </div>
              {/* Card nội dung với hình ảnh */}
              <div
                className={`order-1 bg-white rounded-xl shadow-xl w-5/12 overflow-hidden scroll-animate opacity-0`}
                data-animation={
                  event.align === "left"
                    ? "animate-fade-in-right"
                    : "animate-fade-in-left"
                }
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 text-2xl mb-3">
                    {event.title}
                  </h3>
                  <p className="text-base leading-relaxed tracking-wide text-gray-600">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * PHILOSOPHY SECTION
 * Kết hợp "Giá trị cốt lõi" và "Triết lý" vào một section với hiệu ứng liquid glass.
 */
const PhilosophySection = () => {
  const values = [
    {
      icon: "🏆",
      title: "Chất Lượng Tối Ưu",
      description:
        "Áp dụng quy trình kiểm soát nghiêm ngặt từ khâu nguyên liệu đến thành phẩm.",
    },
    {
      icon: "♻️",
      title: "Phát Triển Bền Vững",
      description:
        "Cam kết sử dụng các phương pháp thân thiện môi trường, giảm thiểu tác động sinh thái.",
    },
    {
      icon: "💡",
      title: "Đổi Mới Công Nghệ",
      description:
        "Không ngừng nghiên cứu và ứng dụng công nghệ mới để tối ưu hóa sản phẩm.",
    },
    {
      icon: "🤝",
      title: "Trách Nhiệm Cộng Đồng",
      description:
        "Tạo giá trị bền vững và hỗ trợ nguồn thu nhập ổn định cho nông dân địa phương.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-pink-50">
      <div className="container mx-auto px-4 text-center">
        <div className="text-center mb-12 scroll-animate opacity-0">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Triết Lý Của Chúng Tôi
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition duration-500 transform hover:-translate-y-2 hover:shadow-2xl scroll-animate opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-5">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed h-24">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * DESIGN SECTION (MỚI)
 * Giới thiệu triết lý thiết kế của thương hiệu.
 */
const DesignSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="space-y-6 scroll-animate opacity-0"
          data-animation="animate-fade-in-left"
        >
          <h2 className="text-4xl font-extrabold text-gray-800">
            Thiết Kế Từ Thiên Nhiên
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Triết lý thiết kế của Lalalycheee là sự giao thoa giữa vẻ đẹp mộc
            mạc của tự nhiên và nét tinh tế của thẩm mỹ hiện đại. Chúng tôi tin
            rằng một thiết kế tốt không chỉ đẹp về hình thức mà còn phải kể một
            câu chuyện và mang lại giá trị bền vững.
          </p>
          <ul className="list-none space-y-4 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 mt-1 font-bold">●</span>
              <div>
                <h4 className="font-bold">Cảm Hứng Tự Nhiên</h4>
                <p className="text-gray-600">
                  Màu sắc, hoa văn và chất liệu đều được lấy cảm hứng từ cây
                  vải, trái vải - từ sắc hồng của vỏ đến sự mềm mại của thớ vải.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 mt-1 font-bold">●</span>
              <div>
                <h4 className="font-bold">Tối Giản & Tinh Tế</h4>
                <p className="text-gray-600">
                  Chúng tôi tập trung vào sự tối giản trong thiết kế bao bì và
                  sản phẩm để tôn vinh vẻ đẹp nguyên bản của nguyên liệu.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 mt-1 font-bold">●</span>
              <div>
                <h4 className="font-bold">Công Năng & Bền Vững</h4>
                <p className="text-gray-600">
                  Mọi sản phẩm không chỉ đẹp mà còn mang tính ứng dụng cao, phục
                  vụ đời sống và được tạo ra từ quy trình thân thiện với môi
                  trường.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="scroll-animate opacity-0"
          data-animation="animate-fade-in-right"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1749149151516-f06512958d91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D"
            alt="Design Inspiration"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

/**
 * IMPACT SECTION
 * Section mới nói về "Tác động & Cam kết", được tích hợp hiệu ứng động.
 */
const ImpactSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="scroll-animate opacity-0 lg:order-last"
          data-animation="animate-fade-in-right"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1749760305646-60673cae2c46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
            alt="Impact"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
        <div
          className="space-y-6 scroll-animate opacity-0"
          data-animation="animate-fade-in-left"
        >
          <h2 className="text-4xl font-extrabold text-gray-800">
            Tác Động & Cam Kết
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Lalalycheee không chỉ mang đến sản phẩm, mà còn là một phần của
            chuỗi giá trị bền vững. Chúng tôi tự hào đóng góp vào:
          </p>
          <ul className="list-none space-y-4 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 mt-1 font-bold">✔</span>
              <span>
                **Phát triển nông nghiệp địa phương:** Tạo nguồn thu nhập ổn
                định cho nông dân.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 mt-1 font-bold">✔</span>
              <span>
                **Bảo vệ môi trường:** Giảm thiểu rác thải nông nghiệp bằng cách
                tận dụng mọi bộ phận của cây vải.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 mt-1 font-bold">✔</span>
              <span>
                **Nâng cao nhận thức:** Lan tỏa thông điệp về tiêu dùng bền vững
                và các vật liệu thân thiện môi trường.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/**
 * VIDEO SECTION
 * Tích hợp video giới thiệu vào dòng chảy của trang.
 */
const VideoSection = () => (
  <section className="py-20 bg-pink-50">
    <div className="container mx-auto px-4 flex flex-col items-center">
      <div className="text-center mb-12 scroll-animate opacity-0">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Tìm Hiểu Thêm Về Lalalycheee
        </h2>
      </div>
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transition-all duration-300 hover:scale-[1.01] scroll-animate opacity-0">
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/Rk0E8dK32j0?si=xXvD3x70x0xX_z-Y"
            title="Giới thiệu về Vải Thiều Thanh Hà"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

/**
 * CALL TO ACTION SECTION
 * Lời kêu gọi hành động ở cuối trang.
 */
const CallToActionSection = () => (
  <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-center">
    <div className="max-w-4xl mx-auto space-y-8 scroll-animate opacity-0">
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
        Bạn Đã Sẵn Sàng Đồng Hành?
      </h2>
      <p className="text-xl font-light opacity-95">
        Khám phá các sản phẩm độc đáo từ vải thiều của chúng tôi hoặc liên hệ để
        được tư vấn.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <button className="px-8 py-4 bg-white text-pink-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
          Xem Sản Phẩm
        </button>
        <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-pink-600 transition duration-300 transform hover:scale-105">
          Liên Hệ
        </button>
      </div>
    </div>
  </section>
);

//============================================================================
// COMPONENT CHÍNH
//============================================================================
export default function AboutUsPage() {
  useAnimateOnScroll();

  return (
    <div className="bg-white container mx-auto font-sans antialiased text-gray-800">
      <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                .animate-fade-in-left { animation: fadeInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                .animate-fade-in-right { animation: fadeInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                
                /* Timeline alignment for responsiveness */
                .right-timeline { justify-content: flex-start; }
                .left-timeline { justify-content: flex-end; }
                @media (max-width: 768px) {
                    .timeline-container { padding: 0; }
                    .right-timeline, .left-timeline { justify-content: center; flex-direction: column; }
                    .right-timeline > div:nth-child(1), .left-timeline > div:nth-child(1) { display: none; }
                    .right-timeline > div:nth-child(3), .left-timeline > div:nth-child(3) { width: 100%; margin-top: 1rem; }
                    .timeline-container > div > div:nth-child(2) { margin-left: auto; margin-right: auto; }
                }
             `}</style>

      <section>
        <HeroSection />
        <StorySection />
        <PhilosophySection />
        <DesignSection />
        <ImpactSection />
        <VideoSection />
        <CallToActionSection />
      </section>
    </div>
  );
}
