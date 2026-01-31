// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const body = document.body;
    
    // Set initial language from localStorage or default to English
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    body.classList.add(`lang-${savedLang}`);
    
    // Update button states
    langButtons.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Language switch handler
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            
            // Update body class
            body.classList.remove('lang-en', 'lang-bn');
            body.classList.add(`lang-${selectedLang}`);
            
            // Update button states
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Save preference to localStorage
            localStorage.setItem('preferredLanguage', selectedLang);
            
            // Update page title based on language
            updatePageTitle(selectedLang);
            
            // Update WhatsApp message based on language
            updateWhatsAppLink(selectedLang);
        });
    });
    
    function updatePageTitle(lang) {
        const titles = {
            en: 'AquaGrow Bangladesh | Healthy Fish & Premium Fingerlings',
            bn: 'অ্যাকুয়াগ্রো বাংলাদেশ | স্বাস্থ্যকর মাছ ও উন্নত পোনা'
        };
        document.title = titles[lang] || titles.en;
    }
    
    function updateWhatsAppLink(lang) {
        const whatsappLinks = document.querySelectorAll('.whatsapp-float');
        const messages = {
            en: "I want to order fingerlings from AquaGrow Bangladesh",
            bn: "আমি অ্যাকুয়াগ্রো বাংলাদেশ থেকে পোনা অর্ডার করতে চাই"
        };
        
        whatsappLinks.forEach(link => {
            const phone = '8801712345678'; // Replace with actual number
            const message = encodeURIComponent(messages[lang]);
            link.href = `https://wa.me/${phone}?text=${message}`;
        });
    }
    
    // Update WhatsApp button text based on language
    function updateWhatsAppButtonText() {
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (!whatsappFloat) return;
        
        const span = whatsappFloat.querySelector('span');
        if (span) {
            if (body.classList.contains('lang-en')) {
                span.textContent = 'Order on WhatsApp';
            } else {
                span.textContent = 'হোয়াটসঅ্যাপে অর্ডার';
            }
        }
    }
    
    // Call initially and when language changes
    updateWhatsAppButtonText();
    document.addEventListener('languageChanged', updateWhatsAppButtonText);
});