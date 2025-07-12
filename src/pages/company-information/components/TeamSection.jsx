import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Budi Santoso",
      position: "Direktur Utama",
      experience: "20+ tahun",
      expertise: "Manajemen Strategis & Pengembangan Bisnis",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      description: "Memimpin visi perusahaan dengan fokus pada inovasi dan ekspansi pasar aluminum di Indonesia"
    },
    {
      name: "Sari Wijaya",
      position: "Manajer Teknis",
      experience: "15+ tahun",
      expertise: "Teknik Aluminum & Quality Control",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      description: "Ahli dalam spesifikasi teknis aluminum dan memastikan standar kualitas produk tertinggi"
    },
    {
      name: "Ahmad Rahman",
      position: "Kepala Produksi",
      experience: "18+ tahun",
      expertise: "Manufaktur & Proses Produksi",
      image: "https://randomuser.me/api/portraits/men/38.jpg",
      description: "Mengawasi seluruh proses produksi dengan fokus pada efisiensi dan kualitas output"
    },
    {
      name: "Linda Kusuma",
      position: "Manajer Penjualan",
      experience: "12+ tahun",
      expertise: "Strategi Penjualan & Hubungan Pelanggan",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      description: "Membangun hubungan jangka panjang dengan klien dan mengembangkan strategi penjualan"
    }
  ];

  const departments = [
    {
      name: "Tim Teknis",
      count: "8 Ahli",
      icon: "Settings",
      description: "Spesialis dalam desain dan spesifikasi teknis aluminum"
    },
    {
      name: "Quality Control",
      count: "5 Inspektur",
      icon: "Shield",
      description: "Memastikan setiap produk memenuhi standar kualitas tertinggi"
    },
    {
      name: "Customer Service",
      count: "6 Staff",
      icon: "Headphones",
      description: "Memberikan dukungan dan konsultasi kepada pelanggan"
    },
    {
      name: "Logistik",
      count: "10 Staff",
      icon: "Truck",
      description: "Mengelola distribusi dan pengiriman ke seluruh Indonesia"
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Tim Ahli Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Didukung oleh profesional berpengalaman yang berkomitmen memberikan solusi aluminum terbaik
          </p>
        </div>

        {/* Key Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-muted/30 rounded-xl p-6 border border-border hover:shadow-elevation-2 transition-smooth group"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary-foreground" />
                  </div>
                </div>
                
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">
                  {member.position}
                </p>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {member.experience}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  {member.expertise}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Departments Overview */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">
            Departemen & Keahlian
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-smooth"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon 
                      name={dept.icon} 
                      size={24} 
                      className="text-primary"
                    />
                  </div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    {dept.name}
                  </h4>
                  <p className="text-primary font-medium text-sm mb-2">
                    {dept.count}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Values */}
        <div className="mt-12 text-center">
          <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Nilai-Nilai Tim Kami
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Target" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Fokus pada Kualitas</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Kerja Tim Solid</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Lightbulb" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Inovasi Berkelanjutan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;