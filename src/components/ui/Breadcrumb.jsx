import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground mx-2"
              />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-micro font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`font-medium ${
                  index === items.length - 1
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;