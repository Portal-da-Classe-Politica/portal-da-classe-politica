import React from 'react';
import Image from 'next/image';
import { Text } from '@base';
import { Icon } from '@components/base';

interface TeamMember {
  name: string;
  description: string;
  image: string;
  social?: {
    linkedin?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full flex flex-col min-h-[500px]">
      {/* Profile Image */}
      <div className="relative aspect-square bg-gray-100 flex-shrink-0">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Name */}
        <div className="h-12 flex items-start mb-2">
          <Text size="L1" className="font-bold text-gray-900 line-clamp-2">
            {member.name}
          </Text>
        </div>

        {/* Description */}
        <div className="flex-grow mb-4">
          <Text size="B2" className="text-gray-600 line-clamp-4">
            {member.description}
          </Text>
        </div>

        {/* Social Links */}
        {member.social && (
          <div className="flex gap-3 mt-auto h-6 items-center">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orangeDark1 transition-colors duration-200"
                aria-label={`LinkedIn de ${member.name}`}
              >
                <Icon type="LinkedIn" size="sm" />
              </a>
            )}
            {member.social.email && (
              <a
                href={member.social.email}
                className="text-orange hover:text-orangeDark1 transition-colors duration-200"
                aria-label={`Email de ${member.name}`}
              >
                <Icon type="Email" size="sm" />
              </a>
            )}
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orangeDark1 transition-colors duration-200"
                aria-label={`Instagram de ${member.name}`}
              >
                <Icon type="Instagram" size="sm" />
              </a>
            )}
            {member.social.facebook && (
              <a
                href={member.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orangeDark1 transition-colors duration-200"
                aria-label={`Facebook de ${member.name}`}
              >
                <Icon type="Facebook" size="sm" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
