import { Injectable } from '@angular/core';

export interface AvatarOptions {
  name: string;
  backgroundColor?: string;
  textColor?: string;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  
  constructor() { }

  /**
   * Generate initials from a full name
   */
  getInitials(name: string): string {
    if (!name) return 'NA';
    
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Generate a color based on name hash
   */
  getColorFromName(name: string): string {
    const colors = [
      '#4F46E5', '#059669', '#DC2626', '#7C3AED', 
      '#F59E0B', '#0EA5E9', '#EF4444', '#10B981',
      '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return colors[Math.abs(hash) % colors.length];
  }

  /**
   * Generate SVG avatar string
   */
  generateSvgAvatar(options: AvatarOptions): string {
    const { name, size = 120 } = options;
    const initials = this.getInitials(name);
    const backgroundColor = options.backgroundColor || this.getColorFromName(name);
    const textColor = options.textColor || '#FFFFFF';
    const fontSize = Math.round(size * 0.4);
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size/2}"/>
        <text 
          x="${size/2}" 
          y="${size/2 + fontSize/3}" 
          text-anchor="middle" 
          fill="${textColor}" 
          font-family="Arial, sans-serif" 
          font-size="${fontSize}" 
          font-weight="bold">
          ${initials}
        </text>
      </svg>
    `;
  }

  /**
   * Generate data URL for avatar
   */
  generateAvatarDataUrl(options: AvatarOptions): string {
    const svg = this.generateSvgAvatar(options);
    const encodedSvg = encodeURIComponent(svg);
    return `data:image/svg+xml,${encodedSvg}`;
  }

  /**
   * Get avatar URL with fallback
   */
  getAvatarUrl(avatarUrl?: string, name?: string): string {
    if (avatarUrl) {
      return avatarUrl;
    }
    
    if (name) {
      return this.generateAvatarDataUrl({ name });
    }
    
    return 'assets/images/avatars/default-avatar.svg';
  }
}
