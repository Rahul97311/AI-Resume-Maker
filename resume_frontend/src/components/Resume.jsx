import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef, useState } from "react";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);
  const [currentFormat, setCurrentFormat] = useState('default');
  const [showFormatSelector, setShowFormatSelector] = useState(false);

  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return;

    try {
      const dataUrl = await toPng(resumeRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        includeQueryParams: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        skipFonts: false,
        cacheBust: true,
        useCORS: true,
        allowTaint: false
      });

      const img = new Image();
      img.onload = function() {
        const imgWidth = this.width;
        const imgHeight = this.height;
        
        const pdfWidth = 210;
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [pdfWidth, Math.max(pdfHeight, 297)]
        });

        pdf.addImage(
          dataUrl, 
          'PNG', 
          0, 
          0, 
          pdfWidth, 
          pdfHeight,
          undefined,
          'MEDIUM'
        );
        
        pdf.save(`${data.personalInformation.fullName}_Resume_${currentFormat}.pdf`);
      };
      
      img.onerror = function() {
        console.error("Error loading image for PDF generation");
        alert("Failed to generate PDF. Please try again.");
      };
      
      img.src = dataUrl;
      
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

const FormatSelector = () => (
  <div>
    <div className="mb-6 p-4 bg-base-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">Choose Resume Format</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
            currentFormat === 'modern' 
              ? 'border-primary bg-primary/10' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => setCurrentFormat('modern')}
        >
          <div className="text-center">
            <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded mx-auto mb-2"></div>
            <h4 className="font-semibold">Modern</h4>
            <p className="text-sm text-gray-600">Clean, colorful design</p>
          </div>
        </div>
        
        <div 
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
            currentFormat === 'classic' 
              ? 'border-primary bg-primary/10' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => setCurrentFormat('classic')}
        >
          <div className="text-center">
            <div className="w-16 h-20 bg-gray-800 rounded mx-auto mb-2"></div>
            <h4 className="font-semibold">Classic</h4>
            <p className="text-sm text-gray-600">Traditional, professional</p>
          </div>
        </div>
        
        <div 
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
            currentFormat === 'minimal' 
              ? 'border-primary bg-primary/10' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => setCurrentFormat('minimal')}
        >
          <div className="text-center">
            <div className="w-16 h-20 bg-gray-200 border border-gray-400 rounded mx-auto mb-2"></div>
            <h4 className="font-semibold">Minimal</h4>
            <p className="text-sm text-gray-600">Simple, clean layout</p>
          </div>
        </div>
      </div>
    </div>
    <div 
      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
        currentFormat === 'default' 
          ? 'border-primary bg-primary/10' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onClick={() => setCurrentFormat('default')}
    >
      <div className="text-center">
        <div className="w-16 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded mx-auto mb-2"></div>
        <h4 className="font-semibold">Default</h4>
        <p className="text-sm text-gray-600">Original theme design</p>
      </div>
    </div>
  </div>
);


  
  const ModernFormat = () => (
    <div className="max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden bg-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{data.personalInformation.fullName}</h1>
          <p className="text-xl opacity-90 mb-4">{data.personalInformation.location}</p>
          
          <div className="flex justify-center flex-wrap gap-4">
            {data.personalInformation.email && (
              <a href={`mailto:${data.personalInformation.email}`} className="flex items-center text-white/90 hover:text-white">
                <FaEnvelope className="mr-2" /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation.phoneNumber && (
              <span className="flex items-center text-white/90">
                <FaPhone className="mr-2" /> {data.personalInformation.phoneNumber}
              </span>
            )}
          </div>
          
          <div className="flex justify-center gap-4 mt-3">
            {data.personalInformation.gitHub && (
              <a href={data.personalInformation.gitHub} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white">
                <FaGithub className="text-xl" />
              </a>
            )}
            {data.personalInformation.linkedIn && (
              <a href={data.personalInformation.linkedIn} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white">
                <FaLinkedin className="text-xl" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 pb-1">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 pb-1">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                <div className="font-semibold text-gray-800">{skill.title}</div>
                <div className="text-sm text-blue-600">{skill.level}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 pb-1">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
              <div className="text-blue-600 font-medium">{exp.company} | {exp.location}</div>
              <div className="text-gray-500 mb-2">{exp.duration}</div>
              <p className="text-gray-700">{exp.responsibility}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 pb-1">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
              <div className="text-blue-600">{edu.university}, {edu.location}</div>
              <div className="text-gray-500">Graduated: {edu.graduationYear}</div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 pb-1">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">{proj.title}</h3>
              <p className="text-gray-700 mb-2">{proj.description}</p>
              <div className="text-sm text-blue-600 mb-2">
                Technologies: {Array.isArray(proj.technologiesUsed) ? proj.technologiesUsed.join(", ") : proj.technologiesUsed}
              </div>
              {proj.githubLink && (
                <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View on GitHub
                </a>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certifications */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-3 p-3 bg-blue-50 rounded">
                <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                <div className="text-blue-600 text-sm">{cert.issuingOrganization} - {cert.year}</div>
              </div>
            ))}
          </section>

          {/* Languages & Interests */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {interest.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const ClassicFormat = () => (
    <div className="max-w-4xl mx-auto shadow-2xl bg-white">
      {/* Header */}
      <div className="bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-2">{data.personalInformation.fullName}</h1>
        <div className="text-center text-gray-300">
          <div className="mb-2">{data.personalInformation.location}</div>
          <div className="flex justify-center gap-4 text-sm">
            {data.personalInformation.email && <span>{data.personalInformation.email}</span>}
            {data.personalInformation.phoneNumber && <span>{data.personalInformation.phoneNumber}</span>}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {data.personalInformation.gitHub && (
              <a href={data.personalInformation.gitHub} className="hover:text-white">GitHub</a>
            )}
            {data.personalInformation.linkedIn && (
              <a href={data.personalInformation.linkedIn} className="hover:text-white">LinkedIn</a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                <span className="text-gray-600 text-sm">{exp.duration}</span>
              </div>
              <div className="text-gray-600 mb-2">{exp.company}, {exp.location}</div>
              <p className="text-gray-700">{exp.responsibility}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <div className="text-gray-600">{edu.university}, {edu.location}</div>
                </div>
                <span className="text-gray-600 text-sm">{edu.graduationYear}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
              Skills
            </h2>
            <ul className="space-y-1">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{skill.title}</span> - {skill.level}
                </li>
              ))}
            </ul>
          </section>

          <section>
            {/* Certifications */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
                Certifications
              </h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <div className="font-medium text-gray-800">{cert.title}</div>
                  <div className="text-gray-600 text-sm">{cert.issuingOrganization}, {cert.year}</div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
                Languages
              </h2>
              <ul className="text-gray-700">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang.name}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2 mb-3">
            Projects
          </h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-800">{proj.title}</h3>
              <p className="text-gray-700 mb-1">{proj.description}</p>
              <div className="text-gray-600 text-sm">
                Technologies: {Array.isArray(proj.technologiesUsed) ? proj.technologiesUsed.join(", ") : proj.technologiesUsed}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );

  const MinimalFormat = () => (
    <div className="max-w-4xl mx-auto bg-white border border-gray-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.personalInformation.fullName}</h1>
        <div className="text-gray-600 text-sm">
          {data.personalInformation.location} | {data.personalInformation.email} | {data.personalInformation.phoneNumber}
        </div>
        {(data.personalInformation.gitHub || data.personalInformation.linkedIn) && (
          <div className="text-gray-600 text-sm mt-1">
            {data.personalInformation.gitHub && <span>GitHub: {data.personalInformation.gitHub} </span>}
            {data.personalInformation.linkedIn && <span>LinkedIn: {data.personalInformation.linkedIn}</span>}
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Summary */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">SUMMARY</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900">{exp.jobTitle}, {exp.company}</h3>
                <span className="text-gray-600 text-xs">{exp.duration}</span>
              </div>
              <div className="text-gray-600 text-xs mb-1">{exp.location}</div>
              <p className="text-gray-700 text-sm">{exp.responsibility}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{edu.degree}</div>
                  <div className="text-gray-600 text-xs">{edu.university}, {edu.location}</div>
                </div>
                <span className="text-gray-600 text-xs">{edu.graduationYear}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">SKILLS</h2>
          <div className="text-sm text-gray-700">
            {data.skills.map((skill, index) => (
              <span key={index}>
                {skill.title} ({skill.level}){index < data.skills.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">PROJECTS</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-medium text-gray-900 text-sm">{proj.title}</h3>
              <p className="text-gray-700 text-sm">{proj.description}</p>
              <div className="text-gray-600 text-xs">
                {Array.isArray(proj.technologiesUsed) ? proj.technologiesUsed.join(", ") : proj.technologiesUsed}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-6">
          {/* Certifications */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">CERTIFICATIONS</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="font-medium text-gray-900 text-sm">{cert.title}</div>
                <div className="text-gray-600 text-xs">{cert.issuingOrganization}, {cert.year}</div>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">LANGUAGES</h2>
            <div className="text-sm text-gray-700">
              {data.languages.map((lang, index) => (
                <span key={index}>
                  {lang.name}{index < data.languages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

const DefaultFormat = () => (
  <div
    className="max-w-4xl mx-auto shadow-2xl rounded-lg p-8 space-y-6 bg-base-100 text-base-content border border-gray-200 dark:border-gray-700 transition-all duration-300"
    style={{
      minHeight: 'fit-content',
      pageBreakInside: 'avoid'
    }}
  >
    {/* Header Section */}
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold text-primary">
        {data.personalInformation.fullName}
      </h1>
      <p className="text-lg text-gray-500">
        {data.personalInformation.location}
      </p>

      <div className="flex justify-center space-x-4 mt-2">
        {data.personalInformation.email && (
          <a
            href={`mailto:${data.personalInformation.email}`}
            className="flex items-center text-secondary hover:underline"
          >
            <FaEnvelope className="mr-2" /> {data.personalInformation.email}
          </a>
        )}
        {data.personalInformation.phoneNumber && (
          <p className="flex items-center text-gray-500">
            <FaPhone className="mr-2" />{" "}
            {data.personalInformation.phoneNumber}
          </p>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-2">
        {data.personalInformation.gitHub && (
          <a
            href={data.personalInformation.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        )}
        {data.personalInformation.linkedIn && (
          <a
            href={data.personalInformation.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </a>
        )}
      </div>
    </div>

    <div className="divider"></div>

    {/* Summary Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Summary</h2>
      <p className="text-gray-900 dark:text-gray-100 font-medium">{data.summary}</p>
    </section>

    <div className="divider"></div>

    {/* Skills Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Skills</h2>
      <div className="flex flex-wrap gap-3 mt-2">
        {data.skills.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium whitespace-nowrap"
          >
            <span className="text-gray-700 dark:text-gray-300">{skill.title}</span>
            <span className="mx-2 text-gray-400">-</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{skill.level}</span>
          </div>
        ))}
      </div>
    </section>

    <div className="divider"></div>

    {/* Experience Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Experience</h2>
      {data.experience.map((exp, index) => (
        <div
          key={index}
          className="mb-4 p-4 rounded-lg shadow-md bg-base-200 border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
          <p className="text-gray-600 dark:text-gray-200">
            {exp.company} | {exp.location}
          </p>
          <p className="text-gray-500 dark:text-gray-300">{exp.duration}</p>
          <p className="mt-2 text-gray-800 dark:text-gray-100">
            {exp.responsibility}
          </p>
        </div>
      ))}
    </section>

    <div className="divider"></div>

    {/* Education Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Education</h2>
      {data.education.map((edu, index) => (
        <div
          key={index}
          className="mb-4 p-4 rounded-lg shadow-md bg-base-200 border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold">{edu.degree}</h3>
          <p className="text-gray-600 dark:text-gray-200">
            {edu.university}, {edu.location}
          </p>
          <p className="text-gray-500 dark:text-gray-300">
            🎓 Graduation Year: {edu.graduationYear}
          </p>
        </div>
      ))}
    </section>

    <div className="divider"></div>

    {/* Certifications Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">
        Certifications
      </h2>
      {data.certifications.map((cert, index) => (
        <div
          key={index}
          className="mb-4 p-4 rounded-lg shadow-md bg-base-200 border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold">{cert.title}</h3>
          <p className="text-gray-600 dark:text-gray-200">
            {cert.issuingOrganization} - {cert.year}
          </p>
        </div>
      ))}
    </section>

    <div className="divider"></div>

    {/* Projects Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Projects</h2>
      {data.projects.map((proj, index) => (
        <div
          key={index}
          className="mb-4 p-4 rounded-lg shadow-md bg-base-200 border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold">{proj.title}</h3>
          <p className="text-gray-800 dark:text-gray-100">
            {proj.description}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            🛠 Technologies: {Array.isArray(proj.technologiesUsed) ? proj.technologiesUsed.join(", ") : proj.technologiesUsed}
          </p>
          {proj.githubLink && (
            <a
              href={proj.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              🔗 GitHub Link
            </a>
          )}
        </div>
      ))}
    </section>

    <div className="divider"></div>

    {/* Achievements Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">
        Achievements
      </h2>
      {data.achievements && data.achievements.map((ach, index) => (
        <div
          key={index}
          className="mb-4 p-4 rounded-lg shadow-md bg-base-200 border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold">{ach.title}</h3>
          <p className="text-gray-600 dark:text-gray-200">{ach.year}</p>
          <p className="text-gray-800 dark:text-gray-100">
            {ach.extraInformation}
          </p>
        </div>
      ))}
    </section>

    <div className="divider"></div>

    {/* Languages Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Languages</h2>
      <ul className="list-disc pl-6 text-gray-800 dark:text-gray-100">
        {data.languages.map((lang, index) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
    </section>

    <div className="divider"></div>

    {/* Interests Section */}
    <section>
      <h2 className="text-2xl font-semibold text-secondary">Interests</h2>
      <ul className="list-disc pl-6 text-gray-800 dark:text-gray-100">
        {data.interests.map((interest, index) => (
          <li key={index}>{interest.name}</li>
        ))}
      </ul>
    </section>
  </div>
);

  const renderCurrentFormat = () => {
    switch (currentFormat) {
      case 'modern':
        return <ModernFormat />;
      case 'classic':
        return <ClassicFormat />;
      case 'minimal':
        return <MinimalFormat />;
      default:
        return <DefaultFormat />;
    }
  };

  return (
    <>
      {/* Format Selector */}
      <div className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setShowFormatSelector(!showFormatSelector)}
          className="btn btn-outline btn-secondary w-full mb-4"
        >
          {showFormatSelector ? 'Hide Format Options' : 'Change Format'}
        </button>
        
        {showFormatSelector && <FormatSelector />}
      </div>

      {/* Resume Display */}
      <div ref={resumeRef} style={{ minHeight: 'fit-content', pageBreakInside: 'avoid' }}>
        {renderCurrentFormat()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handleDownloadPdf}
          className="btn btn-primary"
          disabled={!data.personalInformation.fullName}
        >
          Download PDF
        </button>
        <button
          onClick={() => setShowFormatSelector(!showFormatSelector)}
          className="btn btn-secondary"
        >
          Change Format
        </button>
      </div>
    </>
  );
};
export default Resume;