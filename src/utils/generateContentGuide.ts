import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface ContentLocation {
  section: string;
  file: string;
  description: string;
  lineNumbers?: string;
  dataStructure?: string;
}

const contentLocations: ContentLocation[] = [
  // Services
  {
    section: "Services",
    file: "src/components/services/servicesData.tsx",
    description: "Main services data - icons, titles, descriptions, features, pricing",
    lineNumbers: "Lines 1-200+",
    dataStructure: "Array of service objects with id, title, description, icon, features, pricing"
  },
  {
    section: "Services",
    file: "src/components/ServicesSection.tsx",
    description: "Homepage services cards - quick overview cards",
    lineNumbers: "servicecards array",
    dataStructure: "Array with icon, title, description, link"
  },
  {
    section: "Services",
    file: "src/components/CoreServicesSection.tsx",
    description: "Core services with tabs and detailed info",
    lineNumbers: "coreServices array",
    dataStructure: "Array with id, title, icon, description, features, benefits"
  },
  {
    section: "Services",
    file: "src/components/services/AdditionalServicesSection.tsx",
    description: "Additional/secondary services listing",
    lineNumbers: "additionalServices array",
    dataStructure: "Array with icon, title, description"
  },
  
  // Portfolio
  {
    section: "Portfolio",
    file: "src/components/PortfolioSection.tsx",
    description: "Portfolio projects and categories",
    lineNumbers: "categories and projects arrays",
    dataStructure: "categories: string[], projects: {title, client, industry, image, results}"
  },
  
  // Testimonials
  {
    section: "Testimonials",
    file: "src/components/TestimonialsSection.tsx",
    description: "Homepage testimonials carousel",
    lineNumbers: "testimonials array",
    dataStructure: "Array with name, role, company, content, avatar, rating"
  },
  {
    section: "Testimonials",
    file: "src/pages/TestimonialsPage.tsx",
    description: "Full testimonials page with stats and all reviews",
    lineNumbers: "testimonials array, stats object",
    dataStructure: "Extended testimonial data with industry, location, date"
  },
  
  // Footer Social Links
  {
    section: "Social Links",
    file: "src/components/FooterSection.tsx",
    description: "Social media links (Facebook, Twitter, Instagram, LinkedIn, Discord, Fiverr)",
    lineNumbers: "Lines 293-314",
    dataStructure: "Individual <a> tags with href attributes"
  },
  
  // Footer Navigation
  {
    section: "Footer Navigation",
    file: "src/components/FooterSection.tsx",
    description: "Footer navigation links organized by category",
    lineNumbers: "Lines 109-140 (footerLinks array)",
    dataStructure: "Object with services, company, resources arrays containing {name, href}"
  },
  
  // Success Stories
  {
    section: "Success Stories",
    file: "src/data/successStoriesData.tsx",
    description: "Case studies and success stories data",
    lineNumbers: "successStories array",
    dataStructure: "Array with title, client, industry, services, challenge, solution, result, metrics"
  },
  
  // Blog
  {
    section: "Blog",
    file: "src/components/blog/BlogData.ts",
    description: "Static blog posts data (if not using Supabase)",
    lineNumbers: "blogPosts array",
    dataStructure: "Array with title, excerpt, content, author, category, tags, image"
  },
  
  // Team
  {
    section: "Team",
    file: "src/components/MeetTheTeamSection.tsx",
    description: "Team members information",
    lineNumbers: "teamMembers array",
    dataStructure: "Array with name, role, image, bio, social links"
  },
  
  // FAQ
  {
    section: "FAQ",
    file: "src/pages/Faq.tsx",
    description: "Frequently asked questions",
    lineNumbers: "faqData array",
    dataStructure: "Array with question, answer, category"
  },
  
  // Contact Info
  {
    section: "Contact",
    file: "src/components/ContactSection.tsx",
    description: "Contact information (email, phone, address)",
    lineNumbers: "Contact details in JSX",
    dataStructure: "Inline text and links"
  },
  
  // Branding
  {
    section: "Branding",
    file: "src/index.css",
    description: "Brand colors, fonts, CSS variables",
    lineNumbers: ":root and .dark sections",
    dataStructure: "CSS custom properties (--primary, --secondary, etc.)"
  },
  {
    section: "Branding",
    file: "tailwind.config.ts",
    description: "Tailwind theme configuration",
    lineNumbers: "theme.extend section",
    dataStructure: "Colors, fonts, animations"
  }
];

