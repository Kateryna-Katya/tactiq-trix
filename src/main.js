document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    lucide.createIcons();

    // 2. Управление Хедером при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 249, 245, 0.95)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(255, 249, 245, 0.8)';
        }
    });

    // 3. Мобильное меню
    const burger = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    function toggleMenu() {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 4. Intersection Observer для анимации появления (Reveal)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Параллакс эффект для карточки в Hero
    document.addEventListener('mousemove', (e) => {
        const card = document.querySelector('.hero__floating-card');
        if (!card) return;
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });

    // 6. Логика контактной формы и капчи
    const form = document.getElementById('career-form');
    if (form) {
        const phoneInput = document.getElementById('user-phone');
        const phoneError = document.getElementById('phone-error');
        const captchaQuestion = document.getElementById('captcha-question');
        const captchaInput = document.getElementById('captcha-input');
        const successMessage = document.getElementById('success-message');
        const loader = document.getElementById('loader');
        let captchaResult;

        function generateCaptcha() {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            captchaResult = a + b;
            captchaQuestion.innerText = `${a} + ${b} = ?`;
        }

        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            phoneError.style.display = /\D/.test(e.target.value) ? 'block' : 'none';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== captchaResult) {
                alert('Ошибка капчи!');
                generateCaptcha();
                return;
            }

            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            loader.style.display = 'inline-block';

            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                loader.style.display = 'none';
                lucide.createIcons();
            }, 1500);
        });

        generateCaptcha();
    }

    // 7. Cookie Popup Logic
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // 8. Плавный скролл для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Глобальная функция сброса формы (для кнопки в сообщении об успехе)
function resetForm() {
    const form = document.getElementById('career-form');
    const successBox = document.getElementById('success-message');
    form.reset();
    form.style.display = 'block';
    successBox.style.display = 'none';
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('submit-btn').querySelector('span').innerText = 'Отправить запрос';
}