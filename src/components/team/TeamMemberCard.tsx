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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Profile Image */}
      <div className="relative w-full pt-[100%] bg-gray-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center grayscale absolute top-0 left-0"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col">
        {/* Name */}
        <div className="mb-3">
          <Text size="L1" className="font-bold text-gray-900">
            {member.name}
          </Text>
        </div>

        {/* Social Links */}
        {member.social && (
          <div className="flex gap-3 items-center">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orangeDark1 transition-colors duration-200"
                aria-label={`LinkedIn de ${member.name}`}
              >
                <Icon type="LinkedIn" size="lg" />
              </a>
            )}
            {member.social.email && (
              <a
                href={member.social.email}
                className="text-orange hover:text-orangeDark1 transition-colors duration-200"
                aria-label={`Email de ${member.name}`}
              >
                <Icon type="Email" size="lg" />
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
                <Icon type="Instagram" size="lg" />
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
                <Icon type="Facebook" size="lg" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
