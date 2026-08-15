"use client";

import {
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  MessageCircle,
  Globe,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  Award,
  Video,
  FileText,
  Headphones,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function TiengTrungTueLam() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Trang Chủ", id: "hero" },
    { label: "Khóa Học", id: "courses" },
    { label: "Lợi Ích", id: "benefits" },
    { label: "Bảng Giá", id: "pricing" },
    { label: "Học Viên", id: "testimonials" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 hover:scale-105 transition-transform group"
            >
              {/* Logo Icon with Chinese Characters */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <span className="text-white font-bold text-lg">慧林</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-slate-900">
                  中
                </div>
              </div>

              {/* Text Logo */}
              <div className="text-left">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    慧林汉语
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  Tuệ Lâm Hán Ngữ
                </div>
                <div className="text-[10px] text-gray-400 font-medium">
                  Since 2014 • HSK Excellence
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-semibold hover:text-blue-400 transition-colors">
                <Phone className="w-4 h-4" />
                0123 456 789
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <BookOpen className="w-4 h-4" />
                Đăng Ký Ngay
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800 animate__animated animate__fadeInDown animate__faster">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-3 px-4 hover:bg-white/5 rounded-lg font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
                  <button className="flex items-center justify-center gap-2 text-sm font-semibold py-3 px-4 hover:bg-white/5 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                    0123 456 789
                  </button>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    Đăng Ký Ngay
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div className="container mx-auto px-4 z-10 text-center animate__animated animate__fadeIn">
          <div className="inline-block mb-6 px-6 py-2 bg-blue-600/80 backdrop-blur-sm rounded-full animate__animated animate__bounceIn">
            <span className="text-sm font-semibold">🇨🇳 Học Tiếng Trung Chuẩn Quốc Tế</span>
          </div>

          {/* Main Logo & Title */}
          <div className="mb-8 animate__animated animate__fadeInUp">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                慧林汉语
              </span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Tuệ Lâm <span className="text-blue-400">Hán Ngữ</span>
            </h2>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mt-4">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Since 2014</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>98% Tỷ Lệ Đỗ HSK</span>
              </span>
            </div>
          </div>

          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            Nơi ươm mầm ước mơ chinh phục ngôn ngữ Trung Hoa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-2xl">
              <BookOpen className="w-5 h-5" />
              Đăng Ký Học Thử
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
              <Phone className="w-5 h-5" />
              Tư Vấn Ngay
            </button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "5000+", label: "Học Viên" },
              { number: "10+", label: "Năm Kinh Nghiệm" },
              { number: "98%", label: "Đỗ HSK" },
              { number: "50+", label: "Giảng Viên" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate__animated animate__zoomIn"
                style={{ animationDelay: `${2.5 + index * 0.1}s` }}
              >
                <div className="text-3xl font-bold text-blue-400">{stat.number}</div>
                <div className="text-sm text-gray-300 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problems" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bạn Đang Gặp <span className="text-red-400">Khó Khăn</span> Gì?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Chúng tôi hiểu những thách thức mà bạn đang đối mặt khi học tiếng Trung
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Target className="w-12 h-12" />,
                title: "Không Có Lộ Trình Rõ Ràng",
                desc: "Học mò mẫm, không biết bắt đầu từ đâu và học đến đâu",
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Thiếu Thời Gian",
                desc: "Bận rộn công việc, khó sắp xếp thời gian học đều đặn",
              },
              {
                icon: <MessageCircle className="w-12 h-12" />,
                title: "Yếu Giao Tiếp",
                desc: "Học nhiều lý thuyết nhưng không tự tin giao tiếp thực tế",
              },
              {
                icon: <BookOpen className="w-12 h-12" />,
                title: "Khó Nhớ Hán Tự",
                desc: "Hán tự phức tạp, dễ quên và khó áp dụng",
              },
              {
                icon: <Headphones className="w-12 h-12" />,
                title: "Phát Âm Sai",
                desc: "Không có giảng viên bản ngữ chỉnh sửa phát âm thanh điệu",
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Thi HSK Không Đỗ",
                desc: "Ôn thi HSK mãi mà vẫn không đạt được chứng chỉ mong muốn",
              },
            ].map((problem, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-900/30 to-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-red-400 mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                <p className="text-gray-400">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solutions" className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-400">Giải Pháp</span> Toàn Diện
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Phương pháp học khoa học, hiệu quả từ A-Z tại Tiếng Trung Tuệ Lâm
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="space-y-6 animate__animated animate__fadeInLeft">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Giảng Viên Bản Ngữ Chất Lượng",
                  desc: "100% giảng viên người Trung, tốt nghiệp đại học danh tiếng, có chứng chỉ sư phạm quốc tế",
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Lộ Trình Cá Nhân Hóa",
                  desc: "Đánh giá năng lực đầu vào, thiết kế lộ trình riêng phù hợp với từng học viên",
                },
                {
                  icon: <Video className="w-8 h-8" />,
                  title: "Học Linh Hoạt Online/Offline",
                  desc: "Lớp học trực tiếp hoặc online qua Zoom với tương tác 2 chiều, học mọi lúc mọi nơi",
                },
                {
                  icon: <FileText className="w-8 h-8" />,
                  title: "Tài Liệu Độc Quyền",
                  desc: "Giáo trình biên soạn riêng, bài tập thực hành phong phú, kho tài liệu HSK đầy đủ",
                },
              ].map((solution, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all hover:scale-105"
                >
                  <div className="text-blue-400 flex-shrink-0">{solution.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <p className="text-gray-400">{solution.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="animate__animated animate__fadeInRight">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Learning"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-blue-900/50 to-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Lợi Ích Khi Học Tại <span className="text-blue-400">Tuệ Lâm</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Những gì bạn sẽ đạt được sau khóa học
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: <Trophy className="w-10 h-10" />,
                title: "Đỗ HSK Đảm Bảo",
                desc: "Cam kết đỗ HSK hoặc học lại miễn phí",
                colorClass: "text-blue-400",
              },
              {
                icon: <MessageCircle className="w-10 h-10" />,
                title: "Giao Tiếp Tự Tin",
                desc: "Nói tiếng Trung lưu loát như người bản xứ",
                colorClass: "text-green-400",
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Cơ Hội Việc Làm",
                desc: "Mở rộng cơ hội làm việc tại công ty Trung Quốc",
                colorClass: "text-purple-400",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Cộng Đồng Học Tập",
                desc: "Kết nối với 5000+ học viên khắp cả nước",
                colorClass: "text-pink-400",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Tiết Kiệm Thời Gian",
                desc: "Học đúng trọng tâm, tiến bộ nhanh gấp 3 lần",
                colorClass: "text-yellow-400",
              },
              {
                icon: <BookOpen className="w-10 h-10" />,
                title: "Học Liệu Vĩnh Viễn",
                desc: "Truy cập tài liệu học tập không giới hạn",
                colorClass: "text-red-400",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Chứng Chỉ Uy Tín",
                desc: "Cấp chứng chỉ hoàn thành khóa học",
                colorClass: "text-indigo-400",
              },
              {
                icon: <Headphones className="w-10 h-10" />,
                title: "Hỗ Trợ 24/7",
                desc: "Giảng viên tư vấn và giải đáp mọi lúc",
                colorClass: "text-cyan-400",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105 text-center animate__animated animate__zoomIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`${benefit.colorClass} mx-auto mb-4`}>{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section id="courses" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-400">Chương Trình</span> Đào Tạo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Đa dạng khóa học từ cơ bản đến nâng cao, đáp ứng mọi nhu cầu
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "HSK 1 - HSK 6",
                subtitle: "Lộ Trình Thi Chứng Chỉ Quốc Tế",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
                features: [
                  "HSK 1-2: Nền tảng cơ bản (150 từ vựng)",
                  "HSK 3-4: Giao tiếp trung cấp (1200 từ vựng)",
                  "HSK 5-6: Nâng cao chuyên sâu (5000+ từ vựng)",
                  "Cam kết đỗ HSK hoặc học lại miễn phí",
                  "Luyện đề thi thật, chấm điểm chi tiết",
                ],
                duration: "3-18 tháng",
                level: "Tất cả trình độ",
              },
              {
                title: "Tiếng Trung Giao Tiếp",
                subtitle: "Giao Tiếp Thực Tế Hàng Ngày",
                image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
                features: [
                  "Giao tiếp du lịch, mua sắm",
                  "Hội thoại trong gia đình, bạn bè",
                  "Phát âm chuẩn với giảng viên bản ngữ",
                  "Tình huống thực tế, luyện nói nhiều",
                  "Học qua game, bài hát, phim ảnh",
                ],
                duration: "4-6 tháng",
                level: "Cơ bản - Trung cấp",
              },
              {
                title: "Tiếng Trung Thương Mại",
                subtitle: "Chuyên Ngành Kinh Doanh",
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
                features: [
                  "Từ vựng chuyên ngành kinh doanh",
                  "Đàm phán, ký hợp đồng",
                  "Viết email, báo cáo bằng tiếng Trung",
                  "Giao tiếp với đối tác Trung Quốc",
                  "Thực hành case study thực tế",
                ],
                duration: "6-9 tháng",
                level: "Trung cấp - Nâng cao",
              },
              {
                title: "Tiếng Trung Công Xưởng",
                subtitle: "Chuyên Ngành Sản Xuất",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
                features: [
                  "Từ vựng kỹ thuật sản xuất",
                  "Giao tiếp với công nhân Trung Quốc",
                  "Đọc hiểu tài liệu kỹ thuật",
                  "An toàn lao động, quy trình SOP",
                  "Thực tập tại nhà máy liên kết",
                ],
                duration: "4-6 tháng",
                level: "Cơ bản - Trung cấp",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all hover:scale-105 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-1">{course.title}</h3>
                    <p className="text-blue-400 text-sm">{course.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <TrendingUp className="w-4 h-4" /> {course.level}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105">
                    Xem Chi Tiết
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-900/30 to-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-400">Học Viên</span> Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hơn 5000 học viên đã thành công với Tiếng Trung Tuệ Lâm
            </p>
          </div>

          {/* Success Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              { number: "98%", label: "Tỷ Lệ Đỗ HSK", icon: <Trophy /> },
              { number: "5000+", label: "Học Viên Đã Tốt Nghiệp", icon: <Users /> },
              { number: "4.9/5", label: "Đánh Giá Trung Bình", icon: <Star /> },
              { number: "95%", label: "Học Viên Giới Thiệu", icon: <Award /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 animate__animated animate__zoomIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-blue-400 mx-auto mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Nguyễn Văn An",
                role: "Nhân viên kinh doanh",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
                rating: 5,
                comment:
                  "Tôi đã đỗ HSK 4 sau 8 tháng học tại Tuệ Lâm. Giảng viên nhiệt tình, phương pháp giảng dạy dễ hiểu. Giờ tôi tự tin giao tiếp với đối tác Trung Quốc.",
              },
              {
                name: "Trần Thị Bích",
                role: "Quản lý nhà máy",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
                rating: 5,
                comment:
                  "Khóa tiếng Trung công xưởng rất thực tế, giúp tôi giao tiếp tốt với công nhân. Lương tăng gấp đôi sau khi biết tiếng Trung.",
              },
              {
                name: "Lê Hoàng Nam",
                role: "Sinh viên",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
                rating: 5,
                comment:
                  "Lớp học vui, không gò bó. Thầy cô luôn động viên và hỗ trợ tận tình. Tôi đã đậu học bổng du học Trung Quốc nhờ chứng chỉ HSK 5.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">&quot;{testimonial.comment}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-400">Bảng Giá</span> Ưu Đãi
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Học phí hợp lý, nhiều chương trình khuyến mãi hấp dẫn
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Gói Cơ Bản",
                price: "2.500.000",
                duration: "3 tháng",
                popular: false,
                features: [
                  "24 buổi học (2 buổi/tuần)",
                  "Lớp học 15-20 học viên",
                  "Tài liệu học tập cơ bản",
                  "Hỗ trợ online qua group",
                  "Kiểm tra định kỳ hàng tháng",
                ],
              },
              {
                name: "Gói Tiêu Chuẩn",
                price: "4.500.000",
                duration: "6 tháng",
                popular: true,
                features: [
                  "48 buổi học (2 buổi/tuần)",
                  "Lớp học 10-15 học viên",
                  "Tài liệu đầy đủ + HSK",
                  "Hỗ trợ 1-1 với giảng viên",
                  "Thi thử HSK miễn phí",
                  "Cam kết đỗ HSK",
                ],
              },
              {
                name: "Gói VIP",
                price: "9.900.000",
                duration: "12 tháng",
                popular: false,
                features: [
                  "96 buổi học (2 buổi/tuần)",
                  "Lớp học 5-8 học viên",
                  "Tài liệu premium + Videos",
                  "Giảng viên riêng hỗ trợ 24/7",
                  "Thi thử HSK không giới hạn",
                  "Cam kết đỗ HSK hoặc hoàn tiền",
                  "Chứng chỉ hoàn thành",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${
                  plan.popular
                    ? "from-blue-600/30 to-purple-600/30 border-blue-400"
                    : "from-slate-700/50 to-slate-800/50 border-slate-600"
                } border-2 rounded-2xl p-8 hover:scale-105 transition-all animate__animated animate__zoomIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Phổ Biến Nhất
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-1">
                    {plan.price}<span className="text-xl">đ</span>
                  </div>
                  <p className="text-gray-400">{plan.duration}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-600 hover:bg-slate-700"
                  } text-white px-6 py-3 rounded-full font-semibold transition-all`}
                >
                  Đăng Ký Ngay
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              🎁 Ưu đãi đặc biệt: Giảm 20% cho học viên đăng ký trước 31/12/2024
            </p>
            <p className="text-gray-400">
              💳 Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-3xl p-12 border border-blue-500/50 animate__animated animate__pulse animate__infinite">
            <GraduationCap className="w-20 h-20 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bắt Đầu Hành Trình Chinh Phục Tiếng Trung Ngay Hôm Nay!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Đăng ký ngay để nhận <span className="text-yellow-400 font-bold">BUỔI HỌC THỬ MIỄN PHÍ</span> và
              tài liệu học tập giá trị
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-110 shadow-2xl">
                <BookOpen className="w-6 h-6" />
                Đăng Ký Học Thử
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-white hover:bg-white hover:text-blue-900 text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-110">
                <Phone className="w-6 h-6" />
                0123 456 789
              </button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Không mất phí
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Tư vấn miễn phí
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Kiểm tra trình độ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-400">Câu Hỏi</span> Thường Gặp
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Giải đáp những thắc mắc phổ biến của học viên
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Tôi không có nền tảng tiếng Trung, có học được không?",
                answer:
                  "Hoàn toàn có thể! Chúng tôi có lớp dành riêng cho người mới bắt đầu từ con số 0. Giảng viên sẽ hướng dẫn từng bước một cách chi tiết và dễ hiểu. Bạn sẽ được học phiên âm Pinyin, thanh điệu cơ bản trước khi tiến tới Hán tự và giao tiếp.",
              },
              {
                question: "Học bao lâu thì có thể giao tiếp được?",
                answer:
                  "Với người học đều đặn 2-3 buổi/tuần, sau 3-4 tháng bạn đã có thể giao tiếp cơ bản (giới thiệu bản thân, hỏi đường, mua sắm...). Sau 6-8 tháng bạn có thể đạt HSK 3-4 và giao tiếp tương đối tự tin trong công việc và cuộc sống.",
              },
              {
                question: "Học phí có bao gồm tài liệu học tập không?",
                answer:
                  "Có! Học phí đã bao gồm giáo trình chính, sách bài tập, tài liệu photo và truy cập vào hệ thống học liệu online (video bài giảng, bài tập interactive, đề thi thử HSK). Bạn không phải mua thêm bất kỳ tài liệu nào khác.",
              },
              {
                question: "Tôi bận công việc, lịch học có linh hoạt không?",
                answer:
                  "Rất linh hoạt! Chúng tôi có lớp học buổi sáng, chiều, tối và cuối tuần. Ngoài ra còn có lớp online qua Zoom, bạn có thể học mọi lúc mọi nơi. Nếu bận không học được buổi nào, bạn có thể xem lại video bài giảng hoặc đổi sang lớp khác.",
              },
              {
                question: "Cam kết đỗ HSK là như thế nào?",
                answer:
                  "Với học viên theo học đầy đủ khóa học, hoàn thành bài tập và đạt yêu cầu kiểm tra định kỳ, chúng tôi cam kết bạn sẽ đỗ kỳ thi HSK tương ứng. Nếu không đỗ, bạn được học lại miễn phí hoặc hoàn lại 50% học phí (đối với gói VIP: hoàn 100%).",
              },
              {
                question: "Giảng viên có phải người Trung Quốc không?",
                answer:
                  "100% giảng viên chính của chúng tôi là người Trung Quốc bản ngữ, tốt nghiệp các trường đại học sư phạm danh tiếng tại Trung Quốc. Họ có chứng chỉ giảng dạy tiếng Trung quốc tế và kinh nghiệm giảng dạy người Việt từ 5-10 năm. Ngoài ra còn có trợ giảng người Việt hỗ trợ giải đáp ngoài giờ học.",
              },
              {
                question: "Có hỗ trợ tìm việc sau khi học không?",
                answer:
                  "Có! Chúng tôi có mạng lưới liên kết với hơn 200 doanh nghiệp Trung Quốc và FDI tại Việt Nam. Học viên tốt nghiệp xuất sắc sẽ được giới thiệu việc làm hoặc thực tập có lương. Chúng tôi cũng tổ chức các buổi job fair và workshop về kỹ năng phỏng vấn bằng tiếng Trung.",
              },
              {
                question: "Có thể học thử trước khi quyết định đăng ký không?",
                answer:
                  "Có! Bạn được học thử MIỄN PHÍ 01 buổi không mất chi phí. Sau buổi học thử, giảng viên sẽ đánh giá trình độ và tư vấn lộ trình học phù hợp. Bạn hoàn toàn thoải mái quyết định có tiếp tục hay không, không áp lực bất kỳ.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-600 overflow-hidden animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-gray-300 animate__animated animate__fadeIn animate__faster">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">慧林</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    慧林汉语
                  </div>
                  <div className="text-sm font-semibold">Tuệ Lâm Hán Ngữ</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Trung tâm đào tạo tiếng Trung uy tín, chất lượng hàng đầu Việt Nam
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Khóa Học</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    HSK 1-6
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Tiếng Trung Giao Tiếp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Tiếng Trung Thương Mại
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Tiếng Trung Công Xưởng
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Về Chúng Tôi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Giới Thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Đội Ngũ Giảng Viên
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Học Viên Tiêu Biểu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Tin Tức
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liên Hệ</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-blue-400" />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>0123 456 789</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>info@tiengtrungtu elam.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>8:00 - 20:00 (T2-CN)</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Tiếng Trung Tuệ Lâm. All rights reserved.</p>
            <p className="mt-2">
              Website được xây dựng bởi{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Claude Code
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
