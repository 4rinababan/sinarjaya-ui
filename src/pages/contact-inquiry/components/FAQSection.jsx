import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      category: 'Umum',
      questions: [
        {
          question: 'Berapa lama waktu pengerjaan proyek Aluminium ?',
          answer: `•  Waktu pengerjaan Kami bervariasi tergantung kompleksitas dan skala proyek`
        },
        {
          question: 'Apakah ada garansi untuk produk Aluminium ?',
          answer: `• Ya, kami memberikan garansi komprehensif`
        },
        {
          question: 'Apakah bisa custom design sesuai kebutuhan?',
          answer: `Tentu saja! Kami spesialis dalam custom design:\n• Konsultasi desain gratis\n•Berbagai pilihan warna dan finishing\n• Adaptasi dengan arsitektur existing\n• Compliance dengan standar bangunan\n\nTim desainer kami berpengalaman 5+ tahun dalam industri Aluminium .`
        }
      ]
    },
    {
      category: 'Harga & Pembayaran',
      questions: [
        {
          question: 'Bagaimana sistem pembayaran yang tersedia?',
          answer: `Kami menyediakan berbagai opsi pembayaran yang fleksibel:\n\n• Transfer bank (BCA, Mandiri, BNI, BRI)\n• Pembayaran bertahap (DP 50%,Pelunasan 50%)\n•Cash untuk proyek kecil\n\nSemua pembayaran disertai invoice resmi dan kwitansi.`
        },
      ]
    },
    {
      category: 'Teknis & Instalasi',
      questions: [
        {
          question: 'Bagaimana maintenance produk Aluminium ?',
          answer: `Maintenance Aluminium  relatif mudah:\n\n• Pembersihan rutin dengan air sabun\n• Hindari bahan kimia keras\n• Pelumasan hardware setiap 6 bulan\n• Inspeksi sealant setiap tahun\n• Service berkala tersedia\n\nKami menyediakan panduan maintenance lengkap dan layanan after-sales.`
        },
        {
          question: 'Apakah tahan terhadap cuaca ekstrem?',
          answer: `Produk Aluminium  kami sangat tahan cuaca:\n\n• Anti karat dan korosi\n• Tahan UV dan tidak pudar\n• Struktur kuat untuk angin kencang\n• Drainage system untuk hujan deras\n• Thermal break untuk insulasi\n\nTeruji dalam berbagai kondisi iklim Indonesia selama 15+ tahun.`
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const faqId = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Temukan jawaban untuk pertanyaan yang sering diajukan tentang produk dan layanan kami
        </p>
      </div>

      <div className="space-y-6">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {category.category}
            </h3>
            
            <div className="space-y-3">
              {category.questions.map((faq, questionIndex) => {
                const faqId = `${categoryIndex}-${questionIndex}`;
                const isOpen = openFAQ === faqId;
                
                return (
                  <div key={questionIndex} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                      className="w-full px-4 py-4 text-left bg-muted/30 hover:bg-muted/50 transition-smooth flex items-center justify-between"
                    >
                      <span className="font-medium text-foreground pr-4">
                        {faq.question}
                      </span>
                      <Icon
                        name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                        size={20}
                        className="text-muted-foreground flex-shrink-0"
                      />
                    </button>
                    
                    {isOpen && (
                      <div className="px-4 py-4 bg-card border-t border-border">
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="text-center">
          <Icon name="HelpCircle" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Tidak Menemukan Jawaban?
          </h3>
          <p className="text-muted-foreground mb-4">
            Tim customer service kami siap membantu menjawab pertanyaan spesifik Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.open('https://wa.me/6281224591336?text=Halo, saya memiliki pertanyaan tentang produk Aluminium ', '_blank')}
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Chat WhatsApp
            </button>
            <button
              onClick={() => window.open('tel:+622187654321')}
              className="inline-flex items-center justify-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted/50 transition-smooth"
            >
              <Icon name="Phone" size={16} className="mr-2" />
              Telepon Langsung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;