import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTrack, setActiveTrack] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const musicRef = useRef(null);
  const contactRef = useRef(null);

  const tracks = [
    { id: 1, title: 'Midnight Waves', duration: '3:45', plays: '12K' },
    { id: 2, title: 'Urban Lights', duration: '4:12', plays: '8.5K' },
    { id: 3, title: 'Echoes of You', duration: '3:28', plays: '21K' },
    { id: 4, title: 'Silent Storm', duration: '5:01', plays: '15.3K' }
  ];

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Пожалуйста, введите ваш email');
      setSuccessMessage('');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Пожалуйста, введите корректный email');
      setSuccessMessage('');
      return;
    }
    
    setErrorMessage('');
    setSuccessMessage('Спасибо за подписку! Проверьте вашу почту.');
    setIsSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
    {
      id: 1,
      url: "https://www.travsonic.com/wp-content/uploads/2023/02/digital-audio-workstation-1280x853.jpg",
      title: "В студии",
      description: "Запись нового EP",
    },
    {
      id: 2,
      url: "https://avatars.mds.yandex.net/get-afishanew/4487581/cd7642cd9353b4434243e901dfcfface/960x690_noncrop",
      title: "Live at Berghain",
      description: "6-часовой сет",
    },
    {
      id: 3,
      url: "https://www.profguide.io/images/article/a/57/tUJKd6jSDe.webp",
      title: "За кулисами",
      description: "Перед выступлением",
    },
    {
      id: 4,
      url: "https://open-air.ru/content/files/images/news/elektronnyj_zvuk.jpg",
      title: "Синтезаторы",
      description: "Модульная система",
    },
    {
      id: 5,
      url: "https://dj.ru/images/news/96/1004296_source.jpg",
      title: "Фестиваль",
      description: "Главная сцена",
    },
    {
      id: 6,
      url: "https://cdn.culture.ru/images/20bfc8be-4c6d-58a0-bea2-994e38a445df",
      title: "Микшерный пульт",
      description: "Подготовка к саундчеку",
    }
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="noise"></div>
      
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection(heroRef)}>
            <span className="logo-text">AURORA</span>
            <span className="logo-dot"></span>
          </div>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><button onClick={() => scrollToSection(heroRef)}>Главная</button></li>
            <li><button onClick={() => scrollToSection(aboutRef)}>Об исполнителе</button></li>
            <li><button onClick={() => scrollToSection(musicRef)}>Музыка</button></li>
            <li><button onClick={() => scrollToSection(contactRef)}>Контакты</button></li>
          </ul>
        </div>
      </nav>

      <section ref={heroRef} className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="artist-name">
            <span className="animate-text">AURORA</span>
            <span className="animate-text-delay">NOVA</span>
          </div>
          <h1 className="hero-title">Electronic Music Producer</h1>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1.2M</span>
              <span className="stat-label">Слушателей</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Альбома</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Концертов</span>
            </div>
          </div>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollToSection(musicRef)}>
              Слушать
              <span className="btn-glow"></span>
            </button>
            <button className="btn btn-outline" onClick={() => scrollToSection(contactRef)}>
              Связаться
            </button>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection(aboutRef)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section ref={aboutRef} className="about">
        <div className="container">
          <h2 className="section-title">Об исполнителе</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="image-frame">
                <div className="image-placeholder">
                  <div className="vinyl-record">
                    <div className="vinyl-label"></div>
                  </div>
                </div>
              </div>
              <div className="experience-badge">
                <span className="years">10+</span>
                <span className="text">лет опыта</span>
              </div>
            </div>
            <div className="about-text">
              <p className="highlight-text">Создаю звуковые ландшафты, выходящие за границы</p>
              <p>Aurora Nova — электронный музыкальный продюсер и диджей из Берлина, известная своим уникальным сочетанием эфирных мелодий и глубоких басовых линий. Её звучание объединяет элементы прогрессив-хауса, мелодик-техно и эмбиента.</p>
              <p>С релизами на известных лейблах и выступлениями на культовых площадках Европы, Aurora продолжает расширять границы электронной музыки.</p>
              <div className="features-grid">
                <div className="feature">
                  <span className="feature-icon">🎵</span>
                  <span className="feature-text">Уникальный саунд-дизайн</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎚️</span>
                  <span className="feature-text">Живые выступления</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💿</span>
                  <span className="feature-text">Студийная работа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={musicRef} className="music">
        <div className="container">
          <h2 className="section-title">Новые релизы</h2>
          <div className="tracks-grid">
            {tracks.map((track) => (
              <div 
                key={track.id} 
                className={`track-card ${activeTrack === track.id ? 'active' : ''}`}
                onClick={() => setActiveTrack(track.id === activeTrack ? null : track.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setActiveTrack(track.id === activeTrack ? null : track.id)}
              >
                <div className="track-waveform">
                  <div className="waveform-bars">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bar"
                        style={{ 
                          animationDelay: `${i * 0.05}s`,
                          height: activeTrack === track.id ? `${Math.sin(i) * 30 + 30}%` : '30%'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="track-info">
                  <h3 className="track-title">{track.title}</h3>
                  <div className="track-meta">
                    <span className="track-duration">
                      {track.duration}
                    </span>
                    <span className="track-plays">
                      {track.plays} прослушиваний
                    </span>
                  </div>
                </div>
                {activeTrack === track.id && (
                  <div className="track-tooltip">
                    Сейчас играет в вашем воображении 🎧
                  </div>
                )}
              </div>
            ))}
          </div>
                  
          <div className="platforms">
            <h3 className="platforms-title">Слушайте на</h3>
            <div className="platform-icons">
              <a href="#" className="platform-link" title="Слушать на Spotify">
               
                <span className="platform-name">Spotify</span>
              </a>
              <a href="#" className="platform-link" title="Слушать на Apple Music">
               
                <span className="platform-name">Apple Music</span>
              </a>
              <a href="#" className="platform-link" title="Слушать на SoundCloud">
               
                <span className="platform-name">SoundCloud</span>
              </a>
              <a href="#" className="platform-link" title="Слушать на YouTube">
              
                <span className="platform-name">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2 className="section-title">Фотогалерея</h2>
          
          <div className="gallery-slider">
            <div className="gallery-main">
              <div className="photo-frame">
                <div className="photo-placeholder">
                  <img 
                    src={photos[currentPhoto].url} 
                    alt={photos[currentPhoto].title}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                </div>
                
                <div className="photo-info">
                  <h3 className="photo-title">{photos[currentPhoto].title}</h3>
                  <p className="photo-description">{photos[currentPhoto].description}</p>
                </div>
              </div>
              
              <div className="gallery-nav">
                <button className="gallery-arrow prev" onClick={prevPhoto}>
                  <span>←</span>
                </button>
                
                <div className="gallery-counters">
                  <span className="current">{currentPhoto + 1}</span>
                  <span className="separator">/</span>
                  <span className="total">{photos.length}</span>
                </div>
                
                <button className="gallery-arrow next" onClick={nextPhoto}>
                  <span>→</span>
                </button>
              </div>
            </div>
            
            <div className="gallery-thumbnails">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  className={`thumbnail ${index === currentPhoto ? 'active' : ''}`}
                  onClick={() => setCurrentPhoto(index)}
                >
                  
                  <span className="thumbnail-title">{photo.title}</span>
                </button>
              ))}
            </div>
          </div>
          
        
        </div>
      </section>

      <section ref={contactRef} className="contact">
        <div className="container">
          <h2 className="section-title">Оставайтесь на связи</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Связаться</h3>
              <p>По вопросам бронирования, коллабораций или просто чтобы сказать привет</p>
              <div className="social-links">
                <a href="#" className="social-link" title="Подписаться в Instagram">
                  Instagram
                </a>
                <a href="#" className="social-link" title="Подписаться в Twitter">
                  Twitter
                </a>
              </div>
            </div>
            
            <div className="newsletter">
              <h3>Рассылка</h3>
              <p>Подпишитесь на эксклюзивный контент и даты туров</p>
              <form onSubmit={handleSubscribe} className="subscribe-form" noValidate>
                <div className="input-group">
                  <input
                    type="email"
                    className={`email-input ${errorMessage ? 'error' : ''} ${successMessage ? 'success' : ''}`}
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                    aria-label="Email для рассылки"
                  />
                  <button type="submit" className="subscribe-btn">
                    Подписаться
                    <span className="btn-glow"></span>
                  </button>
                </div>
                
                <div className="message-container">
                  {errorMessage && (
                    <div className="error-message" role="alert">
                      <span className="message-icon">⚠️</span>
                      <span className="message-text">{errorMessage}</span>
                    </div>
                  )}
                  {successMessage && (
                    <div className="success-message" role="alert">
                      <span className="message-icon">✓</span>
                      <span className="message-text">{successMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo" onClick={() => scrollToSection(heroRef)}>
              AURORA<span className="logo-dot">.</span>
            </div>
            <p className="copyright">© 2026 Aurora Nova. Все права защищены.</p>
            <div className="footer-links">
              <a href="#" title="Политика конфиденциальности">Конфиденциальность</a>
              <span className="separator">•</span>
              <a href="#" title="Условия использования">Условия</a>
              <span className="separator">•</span>
              <a href="#" title="Политика cookie">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;