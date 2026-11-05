import React, { useEffect } from 'react';
import { PortfolioData } from '../types/portfolio';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { TerminalSection } from '../sections/TerminalSection';
import { GitHubSection } from '../sections/GitHubSection';
import { EducationCertificationsSection } from '../sections/EducationCertificationsSection';
import { ContactSection } from '../sections/ContactSection';

interface HomePageProps {
  portfolio: PortfolioData;
  onSectionChange: (sectionId: string) => void;
  onOpenAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  portfolio,
  onSectionChange,
  onOpenAssistant,
}) => {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            onSectionChange(entry.target.id);
          }
        }
      },
      { threshold: 0.28 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [onSectionChange]);

  return (
    <main className="relative z-10">
      <HeroSection
        profile={portfolio.profile}
        onOpenAssistant={onOpenAssistant}
      />
      <AboutSection profile={portfolio.profile} stats={portfolio.stats} />
      <SkillsSection skills={portfolio.skills} />
      <ExperienceSection experiences={portfolio.experiences} />
      <ProjectsSection projects={portfolio.projects} />
      <TerminalSection portfolio={portfolio} />
      <GitHubSection />
      <EducationCertificationsSection
        profile={portfolio.profile}
        certifications={portfolio.certifications}
      />
      <ContactSection profile={portfolio.profile} />
    </main>
  );
};
