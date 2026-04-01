document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sticky header background blur effect
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(9, 9, 11, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(9, 9, 11, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-icon').textContent = '+';
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-icon').textContent = '−';
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('contact-modal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('schedule-form');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Ajax Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        // Show loading state
        btn.textContent = 'Gönderiliyor...';
        btn.disabled = true;

        // Collect data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Send via AJAX to Formsubmit
        fetch('https://formsubmit.co/ajax/teknoctrl@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                AdSoyad: data.name,
                Sirket: data.company,
                Email: data.email,
                Telefon: data.phone,
                Ihtiyac: data.needs
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.success) {
                btn.textContent = 'Başarılı! En kısa sürede iletişime geçeceğiz.';
                btn.style.backgroundColor = '#10b981'; // Success green
                
                setTimeout(() => {
                    closeModal();
                    form.reset();
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 2500);
            } else {
                throw new Error("API return non-success status");
            }
        })
        .catch(error => {
            console.error('Form gönderim hatası:', error);
            btn.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            btn.style.backgroundColor = '#ef4444'; // Error red
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        });
    });
});
