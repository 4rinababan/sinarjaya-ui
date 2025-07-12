import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ productName, productUrl }) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    whatsapp: {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`Lihat produk aluminum ini: ${productName} - ${productUrl}`)}`
    },
    telegram: {
      name: 'Telegram',
      icon: 'Send',
      color: 'text-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}`
    },
    facebook: {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    },
    twitter: {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(productUrl)}`
    }
  };

  const handleShare = (platform) => {
    window.open(shareData[platform].url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Bagikan Produk
      </h3>
      
      <div className="space-y-4">
        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(shareData).map(([platform, data]) => (
            <Button
              key={platform}
              variant="outline"
              size="sm"
              onClick={() => handleShare(platform)}
              className="flex flex-col items-center space-y-2 h-auto py-3"
            >
              <Icon name={data.icon} size={20} className={data.color} />
              <span className="text-xs font-medium">{data.name}</span>
            </Button>
          ))}
        </div>

        {/* Copy Link */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-muted rounded-md px-3 py-2">
              <p className="text-sm text-muted-foreground truncate">
                {productUrl}
              </p>
            </div>
            <Button
              variant={copied ? "success" : "outline"}
              size="sm"
              onClick={handleCopyLink}
              className="flex-shrink-0"
            >
              <Icon name={copied ? "Check" : "Copy"} size={16} className="mr-2" />
              {copied ? 'Tersalin' : 'Salin'}
            </Button>
          </div>
        </div>

        {/* Share Stats */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>1,234 kali dilihat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Share" size={16} />
              <span>89 kali dibagikan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;