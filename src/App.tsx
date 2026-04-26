/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'motion/react';
import { 
  ShoppingBag, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Star, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Ghost,
  CheckCircle2,
  Download,
  Apple,
  Play
} from 'lucide-react';

// --- Constants & Data ---

const NAV_LINKS = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'المميزات', href: '#features' },
  { name: 'كيف نعمل', href: '#how-it-works' },
  { name: 'من نحن', href: '#about' },
];

const FEATURES = [
  {
    title: 'توصيل صاروخي',
    description: 'أسرع دليفري ممكن تتخيله، طلبك هيكون عندك سخن وطازة في دقايق.',
    icon: <Clock className="w-10 h-10 text-primary" />,
  },
  {
    title: 'تغطية شاملة',
    description: 'إحنا في كل مكان حواليك، "مكانك" بيوصل لأي مكان، في أي وقت.',
    icon: <MapPin className="w-10 h-10 text-primary" />,
  },
  {
    title: 'أوفر الأسعار',
    description: 'عروض وخصومات يومية، وتوصيل بأقل تكلفة عشان نوفر عليك.',
    icon: <ShoppingBag className="w-10 h-10 text-primary" />,
  },
  {
    title: 'دعم فني 24/7',
    description: 'فريقنا جاهز يخدمك ويجاوب على استفساراتك طول اليوم.',
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
  },
];

const STEPS = [
  {
    id: 1,
    title: 'حمل التطبيق وسجل',
    description: 'نزل "مكانك" وسجل حسابك في ثواني.',
  },
  {
    id: 2,
    title: 'اختار اللي نفسك فيه',
    description: 'تصفح مئات المطاعم والمنتجات واختار طلبك.',
  },
  {
    id: 3,
    title: 'استلم وانت مرتاح',
    description: 'تابع المندوب لحظة بلحظة لحد ما يوصلك.',
  },
];

const TESTIMONIALS = [
  {
    name: 'أحمد محمد',
    role: 'عميل مميز',
    content: 'بجد تطبيق ممتاز! سرعة في التوصيل والأكل وصل سخن كأني لسه مطلعه من الفرن. والمندوب كان محترم جداً. شكراً مكانك!',
    rating: 5,
  },
  {
    name: 'سارة علي',
    role: 'عميل دائم',
    content: 'أحلى حاجة في التطبيق العروض اليومية، وفرت كتير! واجهة المستخدم سهلة جداً والتعامل راقي.',
    rating: 5,
  },
  {
    name: 'خالد عمر',
    role: 'عميل جديد',
    content: 'أول تجربة لي وكانت مذهلة. التوصيل كان في وقت قياسي والتطبيق سلس جداً في الاستخدام.',
    rating: 5,
  },
];

const FUN_FACTS = [
  { label: 'مستخدم سعيد', target: 15000, suffix: '+' },
  { label: 'طلب ناجح', target: 12000, suffix: '+' },
  { label: 'مطعم مشترك', target: 500, suffix: '+' },
  { label: 'سنة خبرة', target: 5, suffix: '' },
];

