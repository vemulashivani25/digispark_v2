import jsPDF from 'jspdf';

interface CaseStudyData {
  title: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  testimonial?: string;
  metrics?: { label: string; value: string }[];
}

interface PDFConfig {
  companyName?: string;
  companyLogo?: string; // Base64 or URL
  primaryColor?: { r: number; g: number; b: number };
  accentColor?: { r: number; g: number; b: number };
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
}

/**
 * Generate a downloadable PDF case study
 * 
 * @param caseStudy - The case study data
 * @param config - Optional configuration for branding
 * @returns Promise that resolves when PDF is downloaded
 * 
 * @example
 * // Basic usage
 * generateCaseStudyPDF({
 *   title: "E-commerce Transformation",
 *   client: "FashionLoop",
 *   industry: "Retail",
 *   services: ["Web Development", "SEO"],
 *   challenge: "Low conversion rates...",
 *   solution: "Complete platform redesign...",
 *   result: "37% increase in conversions..."
 * });
 * 
 * @example
 * // With custom branding
 * generateCaseStudyPDF(caseStudy, {
 *   companyName: "Your Agency Name",
 *   primaryColor: { r: 251, g: 191, b: 36 }, // Yellow
 *   accentColor: { r: 31, g: 41, b: 55 },    // Dark gray
 *   contactEmail: "hello@youragency.com",
 *   website: "www.youragency.com"
 * });
 */
export const generateCaseStudyPDF = async (
  caseStudy: CaseStudyData,
  config: PDFConfig = {}
): Promise<void> => {
  const {
    companyName = "DigiSpark",
    primaryColor = { r: 251, g: 191, b: 36 },  // Yellow
    accentColor = { r: 31, g: 41, b: 55 },     // Dark gray
    contactEmail = "hello@digispark.com",
    contactPhone = "+1 (555) 123-4567",
    website = "www.digispark.com"
  } = config;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = 0;

  // ========== HEADER SECTION ==========
  doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
  doc.rect(0, 0, pageWidth, 60, 'F');

  // Company name
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(companyName, margin, 25);

  // Case Study label
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text("CASE STUDY", margin, 40);

  // Industry badge
  doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.roundedRect(pageWidth - margin - 50, 20, 50, 20, 3, 3, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(caseStudy.industry, pageWidth - margin - 25, 33, { align: 'center' });

  yPos = 75;

  // ========== TITLE SECTION ==========
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(caseStudy.title, pageWidth - 2 * margin);
  doc.text(titleLines, margin, yPos);
  yPos += titleLines.length * 10 + 5;

  // Client name
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Client: ${caseStudy.client}`, margin, yPos);
  yPos += 15;

  // Services tags
  doc.setFontSize(10);
  let xPos = margin;
  caseStudy.services.forEach((service) => {
    const serviceWidth = doc.getTextWidth(service) + 10;
    if (xPos + serviceWidth > pageWidth - margin) {
      xPos = margin;
      yPos += 12;
    }
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.roundedRect(xPos, yPos - 6, serviceWidth, 10, 2, 2, 'F');
    doc.setTextColor(0, 0, 0);
    doc.text(service, xPos + 5, yPos + 1);
    xPos += serviceWidth + 5;
  });
  yPos += 20;

  // ========== CHALLENGE SECTION ==========
  doc.setFillColor(245, 245, 245);
  doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 45, 'F');
  
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("THE CHALLENGE", margin, yPos + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const challengeLines = doc.splitTextToSize(caseStudy.challenge, pageWidth - 2 * margin);
  doc.text(challengeLines.slice(0, 4), margin, yPos + 15);
  yPos += 55;

  // ========== SOLUTION SECTION ==========
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("OUR SOLUTION", margin, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const solutionLines = doc.splitTextToSize(caseStudy.solution, pageWidth - 2 * margin);
  doc.text(solutionLines.slice(0, 4), margin, yPos + 10);
  yPos += 50;

  // ========== RESULTS SECTION ==========
  doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
  doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 50, 'F');
  
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("RESULTS & IMPACT", margin, yPos + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const resultLines = doc.splitTextToSize(caseStudy.result, pageWidth - 2 * margin);
  doc.text(resultLines.slice(0, 4), margin, yPos + 15);
  yPos += 60;

  // ========== METRICS SECTION ==========
  if (caseStudy.metrics && caseStudy.metrics.length > 0) {
    const metricsCount = Math.min(caseStudy.metrics.length, 3);
    const metricWidth = (pageWidth - 2 * margin) / metricsCount;
    
    caseStudy.metrics.slice(0, 3).forEach((metric, index) => {
      const metricX = margin + (index * metricWidth);
      
      // Metric value
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(metric.value, metricX + metricWidth / 2, yPos + 10, { align: 'center' });
      
      // Metric label
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(metric.label, metricX + metricWidth / 2, yPos + 20, { align: 'center' });
    });
    yPos += 35;
  }

  // ========== TESTIMONIAL SECTION ==========
  if (caseStudy.testimonial) {
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(margin - 5, yPos, 3, 30, 'F');
    
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    const testimonialLines = doc.splitTextToSize(`"${caseStudy.testimonial}"`, pageWidth - 2 * margin - 10);
    doc.text(testimonialLines.slice(0, 3), margin + 5, yPos + 10);
    yPos += 45;
  }

  // ========== FOOTER ==========
  doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
  doc.rect(0, pageHeight - 30, pageWidth, 30, 'F');
  
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(companyName, margin, pageHeight - 18);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${contactEmail} | ${contactPhone} | ${website}`, margin, pageHeight - 10);
  
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth - margin, pageHeight - 10, { align: 'right' });

  // Save the PDF
  const filename = `case-study-${caseStudy.client.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(filename);
};

export default generateCaseStudyPDF;