/**
 * Generate PDF content editing guide
 */
export const generateContentGuidePDF = (): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = 0;

  // Header
  doc.setFillColor(31, 41, 55);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setTextColor(251, 191, 36);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text("DigiSpark Content Guide", margin, 25);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text("Where to Edit Website Content", margin, 38);
  
  yPos = 65;

  // Group by section
  const sections = [...new Set(contentLocations.map(c => c.section))];
  
  sections.forEach((section, sectionIndex) => {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 30;
    }
    
    // Section header
    doc.setFillColor(251, 191, 36);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 12, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(section.toUpperCase(), margin, yPos + 4);
    yPos += 18;
    
    const sectionItems = contentLocations.filter(c => c.section === section);
    
    sectionItems.forEach((item) => {
      // Check page break
      if (yPos > pageHeight - 45) {
        doc.addPage();
        yPos = 30;
      }
      
      // File name
      doc.setTextColor(59, 130, 246);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(item.file, margin, yPos);
      yPos += 6;
      
      // Description
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const descLines = doc.splitTextToSize(item.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPos);
      yPos += descLines.length * 4 + 2;
      
      // Line numbers
      if (item.lineNumbers) {
        doc.setTextColor(100, 100, 100);
        doc.text(`Location: ${item.lineNumbers}`, margin, yPos);
        yPos += 5;
      }
      
      // Data structure
      if (item.dataStructure) {
        doc.setTextColor(100, 100, 100);
        const structLines = doc.splitTextToSize(`Structure: ${item.dataStructure}`, pageWidth - 2 * margin);
        doc.text(structLines, margin, yPos);
        yPos += structLines.length * 4;
      }
      
      yPos += 8;
    });
    
    yPos += 5;
  });

  // Footer on last page
  doc.setFillColor(31, 41, 55);
  doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  doc.setTextColor(251, 191, 36);
  doc.setFontSize(10);
  doc.text("DigiSpark - Content Editing Guide", margin, pageHeight - 12);
  doc.setTextColor(255, 255, 255);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 50, pageHeight - 12);

  doc.save('digispark-content-guide.pdf');
};

/**
 * Generate Excel content editing guide
 */
export const generateContentGuideExcel = (): void => {
  // Prepare data for Excel
  const data = contentLocations.map(item => ({
    'Section': item.section,
    'File Path': item.file,
    'Description': item.description,
    'Location/Lines': item.lineNumbers || 'N/A',
    'Data Structure': item.dataStructure || 'N/A'
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Set column widths
  ws['!cols'] = [
    { wch: 18 },  // Section
    { wch: 50 },  // File Path
    { wch: 55 },  // Description
    { wch: 25 },  // Location
    { wch: 60 }   // Data Structure
  ];

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Content Locations');

  // Create a summary sheet
  const sections = [...new Set(contentLocations.map(c => c.section))];
  const summaryData = sections.map(section => ({
    'Section': section,
    'Number of Files': contentLocations.filter(c => c.section === section).length,
    'Main File': contentLocations.find(c => c.section === section)?.file || ''
  }));

  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  summaryWs['!cols'] = [
    { wch: 20 },
    { wch: 18 },
    { wch: 55 }
  ];
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

  // Save file
  XLSX.writeFile(wb, 'digispark-content-guide.xlsx');
};

export default { generateContentGuidePDF, generateContentGuideExcel };
