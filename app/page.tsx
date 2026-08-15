import {
  Rocket,
  Palette,
  Zap,
  Globe,
  Code,
  Heart,
  Star,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2 animate__animated animate__fadeInLeft">
            <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Next.js App</span>
          </div>
          <div className="flex gap-4 animate__animated animate__fadeInRight">
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate__animated animate__fadeInUp">
          Chào mừng đến với
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Next.js Landing Page
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Dự án được xây dựng với Next.js, Tailwind CSS, Lucide Icons, Animate.css và hỗ trợ đầy đủ tiếng Việt
        </p>
        <div className="flex gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
            <Zap className="w-5 h-5" />
            Bắt đầu ngay
          </button>
          <button className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
            <Code className="w-5 h-5" />
            Xem mã nguồn
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate__animated animate__fadeIn">
          Tính năng nổi bật
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Rocket className="w-12 h-12" />,
              title: "Next.js 15",
              description: "Framework React mạnh mẽ với App Router và Server Components",
              color: "blue"
            },
            {
              icon: <Palette className="w-12 h-12" />,
              title: "Tailwind CSS",
              description: "Utility-first CSS framework cho thiết kế nhanh chóng",
              color: "cyan"
            },
            {
              icon: <Zap className="w-12 h-12" />,
              title: "Lucide Icons",
              description: "Bộ icon đẹp mắt và dễ sử dụng với hơn 1000+ icons",
              color: "purple"
            },
            {
              icon: <Globe className="w-12 h-12" />,
              title: "Tiếng Việt",
              description: "Hỗ trợ đầy đủ font chữ tiếng Việt từ Google Fonts",
              color: "green"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 animate__animated animate__fadeInUp`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-${feature.color}-600 dark:text-${feature.color}-400 mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-3xl p-12 text-center animate__animated animate__fadeIn">
          <Star className="w-16 h-16 text-white mx-auto mb-6 animate__animated animate__bounce animate__infinite" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Sẵn sàng để bắt đầu?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tất cả đã được cài đặt và cấu hình sẵn sàng. Hãy bắt đầu xây dựng ứng dụng tuyệt vời của bạn!
          </p>
          <button className="flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 mx-auto">
            <Heart className="w-5 h-5" />
            Tạo điều tuyệt vời
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p className="font-mono">
          Built with <Heart className="w-4 h-4 inline text-red-500" /> using Next.js, Tailwind CSS & Lucide Icons
        </p>
      </footer>
    </div>
  );
}