// --- Components ---

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = Math.ceil(target / (duration / 16));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-2xl md:text-3xl font-black mb-4 mx-auto max-w-lg leading-tight ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-slate-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      className={`h-1.5 w-24 mx-auto mt-6 rounded-full ${light ? 'bg-white' : 'bg-primary'}`}
    />
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-primary selection:text-white overflow-x-hidden relative">
      
      {/* Mesh Backgrounds */}
      <div className="mesh-bg" />
      <div className="mesh-bg-2" />
      
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-primary p-2 rounded-xl">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-primary tracking-tighter">مكانك</span>
          </motion.div>
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-slate-700 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/25 transition-all"
            >
              حمل التطبيق
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-lg font-bold text-slate-800 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="mt-4">
                  <button className="w-full bg-primary text-white font-bold py-3 rounded-xl">حمل الآن</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden scroll-mt-20">
        {/* Background Mesh Gradient */}
        <div className="absolute top-0 right-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_50%)] from-orange-100/50" />
        <div className="absolute bottom-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from),_transparent_40%)] from-teal-50" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-right">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>مكانك.. طلباتك أوامر!</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900 max-w-sm mx-auto lg:mr-0"
              >
                مكانك.. <br />
                <span className="text-primary italic">طلباتك أوامر!</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:ml-0 lg:mr-0 leading-relaxed font-medium"
              >
                ما تشيلش هم المشوار، "مكانك" هيجيبلك كل اللي محتاجه لحد باب بيتك في أسرع وقت. أكل، خضار، أو أي طلبات تانية، إحنا جاهزين!
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-slate-900 text-white flex items-center justify-center gap-3 px-8 py-4 rounded-2xl shadow-xl hover:bg-slate-800 transition-all group"
                >
                  <Play className="fill-white" size={20} />
                  <div className="text-right">
                    <div className="text-[10px] opacity-70">حمله الآن من</div>
                    <div className="text-lg font-bold leading-none">Google Play</div>
                  </div>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl shadow-lg hover:border-primary transition-all group"
                >
                  <Apple size={20} />
                  <div className="text-right">
                    <div className="text-[10px] opacity-70">حمله الآن من</div>
                    <div className="text-lg font-bold leading-none">App Store</div>
                  </div>
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-6"
              >
                <div className="flex -space-x-4 space-x-reverse">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <div className="text-sm font-bold text-slate-500">15k+ مستخدم سعيد</div>
                </div>
              </motion.div>
            </div>
            
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="relative z-10 mx-auto w-[280px] md:w-[350px]"
              >
                {/* Mock Phone UI */}
                <div className="bg-slate-900 p-3 rounded-[3rem] shadow-2xl overflow-hidden relative border-4 border-slate-800">
                  <div className="bg-white rounded-[2.2rem] h-[550px] md:h-[700px] overflow-hidden relative">
                    {/* Phone Header */}
                    <div className="bg-primary p-6 text-white pt-10">
                      <div className="flex justify-between items-center mb-6">
                        <MapPin size={20} />
                        <span className="font-bold">القاهرة، مصر</span>
                        <div className="w-8 h-8 rounded-full bg-white/20" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-white" />
                        <span className="text-sm opacity-80">عايز تاكل إيه النهاردة؟</span>
                      </div>
                    </div>
                    
                    {/* Phone Body */}
                    <div className="p-4 space-y-4">
                      <div className="h-32 bg-orange-50 rounded-2xl border-2 border-orange-100 flex items-center justify-between p-4 overflow-hidden relative">
                        <div className="flex-1 px-4 text-primary font-black text-xl italic uppercase">خصم 50%</div>
                        <div className="w-20 h-20 bg-primary/20 rounded-full blur-2xl absolute -right-5 -top-5" />
                        <ShoppingBag size={48} className="text-primary opacity-20" />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2">
                        {['🍕', '🍔', '🍦', '🍣'].map(emoji => (
                          <div key={emoji} className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                            {emoji}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="h-24 bg-white shadow-sm border border-slate-100 rounded-2xl flex p-2 gap-3">
                          <div className="w-20 bg-slate-100 rounded-xl" />
                          <div className="flex-1 py-2 space-y-2">
                            <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
                            <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                            <div className="flex gap-1">
                               <Star size={10} className="text-yellow-400 fill-current" />
                               <Star size={10} className="text-yellow-400 fill-current" />
                               <Star size={10} className="text-yellow-400 fill-current" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Phone Tab bar */}
                    <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around p-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><ShoppingBag size={20} /></div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><MapPin size={20} /></div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><Smartphone size={20} /></div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-2xl text-right z-20 hidden md:block"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="font-bold text-sm">تم استلام الطلب!</span>
                  </div>
                  <p className="text-[10px] text-slate-500">مندوبنا في الطريق إليك</p>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                   className="absolute -bottom-6 -left-12 bg-white p-4 rounded-2xl shadow-2xl z-20 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black">50%</div>
                    <div>
                      <div className="font-bold text-sm">كوبون خصم جديد</div>
                      <div className="text-[10px] text-slate-500">MAKANAK50</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Visual Accent Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Fun Facts Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {FUN_FACTS.map((fact, idx) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-white"
              >
                <div className="block mb-2">
                  <Counter target={fact.target} suffix={fact.suffix} />
                </div>
                <div className="text-white/80 font-bold uppercase tracking-wide text-sm">{fact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 relative order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4 pt-12">
                   <div className="h-64 bg-orange-100 rounded-3xl overflow-hidden relative group">
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all" />
                      <div className="absolute inset-0 flex items-center justify-center text-primary">
                        <ShoppingBag size={64} opacity={0.3} />
                      </div>
                   </div>
                   <div className="h-48 bg-slate-900 rounded-3xl flex items-center justify-center p-6 text-center">
                      <p className="text-white font-bold">بنوصل لأي مكان، في أي وقت</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="h-48 bg-teal-500 rounded-3xl flex items-center justify-center p-6 text-center">
                      <p className="text-white font-bold">جودة عالية في كل تفصيلة</p>
                   </div>
                   <div className="h-64 bg-slate-100 rounded-3xl overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <Truck size={64} />
                      </div>
                   </div>
                </div>
              </motion.div>
              {/* Background Shapes */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-50 blur-[100px]" />
            </div>

            <div className="flex-1 order-1 lg:order-2 text-right">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-primary font-black uppercase tracking-widest mb-2">من نحن</h4>
                <h2 className="text-2xl md:text-4xl font-black mb-8 text-slate-900 max-w-[280px] md:max-w-md ml-0 mr-auto leading-tight">اكتشف ليه عشاق الأكل <br /> بيثقوا في مكانك</h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    في "مكانك"، إحنا مش بس بنوصل أكل، إحنا بنوصل تجربة. بنهتم بكل تفصيلة من وقت ما تطلب لحد ما الأكل يوصلك سخن وطازة. فريقنا مدرب عشان يضمنلك أعلى جودة وأسرع وقت.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed font-bold border-r-4 border-primary pr-6">
                    سواء كنت في الشغل، في البيت، أو مع صحابك، "مكانك" دايماً جنبك. بنغطي أكبر نطاق جغرافي وبنوفرلك تشكيلة واسعة من المطاعم اللي تناسب كل الأذواق. حمل التطبيق دلوقتي وانضم لعائلة "مكانك" واستمتع بعروض وخصومات يومية مبتخلصش!
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ gap: '1.5rem' }}
                  className="mt-10 flex items-center gap-4 text-primary font-black text-xl group transition-all"
                >
                  أعرف أكتر عنا
                  <ChevronDown className="-rotate-90 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading 
            title="ليه تختار مكانك؟" 
            subtitle="مميزات تخلينا اختيارك الأول للتوصيل في أي وقت" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 rounded-[2.5rem] text-center flex flex-col items-center group cursor-default"
              >
                <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="ازاي تطلب من مكانك؟" 
            subtitle="خطوات بسيطة وسهلة والأكلة تكون عندك في أسرع وقت" 
          />
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center relative mb-8 border-4 border-primary/10 group-hover:border-primary transition-all duration-500">
                    <span className="text-4xl font-black text-primary">{step.id}</span>
                    <div className="absolute -z-10 w-full h-full rounded-full bg-primary/10 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-lg text-slate-500 max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading 
            title="عملاؤنا بيقولوا إيه؟" 
            subtitle="آراء حقيقية من ناس جربوا مكانك واستمتعوا بتجربة فريدة" 
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 relative group"
              >
                <div className="text-primary mb-4 flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6 italic opacity-90">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <span className="text-sm opacity-50">{t.role}</span>
                  </div>
                </div>
                <div className="absolute top-6 right-8 text-primary/10">
                  <Ghost size={64} strokeWidth={1} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[150px] -z-0" />
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
          >
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight mx-auto">جاهز تجرب مكانك؟</h2>
              <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto">
                حمل التطبيق دلوقتي واستمتع بأحلى الأكلات وأسرع توصيل في منطقتك. أول طلب عليه خصم خاص!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="w-full sm:w-auto bg-slate-900 text-white flex items-center justify-center gap-4 px-10 py-5 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all font-bold text-xl"
                  >
                    <Play size={24} fill="white" />
                    Google Play
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="w-full sm:w-auto bg-white text-primary flex items-center justify-center gap-4 px-10 py-5 rounded-2xl shadow-2xl hover:bg-slate-50 transition-all font-bold text-xl"
                  >
                    <Apple size={24} />
                    App Store
                  </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Glass Stats Bar */}
      <section className="container mx-auto px-6 -mb-10 relative z-10 hidden lg:block">
        <div className="glass-card rounded-[2rem] py-8 px-12 flex items-center justify-between">
          <div className="flex gap-16">
            <div>
              <div className="text-3xl font-black text-primary">12k+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">طلب ناجح</div>
            </div>
            <div className="w-[1px] h-12 bg-slate-200" />
            <div>
              <div className="text-3xl font-black text-primary">500+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">مطعم شريك</div>
            </div>
            <div className="w-[1px] h-12 bg-slate-200" />
            <div className="flex flex-col">
              <div className="flex gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">تقييم المستخدمين</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-left text-sm">
              <div className="font-bold text-slate-900">أحمد محمد</div>
              <div className="text-slate-400 text-[10px]">"بجد تطبيق ممتاز! سرعة في التوصيل."</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">أ.م</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-right">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6 justify-start">
                <span className="text-3xl font-black text-primary tracking-tighter">مكانك</span>
                <div className="bg-primary p-2 rounded-xl">
                  <ShoppingBag className="text-white w-6 h-6" />
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed">
                تطبيق "مكانك" هو رفيقك اليومي لكل احتياجاتك. توصيل سريع، جودة عالية، وخدمة عملاء مميزة دايماً جنبك.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-xl mb-6 text-slate-900 border-r-4 border-primary pr-3">روابط سريعة</h4>
              <ul className="space-y-4 text-slate-600 font-bold">
                <li><a href="#hero" className="hover:text-primary transition-colors">الرئيسية</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">المميزات</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">كيف نعمل</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-6 text-slate-900 border-r-4 border-primary pr-3">حمل التطبيق</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-end gap-3 bg-slate-900 text-white p-3 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <div className="text-right">
                       <div className="text-[10px] opacity-70">Download on</div>
                       <div className="text-sm font-bold">App Store</div>
                    </div>
                    <Apple size={20} />
                 </div>
                 <div className="flex items-center justify-end gap-3 bg-slate-900 text-white p-3 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <div className="text-right">
                       <div className="text-[10px] opacity-70">Get it on</div>
                       <div className="text-sm font-bold">Google Play</div>
                    </div>
                    <Play size={20} fill="white" />
                 </div>
              </div>
            </div>

            <div>
              <h4 className="font-black text-xl mb-6 text-slate-900 border-r-4 border-primary pr-3">تابعنا</h4>
              <div className="flex items-center gap-4 justify-end">
                <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all"><Facebook /></motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all"><Instagram /></motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all group">
                   <div className="font-black text-xl">X</div>
                </motion.a>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-100 text-center text-slate-400 font-bold">
            <p>جميع الحقوق محفوظة © 2026 تطبيق مكانك. تم التطوير بواسطة neovidia</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
        >
          <Download size={20} />
          حمل التطبيق الآن
        </motion.button>
      </div>

    </div>
  );
}
